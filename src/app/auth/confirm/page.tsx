import Link from "next/link";

export default function ConfirmPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-5 text-3xl font-bold text-[#07192D]">
          Email Verified
        </h1>

        <p className="mt-4 leading-6 text-gray-600">
          Your UVA Pickleball account has been verified.
        </p>

        <Link
          href="/login"
          className="mt-7 inline-block rounded-lg bg-[#E57200] px-6 py-3 font-semibold text-white transition hover:bg-[#c96300]"
        >
          Log In
        </Link>
      </div>
    </main>
  );
}   