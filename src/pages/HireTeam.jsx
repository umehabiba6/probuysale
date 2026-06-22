import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Brain,
  Store,
  Palmtree,
  Orbit,
} from "lucide-react";

// Same endpoint as Contact.jsx
const FORMSPREE_ENDPOINT = "https://formspree.io/f/habibachand6";

const TEAM_TYPES = [
  { icon: Smartphone, label: "Flutter / Mobile App Teams" },
  { icon: Laptop, label: "React / Web Development Teams" },
  { icon: Brain, label: "AI & ML Integration Teams" },
  { icon: Store, label: "WordPress & Shopify Teams" },
  { icon: Palmtree, label: "UI/UX & Graphic Design Teams" },
  { icon: Orbit, label: "Full-stack End-to-End Teams" },
];

const SERVICE_OPTIONS = [
  "Mobile App Development",
  "Website Development",
  "AI & ML Integration",
  "E-commerce Store",
  "UI/UX Design",
  "Full Project (multiple services)",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $500",
  "$500–$2000",
  "$2000–$5000",
  "$5000+",
  "Let's discuss",
];

export default function HireTeam() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    // Field to indicate this came from the hire team form
    data.append("source", "hire-team-form");

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
    <div className="bg-mist pt-16 md:pt-24">
      {/* HERO */}
      <section className="bg-ink py-20 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-amber tracking-widest mb-3">HIRE A TEAM</p>

          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white tracking-tight">
            Need a team? We'll build one for you.
          </h1>

          <p className="mt-5 text-white/70 leading-relaxed max-w-3xl">
            Tell us what you're building — we'll match you with the right developers, designers, and AI specialists from our
            partner network and deliver your project end to end.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="font-mono text-xs text-amber tracking-wide">
              We also assign teams for client projects — share your requirements and we'll match you with the right people.
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 md:py-24 border-t border-line">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">HOW IT WORKS</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            The fastest way to get a full build team
          </h2>

          <div className="mt-14 grid md:grid-cols-4 gap-x-8 gap-y-10">
            {[
              {
                n: "01",
                title: "Submit your project brief using the form below",
                desc: "Share goals, features, and constraints — we start matching immediately.",
              },
              {
                n: "02",
                title: "We review requirements and handpick the right team",
                desc: "We combine proven partners for the exact skills your project needs.",
              },
              {
                n: "03",
                title: "Your assigned team starts within 48 hours",
                desc: "You’ll get regular progress updates and clear checkpoints.",
              },
              {
                n: "04",
                title: "Project delivered on time with 2 weeks post-launch support",
                desc: "Stability, QA, and post-launch fixes — included.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="relative pl-0 rounded-xl border border-line bg-white/60 backdrop-blur p-6 hover:bg-white/80 transition-colors group overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 h-24 w-24 rounded-full bg-cobalt/15 blur-2xl" />
                </div>

                <span className="relative font-mono text-3xl text-cobalt/25">{s.n}</span>
                <h3 className="font-display text-lg font-semibold text-ink mt-3">{s.title}</h3>
                <p className="text-slate text-sm leading-relaxed mt-2">{s.desc}</p>

                {i < 3 && <span className="hidden md:block absolute top-6 -right-4 w-px h-10 bg-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section className="bg-mist py-20 md:py-24 border-t border-line">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">TEAMS WE CAN ASSIGN</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Skilled teams for every kind of build
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_TYPES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white/70 border border-line rounded-xl p-6 hover:border-cobalt/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-ink/5 border border-line flex items-center justify-center text-cobalt">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-ink">{label}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-slate text-sm">
            Don’t see your exact stack? Choose <span className="font-mono">Other</span> and we’ll match you anyway.
          </p>

          {/* Spacer */}
          <div className="h-2" />
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-ink py-20 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-amber tracking-widest mb-3">REQUEST A TEAM</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Tell us what you're building
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              We’ll respond after reviewing your requirements and matching the best partner team.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white/5 border border-white/10 rounded-xl p-7 md:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-mono text-white/50 mb-2">Full Name</span>
                <input
                  required
                  name="fullName"
                  type="text"
                  className="form-input form-input-ink"
                  placeholder="Your full name"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-mono text-white/50 mb-2">Gmail address</span>
                <div className="relative">
                  <input
                    required
                    name="email"
                    type="email"
                    className="form-input form-input-ink"
                    placeholder="you@gmail.com"
                  />
                </div>
                <p className="mt-2 text-xs text-white/50 leading-relaxed">
                  We'll contact you on this Gmail to discuss and assign your team.
                </p>
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-5">
              <label className="block">
                <span className="block text-xs font-mono text-white/50 mb-2">Service Type</span>
                <select name="serviceType" className="form-input form-input-ink" defaultValue={SERVICE_OPTIONS[0]}>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-ink text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-xs font-mono text-white/50 mb-2">Budget Range</span>
                <select name="budget" className="form-input form-input-ink" defaultValue={BUDGET_OPTIONS[0]}>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-ink text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5">
              <label className="block">
                <span className="block text-xs font-mono text-white/50 mb-2">Project Description</span>
                <textarea
                  required
                  name="description"
                  rows={4}
                  className="form-input form-input-ink resize-none"
                  placeholder="Describe your project — what it does, who it's for, your timeline, and any tech preferences."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full bg-cobalt hover:bg-cobalt-light disabled:opacity-60 text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring"
            >
              {status === "sending" ? "Requesting…" : "Request a Team"}
            </button>

            {status === "success" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} /> Sent — we'll contact you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> Couldn't submit. Please try again.
              </p>
            )}

            <div className="mt-6">
              <div className="h-px bg-white/10" />
              <p className="mt-4 text-center text-xs text-white/60">
                Every team is vetted by ProBuySale. You deal with us — we manage the team on your behalf.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Small bottom spacer to avoid overlap */}
      <section className="h-10" aria-hidden="true" />
    </div>
  );
}

