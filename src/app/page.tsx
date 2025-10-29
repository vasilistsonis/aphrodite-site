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
    className={`reveal rounded-2xl border p-6 shadow-lg will-change-transform ${className}`}
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
  <div className="flex flex-col items-start gap-1">
    <span className="text-xs uppercase tracking-wider" style={{ color: C.teal }}>
      {label}
    </span>
    <span className="text-lg font-semibold" style={{ color: C.dark }}>
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
    background: "#FFFFFF",
    color: "#192524",
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
          <label className="text-sm" style={{ color: "#3C5759" }}>Full Name</label>
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-xl px-4 py-3 text-sm outline-none shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm" style={{ color: "#3C5759" }}>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="name@email.com"
            className="rounded-xl px-4 py-3 text-sm outline-none shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm" style={{ color: "#3C5759" }}>Phone</label>
          <input
            name="phone"
            placeholder="+30 …"
            className="rounded-xl px-4 py-3 text-sm outline-none shadow"
            style={inputStyle}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm" style={{ color: "#3C5759" }}>Message</label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Preferred dates, apartment of interest (A3, C1, C2)…"
            className="rounded-xl px-4 py-3 text-sm outline-none shadow"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow"
          style={{ border: "1px solid #192524", background: "#3C5759", color: "white" }}
        >
          {status === "sending" ? "Sending…" : "Submit Request"}
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
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur" style={{ borderColor: C.gray }}>
        <Container className="flex items-center justify-between py-3">
          <a href="#home" className="font-semibold tracking-[0.18em]" style={{ color: C.teal }}>
            APHRODITE RESIDENCES
          </a>
          <div className="hidden gap-6 md:flex">
            {["About", "Map", "Apartments", "Gallery", "Contact"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="text-sm" style={{ color: C.sage }}>
                {label}
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

          {/* Text block */}
          <div className="pointer-events-none absolute inset-0 flex">
            <Container className="relative z-10 flex h-full flex-col justify-center py-10 md:py-12">
              <div className="max-w-2xl pointer-events-auto">
                <h1
                  className="font-serif text-4xl leading-tight md:text-6xl"
                  style={{ color: "white", textShadow: "0 2px 12px rgba(0,0,0,.35)" }}
                >
                  A Unique Living Experience
                </h1>
                <p
                  className="mt-4 max-w-prose text-base md:text-lg"
                  style={{ color: "rgba(255,255,255,.94)", textShadow: "0 1px 6px rgba(0,0,0,.3)" }}
                >
                  Aphrodite Residences represent absolute luxury and elegance in one of Athens’ most desirable locations.
                </p>
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

    {/* --- Overlay: ONLY 'Location at a Glance' on the right --- */}
    <div className="pointer-events-none absolute inset-0 flex">
      <Container className="relative z-10 flex h-full items-end justify-end py-6 md:py-8">
        <div className="pointer-events-auto max-w-xl rounded-2xl border border-white/25 bg-white/12 p-5 backdrop-blur-md md:p-6 shadow-lg">
          <h3 className="font-serif text-2xl md:text-3xl text-white">Location at a Glance</h3>
          <p className="mt-3 text-sm md:text-base text-white/95">
            700m to seafront promenade · 800m to beaches. Within a 10-minute walk:
            restaurants, cafés, bars, shopping. Athens International Airport ~20 minutes;
            Port of Piraeus ~25 minutes.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-white/90 md:grid-cols-4">
            <div><div className="text-xs opacity-80">BEACH</div><div className="font-semibold">800 m</div></div>
            <div><div className="text-xs opacity-80">SEAFRONT</div><div className="font-semibold">700 m</div></div>
            <div><div className="text-xs opacity-80">AIRPORT</div><div className="font-semibold">~20 min</div></div>
            <div><div className="text-xs opacity-80">PIRAEUS</div><div className="font-semibold">~25 min</div></div>
          </div>
        </div>
      </Container>
    </div>
    {/* --- end overlay --- */}
  </div>
</Section>


      {/* ABOUT (compact) */}
 {/* ABOUT (merged into ONE card) */}
<Section id="about">
  <Container>
    <Card>
      <h2 className="font-serif text-3xl" style={{ color: C.dark }}>
        About the Development
      </h2>
      <p className="mt-4" style={{ color: C.teal }}>
        Conceived and delivered by <strong>Tolikas Development</strong>, Aphrodite Residences represents a new benchmark 
        in contemporary luxury living. Featuring refined multi-level residences, timeless architecture,and exceptional build quality,
        the development is located in the prestigious neighborhood of <strong>Voula</strong> on the <strong>Athens Riviera </strong> — offering tranquility alongside effortless access to beaches, dining, shopping, and key destinations.
      </p>
    </Card>
  </Container>
</Section>

      {/* APARTMENTS */}
      <Section id="apartments">
        <Container>
          <h2 className="mb-8 font-serif text-3xl md:text-4xl" style={{ color: C.dark }}>
            Apartments
          </h2>

          <div className="space-y-8">
            {APARTMENTS.map((apt) => (
              <Card key={apt.key} className="p-0 overflow-hidden">
                {/* Header */}
                <div className="border-b px-6 pb-4 pt-7 md:px-8 shadow-sm" style={{ borderColor: C.gray }}>
                  <h3 className="font-serif text-2xl" style={{ color: C.dark }}>
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
                className="h-64 w-full cursor-zoom-in rounded-xl border bg-white object-contain p-4 shadow"
                style={{ borderColor: C.gray }}
                onClick={() => lb.open([f.planImage!], 0)}
              />
            ) : (
              <div
                className="flex h-64 w-full items-center justify-center rounded-xl border shadow"
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
          <ul className="space-y-2" style={{ color: C.teal }}>
            {f.info.map((x, j) => (
              <li key={j} className="flex gap-3">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: C.dark }}
                />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  })}

  {/* Full description */}
  <p className="mt-2 whitespace-pre-line" style={{ color: C.teal }}>
    {apt.description}
  </p>

  {/* Stats */}
  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
    {apt.stats.map((s, i) => (
      <Stat key={i} label={s.label} value={s.value} />
    ))}
  </div>
</div>


                {/* Photos / renders */}
                {apt.photos.length > 0 && (
                  <div className="border-t px-6 pb-8 pt-6 md:px-8" style={{ borderColor: C.gray, background: C.white }}>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {apt.photos.map((src, i) => (
                        <img
                          key={src + i}
                          src={`/images/${src}`}
                          alt={`${apt.key} photo ${i + 1}`}
                          className="h-64 w-full cursor-zoom-in rounded-xl border object-cover shadow"
                          style={{ borderColor: C.gray }}
                          onClick={() => lb.open(apt.photos, i)}
                        />
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
                className="h-64 w-full cursor-zoom-in rounded-xl border object-cover shadow"
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
    <Card className="p-8">
      <div className="grid items-start gap-8 md:grid-cols-2">
        {/* Left: text + contact info */}
        <div>
          <h2 className="font-serif text-3xl" style={{ color: C.dark }}>
            Contact Form
          </h2>
          <p className="mt-3" style={{ color: C.teal }}>
            Leave your details and we’ll contact you to as soon as possible for further information.
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
  <div
  className="rounded-2xl border p-4 shadow"
  style={{ borderColor: C.gray, background: C.white }}
>
  <h1
    className="text-2xl font-serif text-center"
    style={{ color: C.teal }}
  >
    Tolikas Development
  </h1>
  <div className="mt-3 space-y-2 text-sm text-center" style={{ color: C.teal }}>
    <p>
      <strong>Email:</strong> d.tolikas@tolikas.gr
    </p>
    <p>
      <strong>Tel:</strong> +302111985345
    </p>
  </div>
</div>


  <p className="text-xs" style={{ color: C.sage }}>
    Tip: Click the address to open directions in Google Maps.
  </p>
</div>

      </div>
    </Card>
  </Container>
</Section>

      {/* FOOTER */}
      <footer
        className="border-t py-10 text-center text-sm"
        style={{ borderColor: C.gray, background: C.white, color: C.teal }}
      >
        <Container>© {new Date().getFullYear()} Aphrodite Residences · Athens Riviera · Voula</Container>
      </footer>

      {/* LIGHTBOX */}
      <Lightbox state={lb.state} onClose={lb.close} onNext={lb.next} onPrev={lb.prev} />
    </div>
  );
}
