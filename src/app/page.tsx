"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { MapPin, Waves, Plane, Ship, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PHOTOS, PLANS, ALL_IMAGES } from "./imageList";

/* =========================
   PALETTE (all-white base)
========================= */
const C = {
  dark: "#192524",
  teal: "#3C5759",
  sage: "#959D90",
  gray: "#D0D5CE",
  white: "#FFFFFF",
};

// --- toggles ---
const SHOW_PLANS = false;   // hide floor plan thumbnails
const SHOW_GALLERY = false; // hide the gallery section


/* =========================
   UI Primitives
========================= */
type SectionProps = { id: string; className?: string; children: React.ReactNode };
const Section: React.FC<SectionProps> = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`py-16 md:py-20 [scroll-margin-top:96px] ${className}`}
  >
    {children}
  </section>
);

type ContainerProps = { className?: string; children: React.ReactNode };
const Container: React.FC<ContainerProps> = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>
);

/** Every Card now reveals on scroll (fade + rise) */
type CardProps = { className?: string; children: React.ReactNode };
const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div
    className={`reveal rounded-3xl border p-6 shadow-[0_4px_32px_0_rgba(25,37,36,0.07)] will-change-transform ${className}`}
    style={{
      borderColor: C.gray,
      background: C.white,
      opacity: 0,
      transform: "translateY(14px)",
    }}
  >
    {children}
  </div>
);

type StatProps = { label: string; value: string };
const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div className="flex flex-col items-start gap-1 border-l-2 pl-3" style={{ borderColor: C.gray }}>
    <span className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: C.sage }}>
      {label}
    </span>
    <span className="text-base font-semibold leading-snug" style={{ color: C.dark }}>
      {value}
    </span>
  </div>
);

/* =========================
   Filename matcher helpers
========================= */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const FILES_NORM = ALL_IMAGES.map((f) => ({ raw: f, key: norm(f.replace(/\.[a-z0-9]+$/i, "")) }));
function pick(prefix: string): string | undefined {
  const k = norm(prefix);
  return FILES_NORM.find((x) => x.key.startsWith(k))?.raw;
}

/* =========================
   Hero slideshow (no parallax)
========================= */
const HERO_SLIDES: string[] = [PHOTOS[0], PHOTOS[1], PHOTOS[2], PHOTOS[3]].filter(Boolean);

/* =========================
   Map background choice
========================= */
const MAP_IMAGE = pick("page10img2");

/* =========================
   Apartments content
========================= */
type Floor = { name: string; planImage?: string; info: string[] };
type Apt = {
  key: "A3" | "C1" | "C2";
  title: string;
  description: string;
  floors: Floor[];
  stats: { label: string; value: string }[];
  photos: string[];
};

/* --- A3 --- */
const A3_DESC = `Two Levels of Luxurious Living

1st Floor: two spacious bedrooms and a shared modern bathroom provide comfort and privacy.
2nd Floor (Mezzanine): the main living heart with open-plan living & dining, a semi-open kitchen, one master bedroom with ensuite, guest WC and an auxiliary space.

Private balconies total 50.00 m², creating a smooth connection between indoor comfort and outdoor relaxation.`;

const A3: Apt = {
  key: "A3",
  title: "Apartment A3 — 168.50 m²",
  description: A3_DESC,
  floors: [
    {
      name: "A3 (1) — First Floor",
      planImage: pick("page15img1"),
      info: ["2 bedrooms", "1 shared bathroom", "Quiet private layout"],
    },
    {
      name: "A3 (2) — Second Floor (Mezzanine)",
      planImage: pick("page16img1"),
      info: ["Living & dining area", "Semi-open kitchen", "Master bedroom with ensuite", "Guest WC · Auxiliary space"],
    },
  ],
  stats: [
    { label: "Total Surface", value: "168.50 m²" },
    { label: "A3 (1)", value: "60.00 m²" },
    { label: "A3 (2)", value: "108.50 m²" },
    { label: "Private Balconies", value: "2 × 25.00 m² (50.00 m² total)" },
  ],
  photos: [pick("page17img1")!].filter(Boolean),
};

