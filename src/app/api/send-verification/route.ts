import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request: NextRequest) {
  try {
    // 1. Get the user's Supabase access token
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace("Bearer ", "");

    // 2. Verify the Supabase user
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user || !user.email) {
      return NextResponse.json(
        { error: "Unable to verify user." },
        { status: 401 }
      );
    }

    // Extra protection
    if (!user.email.toLowerCase().endsWith("@virginia.edu")) {
      return NextResponse.json(
        { error: "A UVA email address is required." },
        { status: 400 }
      );
    }

    // 3. Check whether this account is already verified
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("email_verified")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile lookup error:", profileError);

      return NextResponse.json(
        { error: "Unable to check verification status." },
        { status: 500 }
      );
    }

    if (profile.email_verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
      });
    }

    // 4. Prevent users from repeatedly requesting emails
    const { data: latestToken } = await supabaseAdmin
      .from("email_verification_tokens")
      .select("created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestToken) {
      const createdAt = new Date(latestToken.created_at).getTime();
      const now = Date.now();

      const secondsSinceLastEmail = (now - createdAt) / 1000;

      if (secondsSinceLastEmail < 60) {
        return NextResponse.json(
          {
            error:
              "A verification email was recently sent. Please wait before requesting another.",
          },
          { status: 429 }
        );
      }
    }

    // 5. Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Store only the hash in Supabase
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 6. Remove any old verification tokens for this user
    const { error: deleteError } = await supabaseAdmin
      .from("email_verification_tokens")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Token cleanup error:", deleteError);

      return NextResponse.json(
        { error: "Unable to create verification email." },
        { status: 500 }
      );
    }

    // Token is valid for 24 hours
    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();

    // 7. Save the hashed token
    const { error: tokenError } = await supabaseAdmin
      .from("email_verification_tokens")
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });

    if (tokenError) {
      console.error("Token insert error:", tokenError);

      return NextResponse.json(
        { error: "Unable to create verification email." },
        { status: 500 }
      );
    }

    // localhost during development,
    // pickleballclubatuva.com in production
    const origin = request.nextUrl.origin;

    const verificationUrl =
      `${origin}/verify-email?token=${encodeURIComponent(token)}`;

    // 8. Send through Resend
    const { error: resendError } = await resend.emails.send({
      from: "UVA Pickleball <noreply@pickleballclubatuva.com>",
      to: user.email,
      subject: "Verify your UVA email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #07192d;">Verify your UVA email</h2>

          <p>
            Thanks for creating your UVA Pickleball account.
          </p>

          <p>
            Please verify that you own this UVA email address.
          </p>

          <a
            href="${verificationUrl}"
            style="
              display: inline-block;
              margin-top: 16px;
              padding: 12px 20px;
              background: #E57200;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Verify UVA Email
          </a>

          <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
            This verification link expires in 24 hours.
          </p>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);

      // Delete the unusable token if sending failed
      await supabaseAdmin
        .from("email_verification_tokens")
        .delete()
        .eq("token_hash", tokenHash);

      return NextResponse.json(
        { error: "Unable to send verification email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Send verification error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}