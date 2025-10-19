"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChartArea, Bot, Orbit } from "lucide-react";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const handleRequestDemo = () => {
    router.push("/meditalk");
  };
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-[#CCF0EC] font-sans text-gray-800 scroll-smooth"
      style={{ scrollBehavior: "smooth" }} // ensures smooth scroll for all browsers
    >
      {/* ---------------------- Header ---------------------- */}
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-extrabold text-[#009688]">MediTalk</h1>
          <nav className="space-x-8 hidden md:flex text-gray-700 font-medium">
            <Link href="#features" className="hover:text-[#009688] transition">
              Features
            </Link>
            <Link href="#about" className="hover:text-[#009688] transition">
              About
            </Link>
            <Link href="#cta" className="hover:text-[#009688] transition">
              Contact
            </Link>
          </nav>
          <Link
            href="/api/auth/login"
            className="bg-[#009688] hover:bg-[#00796B] text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-48 pt-32">
        {/* ---------------------- Hero Section ---------------------- */}
        <section
          id="hero"
          className="flex flex-col md:flex-row items-center gap-12 scroll-mt-24"
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Transforming Healthcare <br /> with{" "}
              <span className="text-[#009688]">AI Innovation</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              AI-powered diagnostics for faster, more accurate healthcare
              decisions — built for you.
            </p>
            <button
              className="bg-[#009688] hover:bg-[#00796B] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
              onClick={handleRequestDemo}
            >
              Request a Demo
            </button>
          </div>

          <div className="flex-1">
            <Image
              src="/images/doctor-and-ai.jpg"
              alt="Doctor analyzing X-ray"
              width={550}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </section>

        {/* ---------------------- Features Section ---------------------- */}
        <section id="features" className="text-center space-y-10 scroll-mt-24">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Smarter Care with AI Insight
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Delivering instant analysis and voice interaction for users,
            enabling seamless communication and faster decision-making powered
            by intelligent AI insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <ChartArea className="mx-auto mb-4 text-[#01584f]" size={48} />
              <h3 className="font-bold text-xl text-[#009688] mb-2">
                Automated Diagnostic Reports
              </h3>
              <p className="text-gray-600">
                After an image is analyzed, MediTalk generates a structured
                report.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <Bot className="mx-auto mb-4 text-[#01584f]" size={48} />
              <h3 className="font-bold text-xl text-[#009688] mb-2">
                Real-Time Feedback
              </h3>
              <p className="text-gray-600">
                As the AI processes an image, it provides progressive feedback.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <Orbit className="mx-auto mb-4 text-[#01584f]" size={48} />
              <h3 className="font-bold text-xl text-[#009688] mb-2">
                Symptom Correlation
              </h3>
              <p className="text-gray-600">
                Users can describe symptoms via voice and MediTalk correlates
                this with image findings.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------- About Section ---------------------- */}
        <section
          id="about"
          className="flex flex-col md:flex-row items-center gap-12 scroll-mt-24"
        >
          <div className="flex-1 order-2 md:order-1">
            <Image
              src="/images/nurse.jpg"
              alt="AI health technology"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>

          <div className="flex-1 order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              About <span className="text-[#009688]">MediTalk</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              MediTalk bridges the gap between AI innovation and healthcare
              delivery by empowering users with smarter and faster analysis
              tools.
            </p>
            <button className="bg-[#009688] hover:bg-[#00796B] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
              Learn More
            </button>
          </div>
        </section>

        {/* ---------------------- CTA Section ---------------------- */}
        <section
          id="cta"
          className="bg-[#CCF0EC] rounded-2xl text-center py-16 space-y-6 relative overflow-hidden scroll-mt-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#B2EBE4] to-[#E0F7F4] opacity-60"></div>
          <h2 className="text-4xl font-extrabold text-[#004D40] relative z-10">
            Have Questions? Get in Touch!
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto relative z-10">
            Join the future of AI healthcare. Collaborate with us to bring
            innovation to your medical team.
          </p>
          <button className="bg-[#009688] hover:bg-[#00796B] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition relative z-10">
            Contact
          </button>
        </section>
      </main>

      {/* ---------------------- Footer ---------------------- */}
      <footer className="bg-[#004D40] text-gray-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="font-semibold text-lg text-white">MediTalk</p>
          <p>AI-driven healthcare solutions for the modern world.</p>
          <p className="text-sm text-gray-400">
            © 2025 MediTalk Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