/* --- C1 --- */
const C1_DESC = `Three Levels

3rd Floor (Main Living Areas): living room, dining, kitchen with pantry, guest WC, and balcony access.
Mezzanine (Master Bedrooms): three luxurious master bedrooms reached by a private staircase and private lift.
Rooftop (Exclusive Use): planted garden of 103.70 m² with an 11.00 m² swimming pool. Includes 2 indoor parking spaces and a 44.50 m² maid’s room.`;

const C1: Apt = {
  key: "C1",
  title: "Duplex Apartment C1 — 229.50 m²",
  description: C1_DESC,
  floors: [
    {
      name: "C1 (3) — Third Floor (Main Living Areas)",
      planImage: pick("page21img1"),
      info: ["Living + dining", "Kitchen + pantry", "Guest WC", "Balcony access"],
    },
    {
      name: "C1 (4) — Mezzanine (Master Bedrooms)",
      planImage: pick("page22img1"),
      info: ["3 master bedrooms", "Private staircase & private lift"],
    },
    {
      name: "C1 (5) — Rooftop (Exclusive Use)",
      planImage: pick("page23img1"),
      info: ["Planted garden 103.70 m²", "Swimming pool 11.00 m²"],
    },
  ],
  stats: [
    { label: "Total Surface", value: "229.50 m²" },
    { label: "3rd Floor", value: "109.00 m²" },
    { label: "4th Floor", value: "103.00 m²" },
    { label: "Rooftop", value: "17.50 m²" },
    { label: "Balconies", value: "49.05 m² total" },
  ],
  photos: [pick("page24img1"), pick("imagepoolc1")].filter(Boolean) as string[] ,
  
};

/* --- C2 --- */
const C2_DESC = `Three Levels of Spacious, Exclusive Living

3rd Floor: three master bedrooms with generous closets and natural light; auxiliary spaces; two independent entrances; private internal lift.
Mezzanine: expansive living & entertaining hub; open-plan kitchen with premium appliances and pantry; guest WC.
Rooftop (Exclusive Use): planted area of 124.80 m² with a 12.95 m² pool and WC. Private balconies total 57.05 m².`;

const C2: Apt = {
  key: "C2",
  title: "Duplex Apartment C2 — 269.00 m²",
  description: C2_DESC,
  floors: [
    {
      name: "C2 (3) — Third Floor (Master Suites)",
      planImage: pick("page28img1"),
      info: ["3 master bedrooms", "Auxiliary spaces", "2 entrances", "Private internal lift"],
    },
    {
      name: "C2 (4) — Mezzanine (Living & Kitchen)",
      planImage: pick("page28img1"),
      info: ["Living & dining", "Open-plan kitchen + pantry", "Guest WC"],
    },
    {
      name: "C2 (5) — Rooftop (Exclusive Use)",
      planImage: pick("page28img1"),
      info: ["Planted area 124.80 m²", "Pool 12.95 m²", "Rooftop WC"],
    },
  ],
  stats: [
    { label: "Total Surface", value: "269.00 m²" },
    { label: "3rd Floor", value: "126.85 m²" },
    { label: "4th Floor", value: "122.35 m²" },
    { label: "Rooftop", value: "19.80 m²" },
    { label: "Balconies", value: "57.05 m² total" },
  ],
  photos: [pick("page31img1"), pick("imagec1"), pick("page32img1"), pick("page33img1")].filter(Boolean) as string[],
};

const APARTMENTS: Apt[] = [A3, C1, C2];

/* =========================
   Lightbox (simple modal)
========================= */
type LightboxState = { open: boolean; items: string[]; index: number };
function useLightbox() {
  const [state, setState] = useState<LightboxState>({ open: false, items: [], index: 0 });

  const open = useCallback((items: string[], index = 0) => {
    setState({ open: true, items, index });
    document.body.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  }, []);
  const next = useCallback(() => {
    setState((s) => ({ ...s, index: (s.index + 1) % s.items.length }));
  }, []);
  const prev = useCallback(() => {
    setState((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length }));
  }, []);

  // keyboard controls
  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.open, next, prev, close]);

  return { state, open, close, next, prev };
}

