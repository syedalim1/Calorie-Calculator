import { CalorieCalculatorPage } from "@/components/calorie-calculator";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Sun, Moon, Github, Sparkles } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("light");

  // Theme switching functionality
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("calorie-calculator-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("calorie-calculator-theme", newTheme);
  };

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AI Calorie Calculator",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "127",
            },
          })}
        </script>
      </Head>
      <div className="flex items-center gap-3">
        <main className="pt-16 relative z-10">
          <CalorieCalculatorPage theme={theme} />
        </main>
      </div>
    </>
  );
}
