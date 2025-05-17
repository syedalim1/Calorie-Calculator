import React from "react";
import Head from "next/head";
import GoogleAnalytics from "@/components/analyse";
import { Github, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const CustomHead = () => {
  const siteTitle =
    "AI Calorie Calculator | Food Recognition & Nutrition Analysis";
  const description =
    "Track your calories and nutrition intake with our AI-powered food recognition tool. Simply upload a photo of your meal to get instant calorie counts, macronutrient breakdowns, and personalized nutrition advice.";
  const pageImage =
    "https://calorie-calculator.codenovatech.in/images/calorie-calculator-social.jpg";
  const keywords =
    "AI, food recognition, calorie counting, calorie calculator, nutrition tracking, diet app, meal analyzer, food tracking, healthy eating, weight management, nutrition facts, food AI, diet planner, calorie counter, food scanner";
  const canonicalUrl = "https://calorie-calculator.codenovatech.in/";

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="CodeNovaTech" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="AI Calorie Calculator" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImage} />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data / JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Calorie Calculator",
            url: canonicalUrl,
            description: description,
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </Head>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <CustomHead />
      <GoogleAnalytics />

      <header className="flex items-center justify-center bg-gradient-to-r from-violet-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-lg shadow-lg shadow-violet-500/10 transition-all duration-300">
        <div className="items-center p-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">          
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-105">
                Calorie Calculator
              </span>
              <p className="text-xs text-white/60 hidden md:block">
                AI-Powered Food Recognition
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
