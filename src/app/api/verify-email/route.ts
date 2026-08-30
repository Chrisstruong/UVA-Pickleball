import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

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

function redirectTo(request: NextRequest, pathname: string, status = 303) {
  return NextResponse.redirect(new URL(pathname, request.url), status);
}

async function readToken(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as {
      token?: unknown;
    } | null;

    return typeof body?.token === "string" ? body.token : "";
  }

  const formData = await request.formData().catch(() => null);
  const token = formData?.get("token");

  return typeof token === "string" ? token : "";
}

export async function POST(request: NextRequest) {
  try {
    const token = await readToken(request);

    if (!token) {
      return redirectTo(request, "/verify-email?error=invalid");
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const { data: verificationToken, error: tokenError } =
      await supabaseAdmin
        .from("email_verification_tokens")
        .select("id, user_id, expires_at")
        .eq("token_hash", tokenHash)
        .maybeSingle();

    if (tokenError) {
      console.error("Token lookup error:", tokenError);
      return redirectTo(request, "/verify-email?error=error");
    }

    if (!verificationToken) {
      return redirectTo(request, "/verify-email?error=invalid");
    }

    const expiresAt = new Date(verificationToken.expires_at).getTime();

    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      await supabaseAdmin
        .from("email_verification_tokens")
        .delete()
        .eq("id", verificationToken.id);

      return redirectTo(request, "/verify-email?error=expired");
    }

    const { data: consumedToken, error: deleteError } = await supabaseAdmin
      .from("email_verification_tokens")
      .delete()
      .eq("id", verificationToken.id)
      .select("user_id")
      .single();

    if (deleteError || !consumedToken) {
      console.error("Verification token cleanup error:", deleteError);
      return redirectTo(request, "/verify-email?error=error");
    }

    const verifiedAt = new Date().toISOString();

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        email_verified: true,
        email_verified_at: verifiedAt,
      })
      .eq("id", consumedToken.user_id);

    if (profileError) {
      console.error("Profile verification error:", profileError);
      return redirectTo(request, "/verify-email?error=error");
    }

    return redirectTo(request, "/auth/confirm");
  } catch (error) {
    console.error("Email verification error:", error);
    return redirectTo(request, "/verify-email?error=error");
  }
}
