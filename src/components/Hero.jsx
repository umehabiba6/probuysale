const SERVICE_LINES = [
  { path: "app-development/", note: "Flutter & React Native" },
  { path: "web-development/", note: "React, full-stack" },
  { path: "ai-ml-integration/", note: "fine-tuning, RAG" },
  { path: "ui-kits.zip", note: "ready to ship" },
];

export default function Hero() {
  return (
    <section id="top" className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(36,86,219,0.35),transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-mono text-xs text-amber tracking-widest mb-5">
            DIGITAL PRODUCTS &amp; DEV SERVICES
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
            Built once by a developer.
            <br />
            Sold to one client at a time.
          </h1>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed max-w-md">
            ProBuySale is a single-seller storefront for mobile apps, websites, AI
            integrations and ready-made UI kits — no agency layer, no markup, just the
            person who builds it.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#services"
              className="bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-6 py-3 rounded-md transition-colors focus-ring"
            >
              Browse the catalog
            </a>
            <a
              href="#contact"
              className="border border-white/20 hover:border-white/40 text-white text-sm font-medium px-6 py-3 rounded-md transition-colors focus-ring"
            >
              Request a quote
            </a>
          </div>
        </div>

        <div className="term-card font-mono text-sm md:text-[13px] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 text-white/30 text-xs">probuysale — zsh</span>
          </div>
          <div className="p-5 text-white/80 leading-7">
            <p>
              <span className="text-amber">$</span> ls services/
            </p>
            {SERVICE_LINES.map((s) => (
              <p key={s.path} className="pl-4 flex justify-between gap-6">
                <span className="text-cobalt-light">{s.path}</span>
                <span className="text-white/35">{s.note}</span>
              </p>
            ))}
            <p className="mt-3">
              <span className="text-amber">$</span> open contact.form
              <span className="caret" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
