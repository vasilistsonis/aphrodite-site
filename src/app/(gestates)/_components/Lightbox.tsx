"use client";
import { useCallback, useEffect, useState } from "react";

type Item = { src: string; alt: string };

/** Click any `[data-lb]` element to open it; elements sharing a `data-lb` value form a gallery. */
export default function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const open = items.length > 0;

  const close = useCallback(() => setItems([]), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-lb]");
      if (!el) return;
      const group = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-lb="${el.dataset.lb}"]`)
      );
      setItems(
        group.map((g) => {
          const im = g.querySelector("img");
          return { src: g.dataset.full || im?.currentSrc || im?.src || "", alt: im?.alt || "" };
        })
      );
      setIndex(group.indexOf(el));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const cur = items[index];
  return (
    <div
      className={`lightbox${open ? " open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <button className="lb-x" aria-label="Close" onClick={close}>
        &times;
      </button>
      <button className="lb-p" aria-label="Previous" onClick={() => step(-1)}>
        &#8249;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {cur && <img src={cur.src} alt={cur.alt} />}
      <button className="lb-n" aria-label="Next" onClick={() => step(1)}>
        &#8250;
      </button>
      <div className="lb-cap">{cur?.alt}</div>
    </div>
  );
}
