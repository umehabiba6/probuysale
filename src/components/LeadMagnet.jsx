import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

// Use the same Formspree endpoint already used in Contact.jsx
const FORMSPREE_ENDPOINT = "https://formspree.io/f/habibachand6";

export default function LeadMagnet() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    // Field to indicate this came from the lead magnet form
    data.append("lead_source", "lead-magnet");

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
    <section id="free-guide" className="bg-white py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">FREE GUIDE</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Get our free Flutter starter checklist
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Leave your email and we’ll send the downloadable checklist.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-xl bg-mist/60 border border-line rounded-xl p-7 md:p-8"
        >
          <label className="block">
            <span className="block text-xs font-mono text-slate/80 mb-2">EMAIL</span>
            <div className="relative">
              <input
                required
                name="email"
                type="email"
                className="form-input-ink form-input"

                placeholder="you@example.com"
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                <Mail size={16} />
              </div>
            </div>
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full bg-cobalt hover:bg-cobalt-light disabled:opacity-60 text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring"
          >
            {status === "sending" ? "Sending…" : "Send me the free guide"}
          </button>

          {status === "success" && (
            <p className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 size={16} /> Sent — check your inbox.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-500">
              <AlertCircle size={16} /> Couldn’t send. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

