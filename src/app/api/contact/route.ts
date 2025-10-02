import { NextResponse } from "next/server";
import { Resend } from "resend";
export const runtime = "nodejs";

const resendKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

const resend = new Resend(resendKey);

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string; // honeypot
  ts?: string;      // millisecond timestamp
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

export async function POST(req: Request) {
  try {
    if (!resendKey || !toEmail || !fromEmail) {
      return json({ ok: false, error: "Missing email environment variables." }, 500);
    }

    let body: Partial<ContactPayload> = {};
    try {
      body = (await req.json()) as Partial<ContactPayload>;
    } catch {
      return json({ ok: false, error: "Invalid JSON body." }, 400);
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const phone = body.phone ? String(body.phone) : "";
    const company = body.company ? String(body.company) : "";
    const ts = body.ts ? Number(body.ts) : 0;

    // Honeypot / too-fast checks
    if (company) return json({ ok: true });
    if (ts && Date.now() - ts < 1500) return json({ ok: true });

    if (!name || !email || !message) {
      return json({ ok: false, error: "Name, email and message are required." }, 400);
    }

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
      to: [toEmail],
      subject,
      text,
      reply_to: email,
    });

    if (error) return json({ ok: false, error: String(error) }, 500);

    return json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return json({ ok: false, error: msg }, 500);
  }
}

export async function GET() {
  // Helpful to confirm the route is deployed
  return json({ ok: true, endpoint: "/api/contact" });
}