const Lightbox: React.FC<{
  state: LightboxState;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ state, onClose, onNext, onPrev }) => {
  if (!state.open) return null;
  const src = state.items[state.index];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-5 w-5" />
      </button>
      {state.items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <img
        src={`/images/${src}`}
        alt="Preview"
        className="max-h-[85vh] max-w-[92vw] rounded-xl border bg-white object-contain shadow-2xl"
        style={{ borderColor: C.gray }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
function ContactForm() {
  // typed status for nicer TS
  const [status, setStatus] =
    React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = React.useState<string>("");
  const [showOK, setShowOK] = React.useState(false); // success popup
  const tsRef = React.useRef<HTMLInputElement>(null); // anti-bot timestamp

  // set timestamp when component mounts
  React.useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
  }, []);

  // ---- Types for the payload we send to /api/contact ----
  type ContactPayload = {
    name: string;
    email: string;
    phone?: string;
    message: string;
    company?: string; // honeypot field (should be empty)
    ts?: string;      // timestamp string
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Build a typed payload (no `any`)
    const formData = new FormData(form);
    const raw = Object.fromEntries(
      formData.entries()
    ) as Record<string, FormDataEntryValue>;

    const payload: ContactPayload = {
      name: String(raw.name || ""),
      email: String(raw.email || ""),
      phone: raw.phone ? String(raw.phone) : undefined,
      message: String(raw.message || ""),
      company: raw.company ? String(raw.company) : undefined,
      ts: raw.ts ? String(raw.ts) : undefined,
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send");
      }

      // success: clear form, reset timestamp, show popup
      form.reset();
      if (tsRef.current) tsRef.current.value = String(Date.now());
      setStatus("ok");
      setShowOK(true);
      // auto-hide popup after 4s
      window.setTimeout(() => setShowOK(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setError(msg);
    }
  }

  // basic styles to match your white cards + shadows
  const inputStyle: React.CSSProperties = {
    border: "1px solid #D0D5CE",
    background: "#F9FAFA",
    color: "#192524",
    transition: "border-color .2s, box-shadow .2s",
  };

  return (
    <>
      {/* Success popup */}
      {showOK && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">Message sent ✅</h3>
            <p className="mt-2 text-sm text-gray-600">
              Thank you! We’ll get back to you shortly.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowOK(false)}
                className="rounded-xl px-4 py-2 text-sm font-semibold shadow"
                style={{ border: "1px solid #192524", background: "#3C5759", color: "#fff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact form */}
      <form onSubmit={onSubmit} className="grid gap-4">
        {/* Honeypot: bots fill this; humans never see it */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
          aria-hidden="true"
        />
        {/* Timestamp for “too-fast” submissions */}
        <input type="hidden" name="ts" ref={tsRef} />

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: C.sage }}>Full Name</label>
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl px-4 py-3 text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: C.sage }}>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@email.com"
              className="rounded-xl px-4 py-3 text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: C.sage }}>Phone</label>
            <input
              name="phone"
              placeholder="+30 …"
              className="rounded-xl px-4 py-3 text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: C.sage }}>Message</label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Preferred dates, apartment of interest (A3, C1, C2)…"
              className="rounded-xl px-4 py-3 text-sm outline-none"
              style={inputStyle}
            />
          </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-[.98] disabled:opacity-60"
          style={{ background: "#3C5759", color: "white" }}
        >
          {status === "sending" ? (
            <><svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending…</>
          ) : (
            <>Submit Request<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
          )}
        </button>

        {status === "error" && (
          <p className="text-sm" style={{ color: "crimson" }}>
            Error: {error}
          </p>
        )}
      </form>
    </>
  );
}



/* =========================
   Page
========================= */
export default function Page() {
  // All-white + smooth scroll + REVEAL ON SCROLL for containers
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = C.white;
    document.body.style.color = C.dark;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.transition = "opacity .6s ease, transform .6s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // HERO slideshow (fade only, NO parallax)
  const slides = useMemo(() => HERO_SLIDES, []);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  // Lightbox
  const lb = useLightbox();

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: C.gray }}>
        <Container className="flex items-center justify-between py-4">
          <a href="#home" className="font-serif text-xl font-medium tracking-wide" style={{ color: C.dark }}>
            Aphrodite Residences
          </a>
          <div className="hidden gap-8 md:flex">
            {["About", "Map", "Apartments", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-sm font-medium relative group"
                style={{ color: C.teal }}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: C.teal }}
                />
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* HERO — slideshow (no parallax) */}
      <Section id="home" className="pt-0">
        <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl shadow-xl">
          <div className="relative h-[520px] md:h-[640px]">
            {slides.map((src, i) => (
              <img
                key={src + i}
                src={`/images/${src}`}
                alt="Aphrodite Exterior"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: i === idx ? 1 : 0 }}
              />
            ))}
            {/* very light fades */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white/95" />
          </div>

          {/* Slide indicator dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot${i === idx ? " active" : ""}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>

          {/* Text block */}
          <div className="pointer-events-none absolute inset-0 flex">
            <Container className="relative z-10 flex h-full flex-col justify-end py-14 md:py-16">
              <div className="max-w-2xl pointer-events-auto">
                <p
                  className="mb-3 text-xs uppercase tracking-[0.22em] font-medium"
                  style={{ color: "rgba(255,255,255,.78)" }}
                >
                  Athens Riviera · Voula
                </p>
                <h1
                  className="font-serif text-5xl leading-[1.1] md:text-7xl"
                  style={{ color: "white", textShadow: "0 2px 16px rgba(0,0,0,.4)" }}
                >
                  A Unique Living<br />Experience
                </h1>
                <p
                  className="mt-5 max-w-xl text-base md:text-lg font-light"
                  style={{ color: "rgba(255,255,255,.88)", textShadow: "0 1px 6px rgba(0,0,0,.28)" }}
                >
                  Absolute luxury and elegance in one of Athens' most desirable locations.
                </p>
                <a
                  href="#apartments"
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.45)", color: "white" }}
                >
                  Explore Residences
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </Container>
          </div>
        </div>
      </Section>

      {/* MAP SECTION — after hero, before apartments, with overlays and light fade */}
     {/* MAP SECTION — after hero, before apartments */}
