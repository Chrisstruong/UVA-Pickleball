import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/login?verification=invalid", request.url)
      );
    }

    // Hash the token from the URL so we can compare it
    // with the hash stored in Supabase.
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find the token
    const { data: verificationToken, error: tokenError } =
      await supabaseAdmin
        .from("email_verification_tokens")
        .select("id, user_id, expires_at")
        .eq("token_hash", tokenHash)
        .maybeSingle();

    if (tokenError) {
      console.error("Token lookup error:", tokenError);

      return NextResponse.redirect(
        new URL("/login?verification=error", request.url)
      );
    }

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/login?verification=invalid", request.url)
      );
    }

    // Make sure the token has not expired
    const expiresAt = new Date(
      verificationToken.expires_at
    ).getTime();

    if (Date.now() > expiresAt) {
      // Remove expired token
      await supabaseAdmin
        .from("email_verification_tokens")
        .delete()
        .eq("id", verificationToken.id);

      return NextResponse.redirect(
        new URL("/login?verification=expired", request.url)
      );
    }

    // Mark profile as verified
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        email_verified: true,
        email_verified_at: new Date().toISOString(),
      })
      .eq("id", verificationToken.user_id);

    if (profileError) {
      console.error(
        "Profile verification error:",
        profileError
      );

      return NextResponse.redirect(
        new URL("/login?verification=error", request.url)
      );
    }

    // Verification tokens should only work once
    const { error: deleteError } = await supabaseAdmin
      .from("email_verification_tokens")
      .delete()
      .eq("id", verificationToken.id);

    if (deleteError) {
      console.error(
        "Verification token cleanup error:",
        deleteError
      );
    }

    // User is intentionally NOT automatically signed in.
    return NextResponse.redirect(
      new URL("/auth/confirm", request.url)
    );
  } catch (error) {
    console.error("Email verification error:", error);

    return NextResponse.redirect(
      new URL("/login?verification=error", request.url)
    );
  }
}