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
            Great services, built with great tech. We build apps that scale, and AI agents that perform.
          </h2>
        </div>

        <div>
          {/* Edit this paragraph with your own background before launch */}
          <p className="text-white/70 leading-relaxed">
            I build scalable digital products as a solo freelance developer — backed by (BSIT 2022–2026) and powered by Flutter, Firebase, and Supabase. I engineer high-performance apps and design/deploy custom AI agents for established businesses, turning automation into a measurable competitive edge.

I also focus on monetization that actually works: sustainable digital products (not side projects) designed to generate consistent revenue. We strengthen your brand’s digital presence end‑to‑end with development, AI integration, hosting, and graphic design — one dependable developer, one delivery standard, zero compromises.

I deliver fast, with careful planning and precision, so you can launch sooner and grow smarter.
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
