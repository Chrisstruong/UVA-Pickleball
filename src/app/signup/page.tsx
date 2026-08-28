"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.endsWith("@virginia.edu")) {
      setError("Please use your UVA @virginia.edu email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error: signupError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#07192D]">
            Check Your UVA Email
          </h1>

          <p className="mt-4 leading-6 text-gray-600">
            We sent a verification link to:
          </p>

          <p className="mt-2 font-semibold text-[#07192D]">{email}</p>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Open the email and click the verification link to activate your
            UVA Pickleball account.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            You can complete this before, during, or after your tryout.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E57200]">
            UVA Pickleball
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#07192D]">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Create your account to view your tryout result and access club
            features.
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              UVA Email
            </label>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="computingid@virginia.edu"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Retype your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}