<Section id="map" className="pt-2">
  <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl shadow-xl">
    <div className="relative h-[520px] md:h-[620px]">
      <img
        src={`/images/${MAP_IMAGE ?? ""}`}
        alt="Map — Athens Riviera"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* very light fades */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white/95" />
    </div>

    {/* --- Overlay: Location at a Glance --- */}
    <div className="pointer-events-none absolute inset-0 flex">
      <Container className="relative z-10 flex h-full items-end justify-end py-7 md:py-9">
        <div className="pointer-events-auto max-w-sm rounded-3xl border border-white/20 bg-black/28 p-5 backdrop-blur-md md:p-6 shadow-2xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/65 mb-1">Location</p>
          <h3 className="font-serif text-2xl md:text-3xl text-white leading-snug">Location at a Glance</h3>
          <p className="mt-3 text-sm text-white/85 leading-relaxed">
            700 m to seafront promenade · 800 m to beaches. Restaurants, cafés &amp; shopping within a 10-min walk.
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { label: "Beach",    value: "800 m" },
              { label: "Seafront", value: "700 m" },
              { label: "Airport",  value: "~20 min" },
              { label: "Piraeus",  value: "~25 min" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/55">{label}</span>
                <span className="text-sm font-semibold text-white mt-0.5">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
    {/* --- end overlay --- */}
  </div>
</Section>


      {/* ABOUT (compact) */}
 {/* ABOUT */}
<Section id="about">
  <Container>
    <Card className="p-8 md:p-10">
      <span className="accent-line mb-5" />
      <h2 className="font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
        About the Development
      </h2>
      <p className="mt-5 text-[15px] leading-relaxed" style={{ color: C.teal }}>
        Conceived and delivered by{" "}
        <a
          href="https://www.tolikas.gr/about-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2"
          style={{ color: C.dark }}
        >
          Tolikas Development
        </a>
        , Aphrodite Residences represents a new benchmark in contemporary luxury living.
        Featuring refined multi-level residences, timeless architecture, and exceptional build quality,
        the development is located in the prestigious neighbourhood of{" "}
        <strong style={{ color: C.dark }}>Voula</strong> on the{" "}
        <strong style={{ color: C.dark }}>Athens Riviera</strong> — offering tranquility alongside
        effortless access to beaches, dining, shopping, and key destinations.
      </p>
    </Card>
  </Container>
</Section>

      {/* APARTMENTS */}
      <Section id="apartments">
        <Container>
          <span className="accent-line mb-4" />
          <h2 className="mb-10 font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
            Apartments
          </h2>

          <div className="space-y-8">
            {APARTMENTS.map((apt) => (
              <Card key={apt.key} className="p-0 overflow-hidden">
                {/* Header */}
                <div className="border-b px-6 pb-5 pt-7 md:px-8" style={{ borderColor: C.gray }}>
                  <span className="accent-line mb-3" />
                  <h3 className="font-serif text-2xl md:text-3xl" style={{ color: C.dark }}>
                    {apt.title}
                  </h3>
                </div>

                {/* Floors */}
<div className="px-6 py-6 md:px-8">
  {apt.floors.map((f, i) => {
    // If plans are hidden, use a single-column layout
    const wrapperClass = SHOW_PLANS
      ? "mb-6 grid gap-4 md:grid-cols-3"
      : "mb-6 grid gap-4";

    return (
      <div key={f.name + i} className={wrapperClass}>
        {SHOW_PLANS && (
          <div className="md:col-span-1">
            {f.planImage ? (
              <img
                src={`/images/${f.planImage}`}
                alt={`${f.name} plan`}
                className="aspect-[4/3] w-full cursor-zoom-in rounded-xl border bg-white object-contain p-4 shadow"
                style={{ borderColor: C.gray }}
                onClick={() => lb.open([f.planImage!], 0)}
              />
            ) : (
              <div
                className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border shadow"
                style={{ borderColor: C.gray, color: C.sage }}
              >
                Plan image
              </div>
            )}
          </div>
        )}

        <div className={SHOW_PLANS ? "md:col-span-2" : ""}>
          <h4 className="mb-2 font-semibold" style={{ color: C.teal }}>
            {f.name}
          </h4>
          <ul className="space-y-1.5 text-[14px]" style={{ color: C.teal }}>
            {f.info.map((x, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-[3px] h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: C.teal }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  })}

  {/* Full description */}
  <p className="mt-4 whitespace-pre-line text-[14px] leading-relaxed italic border-l-2 pl-4" style={{ color: C.sage, borderColor: C.gray }}>
    {apt.description}
  </p>

  {/* Stats */}
  <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
    {apt.stats.map((s, i) => (
      <Stat key={i} label={s.label} value={s.value} />
    ))}
  </div>
</div>


                {/* Photos / renders */}
                {apt.photos.length > 0 && (
                  <div className="border-t px-6 pb-8 pt-6 md:px-8" style={{ borderColor: C.gray }}>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {apt.photos.map((src, i) => (
                        <div
                          key={src + i}
                          className="group relative overflow-hidden rounded-2xl border cursor-zoom-in shadow-sm"
                          style={{ borderColor: C.gray }}
                          onClick={() => lb.open(apt.photos, i)}
                        >
                          <img
                            src={`/images/${src}`}
                            alt={`${apt.key} photo ${i + 1}`}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 rounded-full p-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* GALLERY */}
      {SHOW_GALLERY && (
      <Section id="gallery">
        <Container>
          <h2 className="mb-6 font-serif text-3xl" style={{ color: C.dark }}>
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {PHOTOS.map((src, i) => (
              <img
                key={src + i}
                src={`/images/${src}`}
                alt={`Gallery ${i + 1}`}
                className="aspect-[4/3] w-full cursor-zoom-in rounded-xl border object-cover shadow"
                style={{ borderColor: C.gray, background: C.white }}
                onClick={() => lb.open(PHOTOS, i)}
              />
            ))}
          </div>
        </Container>
      </Section>)}

      {/* CONTACT */}
<Section id="contact">
  <Container>
    <Card className="p-8 md:p-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: text + contact info */}
        <div>
          <span className="accent-line mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
            Get in Touch
          </h2>
          <p className="mt-3 text-[15px]" style={{ color: C.teal }}>
            Leave your details and we'll contact you as soon as possible.
          </p>

          <ul className="mt-6 space-y-2 text-sm" style={{ color: C.sage }}>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: C.teal }} />
              <a
                href="https://maps.google.com/?q=Afroditis%2010%20%26%20El.%20Venizelou%2043,%20Voula"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: C.teal }}
                title="Open in Google Maps"
              >
                Afroditis 10 &amp; El. Venizelou 43, Voula
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Waves className="h-4 w-4" style={{ color: C.sage }} /> Athens Riviera · Greece
            </li>
            <li className="flex items-center gap-2">
              <Plane className="h-4 w-4" style={{ color: C.teal }} /> Airport ~20 min ·{" "}
              <Ship className="h-4 w-4" style={{ color: C.sage }} /> Piraeus ~25 min
            </li>
          </ul>

          {/* Your existing form component */}
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        {/* Right: Google Maps widget (responsive iframe) */}
       {/* Right: Google Maps widget + contact info (under the map) */}
<div className="flex flex-col gap-4">
  <div
    className="overflow-hidden rounded-2xl border shadow"
    style={{ borderColor: C.gray, background: C.white }}
  >
    <div className="aspect-[16/9]">
    <iframe
  title="Aphrodite Residences Location"
  src="https://www.google.com/maps?q=Afroditis%2010%20%26%20El.%20Venizelou%2043,%20Voula&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>

    </div>
  </div>

  {/* Contact details under the map (plain text) */}
    {/* Contact details under the map */}
  <div
    className="rounded-3xl border p-5 shadow-sm"
    style={{ borderColor: C.gray, background: C.white }}
  >
    <h4
      className="font-serif text-xl text-center"
      style={{ color: C.dark }}
    >
      Tolikas Development
    </h4>
    <div className="mt-3 space-y-1.5 text-sm text-center" style={{ color: C.teal }}>
      <p>
        <span style={{ color: C.sage }}>Email</span>{" "}
        <a href="mailto:d.tolikas@tolikas.gr" className="font-medium underline-offset-2 hover:underline" style={{ color: C.dark }}>d.tolikas@tolikas.gr</a>
      </p>
      <p>
        <span style={{ color: C.sage }}>Tel</span>{" "}
        <a href="tel:+302111985345" className="font-medium" style={{ color: C.dark }}>+30 211 198 5345</a>
      </p>
    </div>
  </div>


  <p className="text-xs" style={{ color: C.sage }}>
    Click the address to open directions in Google Maps.
  </p>
</div>

      </div>
    </Card>
  </Container>
</Section>

      {/* FOOTER */}
      <footer
        className="border-t py-12"
        style={{ borderColor: C.gray, background: C.white }}
      >
        <Container className="flex flex-col items-center gap-3 text-center">
          <span className="font-serif text-lg" style={{ color: C.dark }}>Aphrodite Residences</span>
          <span className="text-xs uppercase tracking-[0.18em]" style={{ color: C.sage }}>Athens Riviera · Voula · Greece</span>
          <span className="text-xs" style={{ color: C.sage }}>© {new Date().getFullYear()} Tolikas Development · All rights reserved</span>
        </Container>
      </footer>

      {/* LIGHTBOX */}
      <Lightbox state={lb.state} onClose={lb.close} onNext={lb.next} onPrev={lb.prev} />
    </div>
  );
}
