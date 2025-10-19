"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import logo from "../public/logo.png"; // Optional logo (replace with yours)

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5812/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/analysis");
    } catch (err: any) {
      setError(err.message || "Something went wrong during login.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CCF0EC] via-white to-green-50 relative overflow-hidden">
      {/* Subtle decorative circles for background */}
      <div className="absolute w-96 h-96 bg-green-200/30 rounded-full blur-3xl top-[-6rem] left-[-6rem]" />
      <div className="absolute w-80 h-80 bg-green-100/20 rounded-full blur-2xl bottom-[-4rem] right-[-4rem]" />

      <div className="max-w-md w-full bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 relative z-10">
        <div className="flex flex-col items-center space-y-5">
          {/* <Image
            src={logo}
            alt="MediTalk Logo"
            width={64}
            height={64}
            className="rounded-full shadow-md"
          /> */}
          <h2 className="text-4xl font-bold text-[#009688] text-center">
            Welcome!
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-sm">
            Log in to access AI-powered analysis
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-green-100 focus:border-green-400 focus:ring-2 focus:ring-green-300 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-green-100 focus:border-green-400 focus:ring-2 focus:ring-green-300 placeholder-gray-500 text-gray-900 outline-none transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm font-medium text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#009688] hover:bg-[#41847c] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link
              href="/api/auth/signup"
              className="text-[#009688] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
