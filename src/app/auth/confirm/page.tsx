import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-[#07192D]">
          Email Verified
        </h1>

        <p className="mt-4 leading-6 text-gray-600">
          Your UVA email has been verified. Sign in to view your profile and
          confirm your account status.
        </p>

        <Link
          href="/login"
          className="mt-7 inline-block rounded-lg bg-[#E57200] px-6 py-3 font-semibold text-white transition hover:bg-[#c96300]"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
