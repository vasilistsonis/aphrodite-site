import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aphrodite Residences — Luxury Apartments, Athens Riviera, Voula";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #192524 0%, #3C5759 60%, #192524 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle grid texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.04) 60px), repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.04) 60px)",
          }}
        />

        {/* Top label */}
        <p
          style={{
            fontSize: 16,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 20,
          }}
        >
          Athens Riviera · Voula · Greece
        </p>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 76,
            fontWeight: 400,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Aphrodite
        </h1>
        <h1
          style={{
            fontSize: 76,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Residences
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: "rgba(255,255,255,0.4)",
            borderRadius: 2,
            margin: "28px auto",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontWeight: 300,
            letterSpacing: "0.03em",
          }}
        >
          Luxury Multi-Level Apartments · 168 – 269 m²
        </p>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            by Tolikas Development · gestates.gr
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
