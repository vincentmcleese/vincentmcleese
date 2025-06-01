"use client"; // This MUST be the first line

// import { Metadata } from 'next'; // Removed Metadata import
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Send, Twitter } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "./landing-page.css";

// Removed metadata export as it cannot be in a Client Component
// export const metadata: Metadata = { ... };

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    toast.dismiss();

    if (!email) {
      toast.error("Please enter your email address.");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/addToSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Only send email
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Successfully subscribed!");
        setEmail(""); // Clear input field
      } else {
        toast.error(
          data.message ||
            "Subscription failed. Please try again or contact Vincent at mcleesevj@gmail.com"
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        "An unexpected error occurred. Please try again or contact Vincent at mcleesevj@gmail.com"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="landing-page-container relative min-h-screen flex flex-col justify-start items-center pt-80 md:justify-center md:items-center md:pt-0 p-4">
      <Toaster position="top-center" /> {/* Add Toaster component */}
      <main className="w-full max-w-xl z-10 md:transform md:translate-x-48 animate-fadeInUp-main">
        <div className="shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-black md:bg-black/90 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 font-sans">
              Vincent Friend Newsletter
            </h1>
            <p className="text-gray-200 text-center mb-8 text-lg">
              Occasional updates. That's it folks.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="flex-grow text-base bg-white/80 placeholder:text-gray-600 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-black hover:bg-gray-200 font-semibold text-base disabled:opacity-70"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="mt-12 bg-black bg-opacity-50 p-4 rounded-md z-10 md:transform md:translate-x-48 animate-fadeInUp-footer">
        <div className="flex space-x-6 justify-center">
          <a
            href="https://www.linkedin.com/in/vincentmcleese/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://t.me/shuaigerr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500"
          >
            <Send size={28} />
          </a>
          <a
            href="https://x.com/daivincidev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500"
          >
            <Twitter size={28} />
          </a>
        </div>
      </footer>
    </div>
  );
}
