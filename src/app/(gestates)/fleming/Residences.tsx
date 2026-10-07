"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type Row = [label: string, area: string];
type Residence = {
  id: string;
  name: string;
  kind: string;
  tagline: string;
  plan: { src: string; alt: string };
  indoor: Row[];
  indoorTotal: string;
  outdoor: Row[];
  outdoorTotal: string;
  amenities: string[];
  images: { src: string; alt: string }[];
};

const IMG = "/fleming/img/";
const SMART = "Smart home automation on all levels";

const RESIDENCES: Residence[] = [
  {
    id: "a",
    name: "Residence A",
    kind: "Maisonette · Ground",
    tagline: "Maisonette with private pool & garden",
    plan: { src: "plan-a.jpg", alt: "Residence A — floor plans: Ground, Level 01, Level -01" },
    indoor: [["(-1) Basement", "95.04 m²"], ["Ground", "79.39 m²"], ["Level 01", "72.01 m²"]],
    indoorTotal: "246.44 m²",
    outdoor: [["(-1) Basement", "16.78 m²"], ["Ground", "480.18 m²"], ["Level 01", "13.29 m²"]],
    outdoorTotal: "510.25 m²",
    amenities: [
      "Private swimming pool and curated private garden",
      "2 parking spots",
      "Warehouse in basement, naturally lit via 2 spacious cour anglaise",
      SMART,
    ],
    images: [
      { src: "a-living.jpg", alt: "Residence A — living & dining area" },
      { src: "a-pool-view.jpg", alt: "Residence A — living room, pool view" },
      { src: "a-playroom.jpg", alt: "Residence A — playroom" },
    ],
  },
  {
    id: "b",
    name: "Residence B",
    kind: "Apartment · Level 02",
    tagline: "Full-floor apartment · 3 master bedrooms",
    plan: { src: "plan-b.jpg", alt: "Residence B — floor plan Level 02" },
    indoor: [["(-1) Basement", "29.54 m²"], ["Level 02", "171.68 m²"]],
    indoorTotal: "201.22 m²",
    outdoor: [["(-1) Basement", "2.00 m²"], ["Level 02", "67.65 m²"]],
    outdoorTotal: "69.65 m²",
    amenities: ["1 parking spot", "1 studio in basement", SMART],
    images: [
      { src: "b-living.jpg", alt: "Residence B — living & dining area" },
      { src: "b-lounge.jpg", alt: "Residence B — outdoor balcony lounge" },
      { src: "b-master.jpg", alt: "Residence B — master bedroom" },
    ],
  },
  {
    id: "c",
    name: "Residence C",
    kind: "Apartment · Level 03",
    tagline: "Full-floor apartment · 3 master bedrooms",
    plan: { src: "plan-c.jpg", alt: "Residence C — floor plan Level 03" },
    indoor: [["(-1) Basement", "29.54 m²"], ["Level 03", "171.68 m²"]],
    indoorTotal: "201.22 m²",
    outdoor: [["(-1) Basement", "2.90 m²"], ["Level 03", "67.65 m²"]],
    outdoorTotal: "70.55 m²",
    amenities: ["1 parking spot", "1 studio in basement", SMART],
    images: [
      { src: "c-living.jpg", alt: "Residence C — living & dining area" },
      { src: "c-master.jpg", alt: "Residence C — master bedroom" },
      { src: "c-ensuite.jpg", alt: "Residence C — bedroom en suite" },
    ],
  },
  {
    id: "d",
    name: "Residence D",
    kind: "Penthouse · Level 04 + Roof",
    tagline: "Penthouse with roof garden & private pool",
    plan: { src: "plan-d.jpg", alt: "Residence D — floor plans Level 04 and roof garden" },
    indoor: [["(-1) Basement", "31.68 m²"], ["Level 04", "202.12 m²"], ["Rooftop", "21.50 m²"]],
    indoorTotal: "255.30 m²",
    outdoor: [["(-1) Basement", "13.49 m²"], ["Level 04", "50.55 m²"], ["Rooftop", "179.13 m²"]],
    outdoorTotal: "243.17 m²",
    amenities: ["Rooftop swimming pool and roof garden", "1 parking spot", "1 studio in basement", SMART],
    images: [
      { src: "d-roof-pool.jpg", alt: "Residence D — roof garden & pool" },
      { src: "d-living.jpg", alt: "Residence D — living room, kitchen & dining" },
      { src: "d-roof-lounge.jpg", alt: "Residence D — roof garden outdoor lounge" },
    ],
  },
];

function Sheet({ title, rows, total }: { title: string; rows: Row[]; total: string }) {
  return (
    <div className="sheet">
      <h4>{title}</h4>
      <table>
        <tbody>
          {rows.map(([label, area]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{area}</td>
            </tr>
          ))}
          <tr className="tot">
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Residences() {
  const [active, setActive] = useState(RESIDENCES[0].id);

  return (
    <>
      <div className="tabs" role="tablist">
        {RESIDENCES.map((r) => (
          <button
            key={r.id}
            role="tab"
            id={`tab-${r.id}`}
            aria-selected={active === r.id}
            aria-controls={`res-${r.id}`}
            onClick={() => setActive(r.id)}
          >
            <b>{r.name}</b>
            {r.kind}
          </button>
        ))}
      </div>

      {RESIDENCES.map((r) => (
        <div
          key={r.id}
          className={`res${active === r.id ? " on" : ""}`}
          id={`res-${r.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${r.id}`}
        >
          <div className="res-grid">
            <div className="plan" data-lb={`plan-${r.id}`}>
              <img src={IMG + r.plan.src} alt={r.plan.alt} loading="lazy" />
            </div>
            <div>
              <div className="tagline">{r.tagline}</div>
              <h3 style={{ marginBottom: 22 }}>{r.name}</h3>
              <Sheet title="Indoor space" rows={r.indoor} total={r.indoorTotal} />
              <Sheet title="Outdoor space" rows={r.outdoor} total={r.outdoorTotal} />
              <div className="sheet">
                <h4>Amenities &amp; facilities</h4>
                <ul>
                  {r.amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="res-imgs">
            {r.images.map((im) => (
              <button key={im.src} data-lb={r.id}>
                <img src={IMG + im.src} alt={im.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
