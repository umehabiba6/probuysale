const STACK = [
  "Flutter",
  "React Native",
  "React",
  "Python",
  "PyTorch",
  "Claude API",
  "Hosting",
];

export default function About() {
  return (
    <section id="about" className="bg-navy py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
        <div>
          <p className="font-mono text-xs text-amber tracking-widest mb-3">ABOUT</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Great services, built with great tech.We build apps that scale, and AI agents that perform.
          </h2>
        </div>

        <div>
          {/* Edit this paragraph with your own background before launch */}
          <p className="text-white/70 leading-relaxed">
            We are a dedicated team of full‑stack Flutter developers and IT professionals (BSIT 2022–2026) who build apps that scale — powered by Firebase and Supabase, engineered to perform. Together, we design and deploy custom AI agents for established companies, turning automation into a competitive edge for their business.

Beyond development, we focus on real monetization systems — not side projects, but digital products designed to generate sustainable revenue. Our team collaborates with recognized brands to strengthen their digital presence, delivering everything end‑to‑end: development, AI integration, hosting, and graphic design — one team, one source, zero compromises.

With a big and talented workforce, we ensure projects are delivered within days, combining speed, precision, and creativity to help businesses launch faster and grow smarter.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-7">
            {STACK.map((t) => (
              <span
                key={t}
                className="font-mono text-xs text-white/70 border border-white/15 rounded-full px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
