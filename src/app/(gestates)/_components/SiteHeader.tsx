"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/aphrodite", label: "Aphrodite Residences" },
  { href: "/fleming", label: "Fleming Residences" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`hdr${solid || open ? " solid" : ""}`}>
      <div className="wrap">
        <Link className="brand" href="/">
          <span className="g">G</span>
          <span>
            GESTATES<small>REAL ESTATE</small>
          </span>
        </Link>
        <nav className={`nav${open ? " open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={l.href === pathname ? "on" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
