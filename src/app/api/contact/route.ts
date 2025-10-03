// src/app/api/contact/route.ts
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
