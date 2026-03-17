
// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// The Resend SDK prefers the Node runtime
export const runtime = "nodejs";

/* =========================
   Environment
========================= */
const resendKey   = process.env.RESEND_API_KEY;
const toEmailsEnv = process.env.CONTACT_TO_EMAIL || ""; // supports comma-separated
const fromEmail   = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const ccEmailsEnv = process.env.CONTACT_CC || "";       // optional, comma-separated

if (!resendKey || !toEmailsEnv) {
  throw new Error("RESEND_API_KEY and CONTACT_TO_EMAIL must be set");
}

const resend = new Resend(resendKey);

/* =========================
   Types
========================= */
type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string; // honeypot
  ts?: string;      // ms timestamp as string
};

/* =========================
   Helpers
========================= */
function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function asStringError(e: unknown): string {
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e && typeof (e as any).message === "string") {
    return (e as any).message as string;
  }
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

function splitEmails(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================
   Handler
========================= */
export async function POST(req: Request) {
  try {
    // --- Parse JSON body safely ---
    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return json({ ok: false, error: "Invalid JSON body." }, 400);
    }

    // --- Extract & normalize fields ---
    const name    = (body.name || "").trim();
    const email   = (body.email || "").trim();
    const phone   = (body.phone || "").trim();
    const message = (body.message || "").trim();
    const company = body.company ? String(body.company) : "";
    const ts      = body.ts ? Number(body.ts) : 0;

    // --- Honeypot & anti-bot timing ---
    if (company) return json({ ok: true });                 // bots: no-op, pretend success
    if (ts && Date.now() - ts < 1500) return json({ ok: true }); // too fast => likely bot

    // --- Basic validation ---
    if (!name || !email || !message) {
      return json({ ok: false, error: "Name, email and message are required." }, 400);
    }
    if (!isValidEmail(email)) {
      return json({ ok: false, error: "Invalid email address." }, 400);
    }

    // --- Build recipients ---
    const toList = splitEmails(toEmailsEnv);
    const ccList = splitEmails(ccEmailsEnv); // optional

    if (toList.length === 0) {
      return json({ ok: false, error: "No CONTACT_TO_EMAIL configured." }, 500);
    }

    // --- Email content ---
    const subject = `New inquiry — Aphrodite Residences (${name})`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    // --- Compose payload (only include cc if we have any) ---
    const payload: Parameters<typeof resend.emails.send>[0] = {
      from: fromEmail,
      to: toList,
      subject,
      text,
      replyTo: email, // lets you reply directly to the sender
      ...(ccList.length ? { cc: ccList } : {}),
    };

    // --- Send via Resend ---
    const { error } = await resend.emails.send(payload);

    if (error) {
      return json({ ok: false, error: asStringError(error) }, 500);
    }

    return json({ ok: true });
  } catch (e) {
    console.error("contact/send error:", e);
    return json({ ok: false, error: asStringError(e) }, 500);
  }
}
