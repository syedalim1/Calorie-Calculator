import React from "react";
import Head from "next/head";
import GoogleAnalytics from "@/components/analyse";
import { Github, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const CustomHead = () => {
  const siteTitle = "AI Calorie Calculator | Food Recognition";

  const description =
    "Utilize AI technology to recognize food images and generate calorie statistics, helping you better manage your dietary health.";
  const pageImage = "https://aicc.gptdevelopment.online/cor.webp";
  const keywords =
    "AI, food recognition, calorie counting, calorie statistics， Calorie Calculator， AI Calorie Calculator， Do Calorie Calculator， ";

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={siteTitle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta itemProp="name" content={siteTitle} />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="keywords" content={keywords} />
      <meta name="application-name" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content="https://aicc.gptdevelopment.online/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content={siteTitle} />
      <meta name="twitter:site" content="https://aicc.gptdevelopment.online/" />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:description" content={description} />
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
        <div className="   items-center p-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group relative">
              <span className="text-white font-bold text-lg">CC</span>
              <span className="absolute -top-1 -right-1 animate-pulse">
                <Sparkles size={14} className="text-yellow-300" />
              </span>
            </div>
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
