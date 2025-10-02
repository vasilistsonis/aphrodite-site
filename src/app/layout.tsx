// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aphrodite Residences — Athens Riviera · Voula",
  description:
    "Elegant multi-level apartments in Voula, Athens Riviera. Private balconies, rooftop pools, and refined living.",
  keywords: [
    "Aphrodite Residences",
    "Voula",
    "Athens Riviera",
    "apartments",
    "luxury real estate",
  ],
  openGraph: {
    title: "Aphrodite Residences — Athens Riviera",
    description:
      "Elegant multi-level apartments in Voula with rooftop pools and private balconies.",
    url: "https://aphrodite-site.vercel.app", // change to your domain later
    siteName: "Aphrodite Residences",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Aphrodite Residences" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aphrodite Residences — Athens Riviera",
    description:
      "Elegant multi-level apartments in Voula with rooftop pools and private balconies.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
