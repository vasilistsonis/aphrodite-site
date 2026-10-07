/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import ContactForm from "../_components/ContactForm";
import Footer from "../_components/Footer";
import Residences from "./Residences";

const TITLE = "Fleming Residences — Eight Private Residences in Glyfada, Athens Riviera | Gestates";
const DESCRIPTION =
  "Fleming Residences: an exclusive collection of eight private residences in the heart of Glyfada on the Athenian Riviera — maisonettes with private pools and gardens, apartments and penthouses with rooftop pools. Designed by Petropoulou Architects.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Fleming Residences",
    "Glyfada",
    "Athens Riviera",
    "luxury apartments",
    "penthouse",
    "maisonette",
    "Γλυφάδα",
    "διαμερίσματα",
    "νεόδμητα",
    "Gestates",
  ],
  alternates: { canonical: "/fleming" },
  openGraph: {
    title: "Fleming Residences — Glyfada, Athens Riviera",
    description: "Eight private residences with gardens, terraces and private pools in the heart of Glyfada.",
    url: "/fleming",
    siteName: "Gestates",
    images: [{ url: "/fleming/img/hero-front.jpg" }],
    type: "website",
  },
};

const IMG = "/fleming/img/";

const GALLERY = [
  { w: "w4", src: "ext-aerial-pools.jpg", alt: "Aerial view — roof gardens and pools", cap: "Aerial view" },
  { w: "w2", src: "ext-street.jpg", alt: "Street view", cap: "Street view" },
  { w: "w2", src: "ext-aerial.jpg", alt: "Aerial view of the building and its setting", cap: "From above" },
  { w: "w4", src: "ext-corner.jpg", alt: "Corner view", cap: "Corner view" },
  { w: "w3", src: "ext-night.jpg", alt: "Front view at dusk", cap: "At dusk" },
  { w: "w3", src: "entrance.jpg", alt: "Central entrance", cap: "Central entrance" },
];

const FEATURES: { label: string; svg: React.ReactNode }[] = [
  {
    label: "Energy fireplace",
    svg: (
      <>
        <path d="M5 30h24M8 30V12h18v18M5 12h24M11 12V6h12v6" />
        <path d="M17 27c-3 0-4-2-4-4 0-3 4-4 4-8 2 2 4 4 4 8 0 2-1 4-4 4z" />
      </>
    ),
  },
  {
    label: "VRV central climatization",
    svg: (
      <>
        <path d="M8 4v26M4 8l4 4 4-4M4 26l4-4 4 4" />
        <circle cx="20" cy="10" r="1.5" />
        <circle cx="26" cy="14" r="1.5" />
        <circle cx="20" cy="19" r="1.5" />
        <circle cx="27" cy="23" r="1.5" />
        <circle cx="21" cy="27" r="1.5" />
      </>
    ),
  },
  {
    label: "Floor heating",
    svg: (
      <>
        <path d="M4 26h26M4 30h26" />
        <path d="M11 20c-2-2 2-4 0-7s2-4 0-7M17 20c-2-2 2-4 0-7s2-4 0-7M23 20c-2-2 2-4 0-7s2-4 0-7" />
      </>
    ),
  },
  {
    label: "Window frames Uw = 1.8",
    svg: (
      <>
        <path d="M24 4v26M28 4v26" />
        <circle cx="12" cy="17" r="5" />
        <path d="M12 6v3M12 25v3M3 17h3M18 17h3M5.5 10.5l2 2M16.5 21.5l2 2M5.5 23.5l2-2M16.5 12.5l2-2" />
      </>
    ),
  },
  {
    label: "Pilotis & roof insulation 10 cm",
    svg: (
      <>
        <path d="M4 12l13-6 13 6-13 6z" />
        <path d="M4 17l13 6 13-6M4 22l13 6 13-6" />
      </>
    ),
  },
  {
    label: "External thermal insulation 10 cm",
    svg: <path d="M6 6l8 11-8 11M13 6l8 11-8 11M20 6l8 11-8 11" />,
  },
];

