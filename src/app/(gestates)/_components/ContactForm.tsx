"use client";
import { useEffect, useRef, useState } from "react";

export default function ContactForm({
  projects,
  placeholder = "Message",
}: {
  projects: string[];
  placeholder?: string;
}) {
  const tsRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(d.get("name") || ""),
          email: String(d.get("email") || ""),
          phone: String(d.get("phone") || ""),
          project: String(d.get("project") || ""),
          message: String(d.get("message") || ""),
          company: String(d.get("company") || ""),
          ts: String(d.get("ts") || ""),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      form.reset();
      if (tsRef.current) tsRef.current.value = String(Date.now());
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form className="cf" onSubmit={onSubmit}>
      <div className="row">
        <input name="name" placeholder="Full name" required />
        <input name="email" type="email" placeholder="Email" required />
      </div>
      <div className="row">
        <input name="phone" placeholder="Phone" />
        <select name="project" defaultValue={projects[0]}>
          {projects.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <textarea name="message" placeholder={placeholder} required />
      {/* honeypot + timing, checked by /api/contact */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <input ref={tsRef} name="ts" type="hidden" />
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {status === "ok" && <p role="status">Thank you — we’ll be in touch shortly.</p>}
      {status === "error" && <p role="alert">{error}</p>}
    </form>
  );
}
