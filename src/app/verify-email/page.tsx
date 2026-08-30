import Link from "next/link";
import { AlertCircle, MailCheck } from "lucide-react";

const errorMessages: Record<string, string> = {
  expired:
    "This verification link has expired. Please request a new verification email from your profile.",
  invalid:
    "This verification link is invalid or has already been used. Please request a new verification email from your profile.",
  error:
    "We could not verify your email right now. Please try again or request a new verification email.",
};

function readSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[]; error?: string | string[] }>;
}) {
  const query = await searchParams;
  const token = readSingleValue(query.token);
  const error = readSingleValue(query.error);
  const errorMessage = error ? errorMessages[error] ?? errorMessages.error : "";
  const canVerify = Boolean(token) && !errorMessage;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6 py-16">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            canVerify ? "bg-orange-100" : "bg-red-100"
          }`}
        >
          {canVerify ? (
            <MailCheck className="h-8 w-8 text-[#E57200]" />
          ) : (
            <AlertCircle className="h-8 w-8 text-red-600" />
          )}
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#E57200]">
          Picklball Club at UVA
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#07192D]">
          Verify UVA Email
        </h1>

        {canVerify ? (
          <>
            <p className="mt-4 leading-6 text-gray-600">
              Click the button below to verify your UVA email address.
            </p>

            <form action="/api/verify-email" method="post" className="mt-7">
              <input type="hidden" name="token" value={token} />

              <button
                type="submit"
                className="w-full rounded-lg bg-[#E57200] px-5 py-3 font-semibold text-white transition hover:bg-[#c96300]"
              >
                Verify UVA Email
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-4 leading-6 text-gray-600">
              {errorMessage ||
                "This verification link is missing a token. Please request a new verification email from your profile."}
            </p>

            <Link
              href="/profile"
              className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#E57200] px-5 py-3 font-semibold text-white transition hover:bg-[#c96300]"
            >
              Back to Profile
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
