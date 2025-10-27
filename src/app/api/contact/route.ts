/*
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Force Node runtime (Resend SDK likes Node)
export const runtime = "nodejs";

const resendKey  = process.env.RESEND_API_KEY!;
const toEmail    = process.env.CONTACT_TO_EMAIL!;
const fromEmail  = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

const resend = new Resend(resendKey);

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string; // honeypot
  ts?: string;      // ms timestamp
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

export async function POST(req: Request) {
  try {
    // --- parse body safely ---
    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return json({ ok: false, error: "Invalid JSON body." }, 400);
    }

    const name  = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();
    const company = body.company ? String(body.company) : "";
    const ts = body.ts ? Number(body.ts) : 0;

    // honeypot / too-fast checks
    if (company) return json({ ok: true });              // bots get success silently
    if (ts && Date.now() - ts < 1500) return json({ ok: true }); // too fast => likely bot

    if (!name || !email || !message) {
      return json({ ok: false, error: "Name, email and message are required." }, 400);
    }

    // ✅ use backticks so values interpolate
    const subject = `New inquiry — Aphrodite Residences (${name})`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      "",
      message,
    ].filter(Boolean).join("\n");
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],                       // main recipient
      cc: [process.env.CONTACT_CC!],       // add CC recipient
      subject,
      text,
      replyTo: email,
    });
    
    

    if (error) return json({ ok: false, error: String(error) }, 500);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: (err as Error).message || "Server error" }, 500);
  }
}
*/
// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// The Resend SDK prefers the Node runtime
export const runtime = "nodejs";

/* =========================
   Environment
========================= */
const resendKey   = process.env.RESEND_API_KEY!;
const toEmailsEnv = process.env.CONTACT_TO_EMAIL || ""; // supports comma-separated
const fromEmail   = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const ccEmailsEnv = process.env.CONTACT_CC || "";       // optional, comma-separated

if (!resendKey) {
  console.warn("RESEND_API_KEY is missing.");
}
if (!toEmailsEnv) {
  console.warn("CONTACT_TO_EMAIL is missing.");
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
