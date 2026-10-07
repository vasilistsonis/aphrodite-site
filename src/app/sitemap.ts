import type { MetadataRoute } from "next";

const SITE_URL = "https://www.gestates.gr";
const LAST_MODIFIED = new Date("2026-04-30");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/fleming/img/ext-night.jpg`],
    },
    {
      url: `${SITE_URL}/fleming`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${SITE_URL}/fleming/img/hero-front.jpg`, `${SITE_URL}/fleming/img/ext-corner.jpg`],
    },
    {
      url: `${SITE_URL}/aphrodite`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/images/page01_img1.jpeg`,
        `${SITE_URL}/images/page17_img1.png`,
        `${SITE_URL}/images/imagepoolc1.png`,
      ],
    },
  ];
}
