"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import logo from "../public/logo.png"; // Optional: replace with your logo

export default function Page() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("Please fill out all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5812/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fName: firstName,
          lName: lastName,
          email,
          password,
          sndPassword: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      alert("Registration successful! Redirecting to login.");
      router.push("/api/auth/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CCF0EC] via-white to-green-50 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute w-96 h-96 bg-[#009688]/20 rounded-full blur-3xl top-[-6rem] left-[-6rem]" />
      <div className="absolute w-80 h-80 bg-[#009688]/10 rounded-full blur-2xl bottom-[-4rem] right-[-4rem]" />

      <div className="max-w-md w-full bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 relative z-10">
        <div className="flex flex-col items-center space-y-5">
          {/* <Image
            src={logo}
            alt="MediTalk Logo"
            width={64}
            height={64}
            className="rounded-full shadow-md"
          /> */}
          <h2 className="mt-6 text-3xl font-extrabold text-[#009688] text-center tracking-tight">
            Create Your Account
          </h2>
          <p className="text-gray-700 text-center text-sm max-w-sm">
            Sign up to access AI-powered X-ray analysis and voice-assisted
            tools.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#009688]/30 focus:border-[#009688] focus:ring-2 focus:ring-[#009688]/30 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#009688]/30 focus:border-[#009688] focus:ring-2 focus:ring-[#009688]/30 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#009688]/30 focus:border-[#009688] focus:ring-2 focus:ring-[#009688]/30 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password (Min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#009688]/30 focus:border-[#009688] focus:ring-2 focus:ring-[#009688]/30 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#009688]/30 focus:border-[#009688] focus:ring-2 focus:ring-[#009688]/30 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
          />

          {error && (
            <div className="text-sm font-medium text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#009688] hover:bg-[#00796B] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-700 mt-2 font-medium">
            Already have an account?{" "}
            <Link
              href="/api/auth/login"
              className="text-[#009688] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
