// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─── Canonical domain ──────────────────────────────────────────────────── */
const SITE_URL = "https://www.gestates.gr";
const SITE_NAME = "Aphrodite Residences";
const SITE_TITLE = "Aphrodite Residences | Luxury Apartments in Voula, Athens Riviera";
const SITE_DESCRIPTION =
  "Exclusive luxury apartments in Voula, Athens Riviera. Explore three multi-level residences from 168 to 269 m2 with private balconies, rooftop pools and premium finishes by Tolikas Development.";

/* ─── JSON-LD structured data ───────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ApartmentComplex",
      "@id": `${SITE_URL}/#complex`,
      name: SITE_NAME,
      alternateName: "Aphrodite Residences Voula",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: [
        `${SITE_URL}/images/page01_img1.jpeg`,
        `${SITE_URL}/images/page17_img1.png`,
        `${SITE_URL}/images/imagepoolc1.png`,
      ],
      logo: `${SITE_URL}/favicon.ico`,
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
      telephone: "+30-211-198-5345",
      email: "d.tolikas@tolikas.gr",
      brand: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
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
      logo: `${SITE_URL}/favicon.ico`,
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
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#complex` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/page01_img1.jpeg`,
      },
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    },
  ],
};

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  verification: {
    google: "Ajn-M7BvE88EgXS4VQOulDS2S295_cfsxXchoHKCUXY",
  },

  title: {
    default: SITE_TITLE,
    template: "%s | Aphrodite Residences",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Tolikas Development", url: "https://www.tolikas.gr" }],
  creator: "Tolikas Development",
  publisher: "Tolikas Development",
  category: "Real Estate",

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
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },

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