export default function FlemingPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="home" style={{ padding: 0 }}>
        <img className="bg" src={IMG + "hero-front.jpg"} alt="Fleming Residences front view, Glyfada" />
        <div className="wrap">
          <div className="eyebrow">Glyfada · Athens Riviera · New development</div>
          <h1>
            <b>FLEMING</b> | Residences
          </h1>
          <p>
            An exclusive collection of just eight private residences — gardens, terraces and private
            pools in the heart of Glyfada.
          </p>
          <a className="btn" href="#residences">
            Explore the residences
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="split top reveal">
            <div>
              <div className="eyebrow">Introduction · Architectural design</div>
              <h2 style={{ marginTop: 16 }}>
                Contemporary Riviera living, <b>privately</b> composed
              </h2>
            </div>
            <div>
              <p className="lead">
                Designed as an exclusive collection of just eight private residences, the building
                redefines contemporary Riviera living through a carefully balanced architectural
                language of privacy, openness, and refined simplicity.
              </p>
              <p style={{ marginTop: 20 }}>
                The architecture emphasizes exclusivity and tranquility, integrating landscaped
                gardens, spacious terraces, and private roof gardens that extend the living
                experience into the open air. Thoughtfully composed volumes, natural materials, and
                abundant daylight create a sense of timeless elegance, while the limited number of
                residences ensures an intimate and highly private residential environment.
              </p>
            </div>
          </div>
          <div className="stats reveal">
            <div>
              <b>8</b>
              <span>Private residences</span>
            </div>
            <div>
              <b>4</b>
              <span>Private pools</span>
            </div>
            <div>
              <b>201–255</b>
              <span>m² interior</span>
            </div>
            <div>
              <b>20 km</b>
              <span>to Athens Airport</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="gallery reveal">
            {GALLERY.map((g) => (
              <button key={g.src} className={g.w} data-lb="ext">
                <img src={IMG + g.src} alt={g.alt} loading="lazy" />
                <figcaption>{g.cap}</figcaption>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section style={{ background: "var(--bg-2)" }}>
        <div className="wrap split reveal">
          <img src={IMG + "entrance.jpg"} alt="Central entrance with water feature and atrium" loading="lazy" />
          <div>
            <div className="eyebrow">Design philosophy</div>
            <h2 style={{ margin: "16px 0 24px" }}>
              An architectural <b>promenade</b>
            </h2>
            <p>
              Conceived as a seamless architectural promenade, the building is designed to guide
              residents through a carefully curated sequence of living spaces framed by light,
              landscape, and panoramic views. Rooted in a contemporary interpretation of the
              Athenian Riviera lifestyle, the architecture celebrates openness, fluidity, and
              effortless living.
            </p>
            <p style={{ marginTop: 18 }}>
              Generous terraces, open-plan interiors, and floor-to-ceiling glazing dissolve the
              boundaries between indoors and outdoors, creating a continuous dialogue with nature,
              sunlight, and the Mediterranean climate. Warm natural materials, integrated greenery,
              and refined detailing reinforce a sense of understated luxury.
            </p>
            <p style={{ marginTop: 22 }} className="eyebrow">
              Petropoulou Architects
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location">
        <div className="wrap split top reveal">
          <div>
            <div className="eyebrow">Location</div>
            <h2 style={{ margin: "16px 0 24px" }}>
              The heart of <b>Glyfada</b>
            </h2>
            <p>
              Located in the heart of Glyfada, Fleming Residences enjoy a prime position within one
              of the most desirable areas of the Athenian Riviera — the calm of an upscale
              residential neighbourhood with immediate access to premium amenities.
            </p>
            <p style={{ marginTop: 18 }}>
              Just moments from the marina and waterfront, residents enjoy beaches, yacht clubs,
              seaside promenades and renowned dining. Glyfada’s vibrant centre — luxury boutiques,
              cafés, restaurants — is within close reach, alongside golf, wellness centres,
              international schools and curated retail.
            </p>
          </div>
          <div>
            <ul className="dist">
              <li>
                <span>Athens city centre</span>
                <span>13 km</span>
              </li>
              <li>
                <span>Port of Piraeus</span>
                <span>15 km</span>
              </li>
              <li>
                <span>Athens International Airport “El. Venizelos”</span>
                <span>20 km</span>
              </li>
            </ul>
            <p className="eyebrow" style={{ margin: "32px 0 10px" }}>
              Nearby
            </p>
            <p>
              Marina of Agios Kosmas · Golf of Glyfada · The Hellinikon project · Glyfada centre ·
              Nautical &amp; Athletic Club of Voula · Astir Beach · Four Seasons Astir Palace ·
              Marina of Alimos
            </p>
          </div>
        </div>
      </section>

      {/* RESIDENCES */}
      <section id="residences" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <div className="reveal">
            <div className="eyebrow">The residences</div>
            <h2 style={{ marginTop: 16 }}>
              Four residence types, <b>two of each</b>
            </h2>
          </div>

          <Residences />

          <div className="feats reveal">
            {FEATURES.map((f) => (
              <div key={f.label}>
                <svg viewBox="0 0 34 34" aria-hidden="true">
                  {f.svg}
                </svg>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section>
        <div className="wrap reveal">
          <div className="eyebrow">The team</div>
          <h2 style={{ marginTop: 16 }}>
            Built by <b>specialists</b>
          </h2>
          <div className="team">
            <div>
              <div className="eyebrow">Management &amp; construction</div>
              <p>
                Gestates
                <br />
                Tolikas Development
              </p>
            </div>
            <div>
              <div className="eyebrow">Technical study</div>
              <p>
                Future Constructions
                <br />
                <span style={{ fontSize: 17, color: "var(--muted)" }}>
                  Stathis Stathakis – Sophocles Morphopoulos
                </span>
              </p>
            </div>
            <div>
              <div className="eyebrow">Architectural design</div>
              <p>Petropoulou Architects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="wrap split top">
          <div>
            <div className="eyebrow">Contact</div>
            <h2 style={{ margin: "16px 0 20px" }}>
              Arrange a <b>private viewing</b>
            </h2>
            <p>For availability, pricing and the full brochure of Fleming Residences, contact our team.</p>
            <ul className="cinfo">
              <li>
                <small>Phone</small>
                <a href="tel:+302111985345">+30 211 198 5345</a>
              </li>
              <li>
                <small>Email</small>
                <a href="mailto:d.tolikas@tolikas.gr">d.tolikas@tolikas.gr</a>
              </li>
              <li>
                <small>Office</small>Afroditis 10 &amp; El. Venizelou 43, Voula
              </li>
            </ul>
          </div>
          <ContactForm
            projects={["Fleming Residences", "Aphrodite Residences", "General enquiry"]}
            placeholder="Which residence are you interested in?"
          />
        </div>
      </section>

      <Footer note="Fleming Residences, Glyfada" />
    </>
  );
}
