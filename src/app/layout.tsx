// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─── Canonical domain ──────────────────────────────────────────────────── */
const SITE_URL = "https://www.gestates.gr";

/* ─── JSON-LD structured data ───────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ApartmentComplex",
      "@id": `${SITE_URL}/#complex`,
      name: "Aphrodite Residences",
      alternateName: "Aphrodite Residences Voula",
      description:
        "Luxury multi-level apartments in Voula, Athens Riviera. Three exclusive residences — A3, C1 and C2 — featuring private balconies, rooftop pools and refined interiors by Tolikas Development.",
      url: SITE_URL,
      image: `${SITE_URL}/images/page01_img1.jpeg`,
      numberOfRooms: "3 to 4",
      floorSize: {
        "@type": "QuantitativeValue",
        minValue: 168.5,
        maxValue: 269,
        unitCode: "MTK",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Rooftop Swimming Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Balconies", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Lift", value: true },
        { "@type": "LocationFeatureSpecification", name: "Rooftop Garden", value: true },
        { "@type": "LocationFeatureSpecification", name: "Indoor Parking", value: true },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Afroditis 10 & El. Venizelou 43",
        addressLocality: "Voula",
        addressRegion: "Attica",
        postalCode: "166 73",
        addressCountry: "GR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.8432,
        longitude: 23.7783,
      },
      containsPlace: [
        {
          "@type": "Apartment",
          name: "Apartment A3",
          floorSize: { "@type": "QuantitativeValue", value: 168.5, unitCode: "MTK" },
          numberOfRooms: 3,
        },
        {
          "@type": "Apartment",
          name: "Duplex Apartment C1",
          floorSize: { "@type": "QuantitativeValue", value: 229.5, unitCode: "MTK" },
          numberOfRooms: 3,
        },
        {
          "@type": "Apartment",
          name: "Duplex Apartment C2",
          floorSize: { "@type": "QuantitativeValue", value: 269, unitCode: "MTK" },
          numberOfRooms: 3,
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Tolikas Development",
      url: "https://www.tolikas.gr",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+30-211-198-5345",
        email: "d.tolikas@tolikas.gr",
        contactType: "sales",
        availableLanguage: ["Greek", "English"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Voula",
        addressRegion: "Attica",
        addressCountry: "GR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aphrodite Residences",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Aphrodite Residences — Luxury Apartments | Athens Riviera, Voula",
    template: "%s | Aphrodite Residences",
  },
  description:
    "Exclusive luxury apartments in Voula, Athens Riviera. Three multi-level residences (168–269 m²) with private balconies, rooftop pools and premium finishes by Tolikas Development.",

  keywords: [
    "Aphrodite Residences",
    "luxury apartments Voula",
    "Athens Riviera real estate",
    "apartments for sale Voula",
    "luxury real estate Greece",
    "Tolikas Development",
    "Voula apartment",
    "Athens Riviera apartment",
    "duplex apartment Athens",
    "rooftop pool apartment Greece",
    "νέα οικοδομή Βούλα",
    "πολυτελείς κατοικίες Αθηναϊκή Ριβιέρα",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Aphrodite Residences — Luxury Apartments on the Athens Riviera",
    description:
      "Exclusive multi-level apartments in Voula with rooftop pools, private balconies and refined interiors. 168–269 m² residences by Tolikas Development.",
    url: SITE_URL,
    siteName: "Aphrodite Residences",
    images: [
      {
        url: "/opengraph-image",   // Next.js auto-generated OG image
        width: 1200,
        height: 630,
        alt: "Aphrodite Residences — Luxury Apartments, Athens Riviera, Voula",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aphrodite Residences — Athens Riviera",
    description:
      "Exclusive luxury apartments in Voula with rooftop pools & private balconies. 168–269 m² by Tolikas Development.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ─── Viewport (themeColor lives here in Next.js 14+) ────────────────────── */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/* ─── Root layout ────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          id="json-ld"
          type="application/ld+json"
          // biome-ignore lint: dangerouslySetInnerHTML required for JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
