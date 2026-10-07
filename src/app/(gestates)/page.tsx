/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./_components/ContactForm";
import Footer from "./_components/Footer";

const TITLE = "Gestates — Luxury Residences on the Athens Riviera | Voula · Glyfada";
const DESCRIPTION =
  "Gestates develops and manages boutique luxury residences on the Athenian Riviera: Aphrodite Residences in Voula and the new Fleming Residences in Glyfada.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Gestates",
    "Athens Riviera",
    "luxury apartments",
    "Voula",
    "Glyfada",
    "Aphrodite Residences",
    "Fleming Residences",
    "Βούλα",
    "Γλυφάδα",
    "διαμερίσματα",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gestates — Residences on the Athens Riviera",
    description: "Aphrodite Residences in Voula and Fleming Residences in Glyfada.",
    url: "/",
    siteName: "Gestates",
    images: [{ url: "/fleming/img/ext-night.jpg" }],
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <img className="bg" src="/fleming/img/ext-night.jpg" alt="Gestates residential development at dusk" />
        <div className="wrap">
          <div className="eyebrow">Gestates · Athens Riviera</div>
          <h1>
            Residences on the
            <br />
            <b>Athenian Riviera</b>
          </h1>
          <p>
            Boutique residential buildings in Voula and Glyfada — designed by leading architects,
            built to a standard that lasts.
          </p>
          <a className="btn" href="#projects">
            Our developments
          </a>
        </div>
      </section>

      <section id="about">
        <div className="wrap split top reveal">
          <div>
            <div className="eyebrow">About Gestates</div>
            <h2 style={{ marginTop: 16 }}>
              Fewer homes, <b>better made</b>
            </h2>
          </div>
          <div>
            <p className="lead">
              Gestates manages and delivers small collections of private residences in the most
              sought-after neighbourhoods of the southern Athens coast.
            </p>
            <p style={{ marginTop: 20 }}>
              Working with Tolikas Development and leading architecture studios, each building is
              conceived around privacy, natural light and outdoor living — generous terraces,
              private gardens and pools, and carefully chosen materials throughout.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Developments</div>
            <h2 style={{ marginTop: 14 }}>
              Our <b>projects</b>
            </h2>
          </div>
          <div className="projects">
            <Link className="pcard reveal" href="/aphrodite">
              <img src="/images/page01_img1.jpeg" alt="Aphrodite Residences, Voula" loading="lazy" />
              <div className="in">
                <div className="eyebrow">Voula · Athens Riviera</div>
                <h3>Aphrodite Residences</h3>
                <p>
                  Multi-level residences designed by Omnibus — duplexes with private rooftop pools,
                  700 m from the seafront.
                </p>
                <span className="more">Discover Aphrodite</span>
              </div>
            </Link>
            <Link className="pcard reveal" href="/fleming">
              <span className="badge">New</span>
              <img src="/fleming/img/ext-corner.jpg" alt="Fleming Residences, Glyfada" loading="lazy" />
              <div className="in">
                <div className="eyebrow">Glyfada · Athens Riviera</div>
                <h3>Fleming Residences</h3>
                <p>
                  Eight private residences by Petropoulou Architects — maisonettes with gardens and
                  pools, penthouses with roof gardens.
                </p>
                <span className="more">Discover Fleming</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap split top">
          <div>
            <div className="eyebrow">Contact</div>
            <h2 style={{ margin: "16px 0 20px" }}>
              Let’s talk about <b>your next home</b>
            </h2>
            <p>For availability, pricing and private viewings of any of our developments.</p>
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
          <ContactForm projects={["General enquiry", "Aphrodite Residences", "Fleming Residences"]} />
        </div>
      </section>

      <Footer />
    </>
  );
}
