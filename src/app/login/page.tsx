"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.endsWith("@virginia.edu")) {
      setError("Please use your UVA @virginia.edu email.");
      setLoading(false);
      return;
    }

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (loginError) {
      if (loginError.message.toLowerCase().includes("email not confirmed")) {
        setError("Please verify your UVA email before logging in.");
      } else {
        setError("Invalid email or password.");
      }

      setLoading(false);
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto flex min-h-[70vh] max-w-[900px] items-center px-6 py-20 md:px-10">
        <div className="relative w-full rounded-xl border border-slate-200 bg-[#f7f7f5] px-8 py-12 shadow-sm md:px-12">
          <Image
            src="/images/logo.svg"
            alt="UVA Pickleball Club logo"
            width={170}
            height={85}
            priority
            className="absolute right-8 top-8 hidden h-30 w-auto object-contain sm:block"
          />

          <div className="max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E57200]">
              Account Access
            </p>

            <h1 className="font-bebas mt-4 text-5xl uppercase leading-none tracking-wide text-[#07192d] md:text-6xl">
              Log In
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-700">
              Sign in with your UVA Pickleball account to view your tryout
              result and access club features.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#07192d]">
                  UVA Email
                </label>

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="computingid@virginia.edu"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#E57200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#07192d]">
                  Password
                </label>

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#E57200]"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E57200] px-5 py-3 font-semibold text-white transition hover:bg-[#c96300] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#E57200] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
