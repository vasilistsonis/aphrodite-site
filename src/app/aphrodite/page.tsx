"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  MapPin,
  Waves,
  Plane,
  Ship,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Menu,
  Mail,
  Phone,
} from "lucide-react";
import { PHOTOS, ALL_IMAGES } from "../imageList";

/* =========================
   PALETTE
========================= */
const C = {
  dark: "#192524",
  teal: "#3C5759",
  sage: "#959D90",
  gray: "#D0D5CE",
  white: "#FFFFFF",
  cream: "#FBFAF7",
  gold: "#A9895B",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// --- toggles ---
const SHOW_PLANS = false;   // hide floor plan thumbnails
const SHOW_GALLERY = false; // hide the gallery section

/* =========================
   UI Primitives
========================= */
type SectionProps = { id: string; className?: string; children: React.ReactNode };
const Section: React.FC<SectionProps> = ({ id, className = "", children }) => (
  <section id={id} className={`py-20 md:py-28 [scroll-margin-top:88px] ${className}`}>
    {children}
  </section>
);

type ContainerProps = { className?: string; children: React.ReactNode };
const Container: React.FC<ContainerProps> = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>
);

/** Fade + rise on scroll, respects prefers-reduced-motion via MotionConfig */
type RevealProps = { className?: string; children: React.ReactNode; delay?: number; y?: number };
const Reveal: React.FC<RevealProps> = ({ className = "", children, delay = 0, y = 22 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

type CardProps = { className?: string; children: React.ReactNode };
const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div
    className={`rounded-[28px] border p-6 shadow-[0_30px_80px_-45px_rgba(25,37,36,0.4)] md:p-8 ${className}`}
    style={{ borderColor: "rgba(208,213,206,0.55)", background: C.white }}
  >
    {children}
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean; className?: string }> = ({
  children,
  light = false,
  className = "",
}) => (
  <span
    className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.26em] ${className}`}
    style={{ color: light ? "rgba(255,255,255,0.9)" : C.gold }}
  >
    <span className="h-px w-7" style={{ background: light ? "rgba(255,255,255,0.55)" : C.gold }} />
    {children}
  </span>
);

type StatProps = { label: string; value: string };
const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div className="border-l pl-4" style={{ borderColor: C.gray }}>
    <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: C.sage }}>
      {label}
    </div>
    <div className="mt-1 font-serif text-lg" style={{ color: C.dark }}>
      {value}
    </div>
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
   Hero slideshow
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

const APARTMENT_PHOTO_ALT: Record<Apt["key"], string> = {
  A3: "Apartment A3 interior render at Aphrodite Residences in Voula",
  C1: "Duplex Apartment C1 luxury residence render with rooftop pool in Voula",
  C2: "Duplex Apartment C2 luxury residence render at Aphrodite Residences",
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
  photos: [pick("page24img1"), pick("imagepoolc1")].filter(Boolean) as string[],
};

/* --- C2 --- */
const C2_DESC = `Three Levels of Spacious, Exclusive Living

3rd Floor: three master bedrooms with generous closets and natural light; auxiliary spaces; two independent entrances; private internal lift.
Mezzanine: expansive living & entertaining hub; open-plan kitchen with premium appliances and pantry; guest WC.
Rooftop (Exclusive Use): planted area of 124.80 m² with a 12.95 m² pool and WC. Private balconies total 57.05 m². Includes 2 indoor parking spaces and a 59.00 m² maid’s room.`;

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
      planImage: pick("page29img1"),
      info: ["Living & dining", "Open-plan kitchen + pantry", "Guest WC"],
    },
    {
      name: "C2 (5) — Rooftop (Exclusive Use)",
      planImage: pick("page30img1"),
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

const ABOUT_FACTS: { label: string; value: string }[] = [
  { label: "Architect", value: "Omnibus" },
  { label: "Developer", value: "Tolikas Development" },
  { label: "Location", value: "Voula, Athens Riviera" },
  { label: "Residences", value: "3 multi-level homes" },
  { label: "Sizes", value: "168.50 – 269.00 m²" },
];

const LOCATION_STATS: { label: string; value: string }[] = [
  { label: "Beach", value: "800 m" },
  { label: "Seafront", value: "700 m" },
  { label: "Airport", value: "~20 min" },
  { label: "Piraeus", value: "~25 min" },
  { label: "Voula Park", value: "500 m" },
  { label: "Stadium", value: "550 m" },
  { label: "Glyfada", value: "2.5 km" },
  { label: "Elliniko", value: "7 km" },
];

const NAV_LINKS = [
  { label: "Gestates", href: "/" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#map" },
  { label: "Residences", href: "#apartments" },
  { label: "Fleming Residences", href: "/fleming" },
  { label: "Contact", href: "#contact" },
];

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-black/50 p-2.5 text-white shadow transition-colors hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-5 w-5" />
      </button>
      {state.items.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white tabular-nums">
          {state.index + 1} / {state.items.length}
        </div>
      )}
      {state.items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white shadow transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white shadow transition-colors hover:bg-black/70"
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
        alt="Large preview of Aphrodite Residences apartment image"
        className="max-h-[85vh] max-w-[92vw] rounded-xl border bg-white object-contain shadow-2xl"
        style={{ borderColor: C.gray }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

/* =========================
   Contact form
========================= */
function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = React.useState<string>("");
  const [showOK, setShowOK] = React.useState(false);
  const tsRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
  }, []);

  type ContactPayload = {
    name: string;
    email: string;
    phone?: string;
    message: string;
    company?: string;
    ts?: string;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

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

      form.reset();
      if (tsRef.current) tsRef.current.value = String(Date.now());
      setStatus("ok");
      setShowOK(true);
      window.setTimeout(() => setShowOK(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setError(msg);
    }
  }

  const inputStyle: React.CSSProperties = {
    border: "1px solid #D0D5CE",
    background: "#FFFFFF",
    color: "#192524",
  };
  const labelStyle: React.CSSProperties = { color: C.sage };

  return (
    <>
      {showOK && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="w-[92%] max-w-md rounded-[24px] bg-white p-7 shadow-2xl"
          >
            <h3 className="font-serif text-2xl" style={{ color: C.dark }}>
              Message sent
            </h3>
            <p className="mt-2 text-sm" style={{ color: C.teal }}>
              Thank you — we’ll get back to you shortly.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowOK(false)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5"
                style={{ background: C.dark }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-5">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
          aria-hidden="true"
        />
        <input type="hidden" name="ts" ref={tsRef} />

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.14em]" style={labelStyle}>
            Full Name
          </label>
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-2xl px-4 py-3.5 text-sm outline-none shadow-sm transition-shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.14em]" style={labelStyle}>
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="name@email.com"
            className="rounded-2xl px-4 py-3.5 text-sm outline-none shadow-sm transition-shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.14em]" style={labelStyle}>
            Phone
          </label>
          <input
            name="phone"
            placeholder="+30 …"
            className="rounded-2xl px-4 py-3.5 text-sm outline-none shadow-sm transition-shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.14em]" style={labelStyle}>
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Preferred dates, apartment of interest (A3, C1, C2)…"
            className="rounded-2xl px-4 py-3.5 text-sm outline-none shadow-sm transition-shadow"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0"
          style={{ background: C.dark }}
        >
          {status === "sending" ? "Sending…" : "Submit Request"}
          {status !== "sending" && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeApt, setActiveApt] = useState<Apt["key"]>(APARTMENTS[0].key);

  useEffect(() => {
    document.body.style.backgroundColor = C.cream;
    document.body.style.color = C.dark;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // HERO slideshow
  const slides = useMemo(() => HERO_SLIDES, []);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const lb = useLightbox();

  const currentApt = APARTMENTS.find((a) => a.key === activeApt) ?? APARTMENTS[0];
  const [aptLead, ...aptRestParts] = currentApt.description.split("\n\n");
  const aptRest = aptRestParts.join("\n\n");
  const [aptName, aptSize] = currentApt.title.split(" — ");

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* NAV */}
        <nav
          className={`sticky top-0 z-50 border-b transition-shadow ${scrolled ? "shadow-[0_2px_20px_-8px_rgba(25,37,36,0.15)]" : ""}`}
          style={{ borderColor: C.gray, background: "rgba(251,250,247,0.92)", backdropFilter: "blur(10px)" }}
        >
          <Container className="flex items-center justify-between py-3.5">
            <a href="#home" className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-base italic"
                style={{ borderColor: C.teal, color: C.teal }}
              >
                A
              </span>
              <span className="font-semibold tracking-[0.18em] text-sm" style={{ color: C.teal }}>
                APHRODITE RESIDENCES
              </span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group relative text-sm"
                  style={{ color: C.teal }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: C.gold }}
                  />
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                style={{ background: C.dark }}
              >
                Enquire
              </a>
            </div>

            <button
              className="rounded-lg p-2 transition-opacity hover:opacity-70 md:hidden"
              style={{ color: C.teal }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </Container>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="overflow-hidden border-t md:hidden"
                style={{ borderColor: C.gray, background: "rgba(251,250,247,0.98)" }}
              >
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block px-5 py-3 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: C.teal }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block px-5 py-3 text-sm font-semibold"
                  style={{ color: C.gold }}
                  onClick={() => setMenuOpen(false)}
                >
                  Enquire →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* HERO */}
        <Section id="home" className="pt-0">
          <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl shadow-xl">
            <div className="relative h-[560px] md:h-[680px]">
              {slides.map((src, i) => (
                <img
                  key={src + i}
                  src={`/images/${src}`}
                  alt={
                    i === 0
                      ? "Aphrodite Residences luxury apartment building exterior in Voula"
                      : `Aphrodite Residences luxury apartments image ${i + 1}`
                  }
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
                  data-scroll-image="hero"
                  style={{ opacity: i === idx ? 1 : 0 }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/50" />
            </div>

            {slides.length > 1 && (
              <>
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4">
                  <button
                    className="pointer-events-auto rounded-full bg-white/15 p-2.5 shadow transition-colors hover:bg-white/30"
                    onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    className="pointer-events-auto rounded-full bg-white/15 p-2.5 shadow transition-colors hover:bg-white/30"
                    onClick={() => setIdx((i) => (i + 1) % slides.length)}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className="pointer-events-auto h-1.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i === idx ? "white" : "rgba(255,255,255,0.4)",
                        width: i === idx ? "24px" : "6px",
                      }}
                      onClick={() => setIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <motion.a
              href="#about"
              aria-label="Scroll to explore"
              className="pointer-events-auto absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-white/85"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.a>

            <div className="pointer-events-none absolute inset-0 flex">
              <Container className="relative z-10 flex h-full flex-col justify-center py-10 md:py-12">
                <motion.div
                  className="max-w-2xl pointer-events-auto"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                    Athens Riviera · Voula
                  </span>
                  <h1
                    className="mt-5 font-serif text-4xl leading-[1.08] md:text-7xl"
                    style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,.35)" }}
                  >
                    Aphrodite Residences
                    <br />
                    <span className="italic" style={{ color: "rgba(255,255,255,0.9)" }}>
                      in Voula
                    </span>
                  </h1>
                  <p
                    className="mt-5 max-w-prose text-base md:text-lg"
                    style={{ color: "rgba(255,255,255,.92)", textShadow: "0 1px 6px rgba(0,0,0,.3)" }}
                  >
                    Aphrodite Residences represent absolute luxury and elegance in one of Athens’ most desirable locations.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#apartments"
                      className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ background: "white", color: C.dark }}
                    >
                      View Residences
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}
                    >
                      Contact Us
                    </a>
                  </div>
                </motion.div>
              </Container>
            </div>
          </div>
        </Section>

        {/* MAP / LOCATION */}
        <Section id="map" className="pt-0">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-3xl shadow-xl">
              <div className="relative h-[560px] md:h-[640px]">
                <img
                  src={`/images/${MAP_IMAGE ?? ""}`}
                  alt="Map showing Aphrodite Residences in Voula on the Athens Riviera"
                  className="absolute inset-0 h-full w-full object-cover"
                  data-scroll-image="map"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-end">
                <Container className="relative z-10 w-full py-8 md:py-10">
                  <div className="pointer-events-auto max-w-2xl rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8 shadow-lg">
                    <Eyebrow light>The Neighborhood</Eyebrow>
                    <h3 className="mt-3 font-serif text-2xl md:text-3xl text-white">Location at a Glance</h3>
                    <p className="mt-3 text-sm md:text-base text-white/90">
                      700m to seafront promenade · 800m to beaches. Within a 10-minute walk:
                      restaurants, cafés, bars, shopping. Athens International Airport ~20 minutes;
                      Port of Piraeus ~25 minutes.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                      {LOCATION_STATS.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-center"
                        >
                          <div className="text-[10px] uppercase tracking-[0.16em] text-white/70">{s.label}</div>
                          <div className="mt-0.5 font-serif text-base text-white">{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <Container>
            <div className="grid gap-8 md:grid-cols-5 md:gap-12">
              <Reveal className="md:col-span-3">
                <Eyebrow>About the Development</Eyebrow>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
                  Contemporary luxury on the Athens Riviera
                </h2>
                <p className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: C.teal }}>
                  Designed by the renowned architectural firm <strong>Omnibus</strong> and constructed by{" "}
                  <a
                    href="https://www.tolikas.gr/about-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    <strong>Tolikas Development</strong>
                  </a>
                  , Aphrodite Residences represents a new benchmark in contemporary luxury living.
                  Featuring refined multi-level residences, timeless architecture, and exceptional build
                  quality, the development is located in the prestigious neighborhood of{" "}
                  <strong>Voula</strong> on the <strong>Athens Riviera</strong> — offering tranquility
                  alongside effortless access to beaches, dining, shopping, and key destinations.
                </p>
              </Reveal>

              <Reveal className="md:col-span-2" delay={0.1}>
                <Card className="p-7 md:p-8">
                  <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: C.sage }}>
                    Quick Facts
                  </div>
                  <dl className="mt-3 divide-y" style={{ borderColor: "transparent" }}>
                    {ABOUT_FACTS.map((f) => (
                      <div
                        key={f.label}
                        className="flex items-center justify-between gap-4 border-b py-3.5 last:border-b-0"
                        style={{ borderColor: C.gray }}
                      >
                        <dt className="text-sm" style={{ color: C.sage }}>
                          {f.label}
                        </dt>
                        <dd className="text-right text-sm font-semibold" style={{ color: C.dark }}>
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* APARTMENTS */}
        <Section id="apartments">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>Residences</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
                Three Signature Homes
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: C.teal }}>
                Each residence spans multiple levels with private outdoor space — from balconies to a
                rooftop pool — and considered, light-filled layouts.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.1}>
              {APARTMENTS.map((apt) => {
                const active = activeApt === apt.key;
                return (
                  <button
                    key={apt.key}
                    onClick={() => setActiveApt(apt.key)}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                    style={
                      active
                        ? { background: C.dark, color: "#fff" }
                        : { background: "transparent", color: C.teal, border: `1px solid ${C.gray}` }
                    }
                  >
                    {apt.key} <span className="font-normal opacity-70">· {apt.stats[0].value}</span>
                  </button>
                );
              })}
            </Reveal>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentApt.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div
                    className="overflow-hidden rounded-[28px] border shadow-[0_30px_80px_-45px_rgba(25,37,36,0.4)]"
                    style={{ borderColor: "rgba(208,213,206,0.55)", background: C.white }}
                  >
                    <div className="border-b px-6 py-8 md:px-10" style={{ borderColor: C.gray }}>
                      <Eyebrow>{currentApt.key === "A3" ? "Apartment" : "Duplex Apartment"}</Eyebrow>
                      <h3 className="mt-3 flex flex-wrap items-baseline gap-3 font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
                        {aptName}
                        <span className="text-lg font-sans font-normal" style={{ color: C.sage }}>
                          {aptSize}
                        </span>
                      </h3>
                    </div>

                    <div className="grid gap-10 px-6 py-8 md:grid-cols-5 md:px-10 md:py-10">
                      <div className="md:col-span-2">
                        <p className="font-serif text-xl italic leading-snug" style={{ color: C.teal }}>
                          {aptLead}
                        </p>
                        <p
                          className="mt-4 whitespace-pre-line text-sm leading-relaxed"
                          style={{ color: C.teal }}
                        >
                          {aptRest}
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-5">
                          {currentApt.stats.map((s, i) => (
                            <Stat key={i} label={s.label} value={s.value} />
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="space-y-6">
                          {currentApt.floors.map((f, i) => (
                            <div key={f.name + i} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <span
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-sm"
                                  style={{ background: C.dark, color: "#fff" }}
                                >
                                  {i + 1}
                                </span>
                                {i < currentApt.floors.length - 1 && (
                                  <span className="mt-1 w-px flex-1" style={{ background: C.gray }} />
                                )}
                              </div>
                              <div className="pb-2">
                                <h4 className="font-semibold" style={{ color: C.dark }}>
                                  {f.name}
                                </h4>
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  {f.info.map((x, j) => (
                                    <span
                                      key={j}
                                      className="rounded-full px-3 py-1 text-xs"
                                      style={{ background: C.cream, color: C.teal, border: `1px solid ${C.gray}` }}
                                    >
                                      {x}
                                    </span>
                                  ))}
                                </div>
                                {SHOW_PLANS && f.planImage && (
                                  <img
                                    src={`/images/${f.planImage}`}
                                    alt={`${f.name} plan`}
                                    className="media-zoom mt-4 aspect-[4/3] w-full max-w-sm cursor-zoom-in rounded-xl border bg-white object-contain p-3 shadow"
                                    style={{ borderColor: C.gray }}
                                    onClick={() => lb.open([f.planImage!], 0)}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {currentApt.photos.length > 0 && (
                      <div className="border-t px-6 pb-10 pt-8 md:px-10" style={{ borderColor: C.gray }}>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                          {currentApt.photos.map((src, i) => (
                            <img
                              key={src + i}
                              src={`/images/${src}`}
                              alt={`${APARTMENT_PHOTO_ALT[currentApt.key]} ${i + 1}`}
                              className="media-zoom aspect-[4/3] w-full cursor-zoom-in rounded-xl border object-cover shadow"
                              style={{ borderColor: C.gray }}
                              onClick={() => lb.open(currentApt.photos, i)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </Section>

        {/* GALLERY */}
        {SHOW_GALLERY && (
          <Section id="gallery">
            <Container>
              <Reveal>
                <Eyebrow>Gallery</Eyebrow>
                <h2 className="mt-3 mb-8 font-serif text-3xl" style={{ color: C.dark }}>
                  Gallery
                </h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {PHOTOS.map((src, i) => (
                  <img
                    key={src + i}
                    src={`/images/${src}`}
                    alt={`Gallery ${i + 1}`}
                    className="media-zoom aspect-[4/3] w-full cursor-zoom-in rounded-xl border object-cover shadow"
                    style={{ borderColor: C.gray, background: C.white }}
                    onClick={() => lb.open(PHOTOS, i)}
                  />
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* CONTACT */}
        <Section id="contact">
          <Container>
            <Reveal>
              <Card className="p-6 md:p-8">
                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <Eyebrow>Get in Touch</Eyebrow>
                    <h2 className="mt-3 font-serif text-3xl" style={{ color: C.dark }}>
                      Contact Us
                    </h2>
                    <p className="mt-3" style={{ color: C.teal }}>
                      Leave your details and we’ll get back to you as soon as possible.
                    </p>

                    <ul className="mt-6 space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: C.cream, border: `1px solid ${C.gray}` }}
                        >
                          <MapPin className="h-4 w-4" style={{ color: C.teal }} />
                        </span>
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
                      <li className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: C.cream, border: `1px solid ${C.gray}` }}
                        >
                          <Waves className="h-4 w-4" style={{ color: C.teal }} />
                        </span>
                        <span style={{ color: C.teal }}>Athens Riviera · Greece</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: C.cream, border: `1px solid ${C.gray}` }}
                        >
                          <Plane className="h-4 w-4" style={{ color: C.teal }} />
                        </span>
                        <span style={{ color: C.teal }}>Airport ~20 min</span>
                        <span
                          className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: C.cream, border: `1px solid ${C.gray}` }}
                        >
                          <Ship className="h-4 w-4" style={{ color: C.teal }} />
                        </span>
                        <span style={{ color: C.teal }}>Piraeus ~25 min</span>
                      </li>
                    </ul>

                    <div className="mt-6">
                      <ContactForm />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div
                      className="overflow-hidden rounded-[24px] border shadow"
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

                    <div
                      className="rounded-[24px] border p-6 shadow"
                      style={{ borderColor: C.gray, background: C.white }}
                    >
                      <h3 className="text-center font-serif text-2xl" style={{ color: C.teal }}>
                        Tolikas Development
                      </h3>
                      <div className="mt-4 space-y-3 text-sm">
                        <p className="flex items-center justify-center gap-2">
                          <Mail className="h-4 w-4" style={{ color: C.sage }} />
                          <a
                            href="mailto:d.tolikas@tolikas.gr"
                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                            style={{ color: C.teal }}
                          >
                            d.tolikas@tolikas.gr
                          </a>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <Phone className="h-4 w-4" style={{ color: C.sage }} />
                          <a
                            href="tel:+302111985345"
                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                            style={{ color: C.teal }}
                          >
                            +30 211 198 5345
                          </a>
                        </p>
                      </div>
                    </div>

                    <p className="text-center text-xs" style={{ color: C.sage }}>
                      Tip: Click the address to open directions in Google Maps.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          </Container>
        </Section>

        {/* FOOTER */}
        <footer className="py-16" style={{ background: C.dark, color: "rgba(255,255,255,0.65)" }}>
          <Container>
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
              <div>
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 font-serif text-base italic text-white">
                    A
                  </span>
                  <span className="text-sm font-semibold tracking-[0.18em] text-white">
                    APHRODITE RESIDENCES
                  </span>
                </div>
                <p className="mt-3 max-w-xs text-sm">Athens Riviera · Voula, Greece</p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-end">
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/45 md:text-left">
              © {new Date().getFullYear()} Aphrodite Residences · Developed by Tolikas Development
            </div>
          </Container>
        </footer>

        <Lightbox state={lb.state} onClose={lb.close} onNext={lb.next} onPrev={lb.prev} />
      </div>
    </MotionConfig>
  );
}
