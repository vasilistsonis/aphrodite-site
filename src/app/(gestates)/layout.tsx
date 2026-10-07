// src/app/(gestates)/layout.tsx
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./gestates.css";
import SiteHeader from "./_components/SiteHeader";
import Effects from "./_components/Effects";
import Lightbox from "./_components/Lightbox";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function GestatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`gx ${cormorant.variable} ${jost.variable}`}>
      <SiteHeader />
      {children}
      <Lightbox />
      <Effects />
    </div>
  );
}
