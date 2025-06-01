import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vincent Friend Newsletter",
  description: "Occasional updates from Vincent McLeese. That's it folks.",
  icons: {
    icon: "/favicon-32x32.png", // Standard favicon for browser tabs
    apple: "/apple-touch-icon.png", // For Apple touch icons
    // You can also add other sizes or types if needed:
    // shortcut: '/favicon-16x16.png', // For older browsers
    // other: [
    //   {
    //     rel: 'icon',
    //     url: '/favicon-16x16.png',
    //     sizes: '16x16',
    //   },
    // ],
  },
  openGraph: {
    title: "Vincent Friend Newsletter",
    description: "Occasional updates from Vincent McLeese. That's it folks.",
    url: "https://vincentmcleese.com",
    siteName: "vincentmcleese.com",
    // You could add an image here if you have one for social sharing
    // images: [
    //   {
    //     url: 'https://vincentmcleese.com/og-image.png', // Must be an absolute URL
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Friend Newsletter",
    description: "Occasional updates from Vincent McLeese. That's it folks.",
    // site: '@yourtwitterhandle', // Optional: your Twitter handle
    // creator: '@yourtwitterhandle', // Optional: your Twitter handle
    // images: ['https://vincentmcleese.com/twitter-image.png'], // Must be an absolute URL
  },
  // You can also add other metadata tags like keywords, viewport, etc.
  // viewport: 'width=device-width, initial-scale=1',
  // keywords: ['newsletter', 'vincent mcleese', 'updates'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
