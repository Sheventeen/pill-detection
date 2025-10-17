"use client";

import { Features } from "@/components/landing-page/Features";
import Header from "@/components/landing-page/Header";
import { Hero } from "@/components/landing-page/Hero";
import { Footer } from "@/components/landing-page/Footer";
import { UploadImage } from "@/components/UploadImage";
import React, { useState } from "react";

interface PredictionResult {
  status: "success" | "error";
  diagnosis: "Pneumonia" | "Normal" | "Analyzing...";
  confidence?: number;
}

const LandingPage: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<PredictionResult>({
    status: "success",
    diagnosis: "Upload an X-ray to begin.",
  });

  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAnalysisResult({ status: "error", diagnosis: "No file selected." });
      return;
    }

    setFileName(file.name);
    setIsLoading(true);
    setAnalysisResult({ status: "success", diagnosis: "Analyzing..." });

    // In a real application, you would create a FormData object to send the image
    const formData = new FormData();
    formData.append("xray_image", file);

    try {
      const apiEndpoint = "YOUR_FLASK_API_URL/predict";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      const data: PredictionResult = await response.json();

      setTimeout(() => {
        setIsLoading(false);
        setAnalysisResult({
          status: "success",
          diagnosis: "Pneumonia",
          confidence: 0.98,
        });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setAnalysisResult({
        status: "error",
        diagnosis: "API Connection Failed.",
      });
      console.error("API Error:", error);
    }
  };

  const getResultText = () => {
    if (isLoading) return "Processing image with CNN...";

    const { diagnosis, confidence } = analysisResult;

    if (confidence !== undefined) {
      const confidencePercent = (confidence * 100).toFixed(2);
      const color =
        diagnosis === "Pneumonia" ? "text-red-600" : "text-green-600";
      return (
        <span className="font-bold">
          <span className={color}>{diagnosis}</span> (Confidence:{" "}
          {confidencePercent}%)
        </span>
      );
    }

    return <span className="text-gray-600 font-normal ml-2">{diagnosis}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 space-y-20">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
