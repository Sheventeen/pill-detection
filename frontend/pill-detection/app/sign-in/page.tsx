"use client";

import { useState } from "react";
import Link from "next/link";
// Make sure the image import path is correct:
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { FIREBASE_AUTH } from "../../../firebase/clientApp";
// import xrayIcon from "../assets/xray-icon.png";

// (Assuming all imports above are correct, only the function signature changes)

// Change function name from LoginPage to Page
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter(); // Uncommented in the final version

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    console.log("Attempting login...");
  };

  return (
    <section className="pt-3 pb-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-2xl rounded-xl">
          <div className="flex flex-col items-center">
            {/* Image component omitted for brevity in the fix, but include it in your file */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Access the AI Analysis Tool
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Input fields and buttons remain the same */}
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-sm font-medium text-red-600 text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="mt-3 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
