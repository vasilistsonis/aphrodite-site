// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.gestates.gr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "Ajn-M7BvE88EgXS4VQOulDS2S295_cfsxXchoHKCUXY",
  },
  title: {
    default: "Gestates — Luxury Residences on the Athens Riviera | Voula · Glyfada",
    template: "%s | Gestates",
  },
  applicationName: "Gestates",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
