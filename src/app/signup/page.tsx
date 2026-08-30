"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2 } from "lucide-react";

const schools = [
  "College of Arts & Sciences",
  "Darden School of Business",
  "Frank Batten School of Leadership & Public Policy",
  "McIntire School of Commerce",
  "School of Architecture",
  "School of Continuing & Professional Studies",
  "School of Data Science",
  "School of Education & Human Development",
  "School of Engineering & Applied Science",
  "School of Law",
  "School of Medicine",
  "School of Nursing",
  "Other / Not Listed",
];

const graduationYears = ["2027", "2028", "2029", "2030", "2031", "2032"];

export default function SignupPage() {

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    school !== "" &&
    graduationYear !== "" &&
    email.trim().toLowerCase().endsWith("@virginia.edu") &&
    password.length >= 8 &&
    confirmPassword === password;

  const isUvaEmail =
    email.trim().toLowerCase().endsWith("@virginia.edu");
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    if (!normalizedEmail.endsWith("@virginia.edu")) {
      setError("Please use your UVA @virginia.edu email.");
      return;
    }

    if (!school) {
      setError("Please select your school.");
      return;
    }

    if (!graduationYear) {
      setError("Please select your graduation year.");
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

    const { data, error: signupError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/profile`,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          school,
          graduation_year: Number(graduationYear),
        },
      },
    });

    // 1. Handle actual Supabase errors
    if (signupError) {
      const message = signupError.message.toLowerCase();

      if (
        message.includes("already registered") ||
        message.includes("already been registered") ||
        message.includes("user already registered")
      ) {
        setError("An account already exists with this UVA email.");
      } else {
        setError(signupError.message);
      }

      setLoading(false);
      return;
    }

    // Supabase creates a session immediately because
    // "Confirm email" is disabled.
    //
    // We intentionally sign the user back out because
    // we want them to manually log in after signup.
    if (data.session) {
      try {
        const response = await fetch("/api/send-verification", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type");

          if (contentType?.includes("application/json")) {
            const errorData = await response.json();
            console.error(
              "Unable to send verification email:",
              errorData
            );
          } else {
            const errorText = await response.text();
            console.error(
              "Verification endpoint returned non-JSON:",
              errorText
            );
          }
        }
      } catch (verificationError) {
        console.error(
          "Verification email request failed:",
          verificationError
        );
      }

      await supabase.auth.signOut();
    }

    setLoading(false);

    router.push(
      `/login?accountCreated=true&email=${encodeURIComponent(normalizedEmail)}`
    );

    router.refresh();
  };



  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07192D] px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
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
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              UVA School  <span className="text-red-500">*</span>
            </label>

            <select
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#E57200]"
            >
              <option value="">Select your school</option>

              {schools.map((schoolName) => (
                <option key={schoolName} value={schoolName}>
                  {schoolName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Graduation Year <span className="text-red-500">*</span>
            </label>

            <select
              required
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#E57200]"
            >
              <option value="">Select graduation year</option>

              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              UVA Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="computingid@virginia.edu"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
            />
            {email && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                {isUvaEmail ? (
                  <>
                    <CheckCircle2
                      size={18}
                      className="animate-in zoom-in text-green-600 duration-300"
                    />
                    <span className="font-medium text-green-600">
                      Valid UVA email address
                    </span>
                  </>
                ) : (
                  <span className="text-red-500">
                    Please use your @virginia.edu email address
                  </span>
                )}
              </div>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Use your @virginia.edu email address.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${password.length >= 8
                ? "border-green-500 focus:border-green-500"
                : "border-gray-300 focus:border-[#E57200]"
                }`}
            />

            <div className="mt-2 flex items-center gap-2 text-sm">
              {password.length >= 8 ? (
                <>
                  <CheckCircle2
                    size={18}
                    className="animate-in zoom-in text-green-600 duration-300"
                  />
                  <span className="font-medium text-green-600">
                    Password meets requirements
                  </span>
                </>
              ) : (
                <span className="text-gray-500">
                  Must be at least 8 characters
                </span>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Retype your password"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${confirmPassword && confirmPassword === password
                ? "border-green-500 focus:border-green-500"
                : "border-gray-300 focus:border-[#E57200]"
                }`}
            />

            {confirmPassword && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                {confirmPassword === password ? (
                  <>
                    <CheckCircle2
                      size={18}
                      className="animate-in zoom-in text-green-600 duration-300"
                    />
                    <span className="font-medium text-green-600">
                      Passwords match
                    </span>
                  </>
                ) : (
                  <span className="text-red-500">
                    Passwords do not match yet
                  </span>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full rounded-lg bg-[#E57200] px-5 py-3 font-semibold text-white transition hover:bg-[#c96300] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
