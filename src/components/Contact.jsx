import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

// Replace YOUR_FORM_ID with the ID Formspree gives you after you create a
// free form at https://formspree.io — takes about a minute, no backend needed.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/habibachand6";
const CONTACT_EMAIL = "habibachand6@gmail.com";
const CONTACT_SECONDARY_EMAIL = "contact@aisquadx.com";
const CONTACT_WEBSITE = "https://aisquadx.com";
const CONTACT_WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029Vb80wwsKLaHiravuLc3q";

const SERVICE_OPTIONS = [
  "App development",
  "Web development",
  "AI / ML integration",
  "UI kit / template",
  "Ai Agents",
  "Something else",
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-ink py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.3fr] gap-14">
        <div>
          <p className="font-mono text-xs text-amber tracking-widest mb-3">CONTACT</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Tell me what you're building
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed max-w-sm">
            AI agents, digital content, monitoring & automation — message me and I’ll
            reply within 1 business day.
          </p>

          <div className="mt-7 space-y-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors focus-ring rounded"
            >
              <Mail size={16} /> {CONTACT_EMAIL}
            </a>
            <a
              href="mailto:contact@aisquadx.com"
              className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors focus-ring rounded"
            >
              <Mail size={16} /> contact@aisquadx.com
            </a>
            <a
              href="https://aisquadx.com"
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-white/75 hover:text-white transition-colors focus-ring rounded"
            >
              https://aisquadx.com
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb80wwsKLaHiravuLc3q"
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-white/75 hover:text-white transition-colors focus-ring rounded"
            >
              WhatsApp Channel
            </a>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-7 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name">
              <input
                required
                name="name"
                type="text"
                className="form-input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email">
              <input
                required
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <Field label="What do you need?">
            <select name="service" className="form-input" defaultValue={SERVICE_OPTIONS[0]}>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Project details">
            <textarea
              required
              name="message"
              rows={4}
              className="form-input resize-none"
              placeholder="A few lines about what you're building, and your rough timeline."
            />
          </Field>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-cobalt hover:bg-cobalt-light disabled:opacity-60 text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 size={16} /> Sent — you'll hear back by email soon.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={16} /> Couldn't send. Email {CONTACT_EMAIL} directly instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-white/50 mb-2">{label}</span>
      {children}
    </label>
  );
}
