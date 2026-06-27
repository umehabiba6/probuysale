const SERVICE_LINES = [
  { path: "english-learning/", note: "speak with confidence" },
  { path: "kids-learning/", note: "fun & colorful" },
  { path: "programming/", note: "flutter, python, c++" },
];

export default function HeroDigitalProducts() {
  return (
    <section id="top" className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(36,86,219,0.35),transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 md:pt-40 md:pb-32 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-mono text-xs text-amber tracking-widest mb-5">DIGITAL BOOKS &amp; RESOURCES</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
            Learn English. Teach your kids. Master coding.
          </h1>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
            Hand-crafted digital books by Ume Habiba — designed for real learners, not just readers.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-6 py-3 rounded-md transition-colors focus-ring"
            >
              Browse Books
            </a>
            <a
              href="#about"
              className="border border-white/20 hover:border-white/40 text-white text-sm font-medium px-6 py-3 rounded-md transition-colors focus-ring"
            >
              About the Author
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
              <span className="text-amber">$</span> ls books/
            </p>
            {SERVICE_LINES.map((s) => (
              <p key={s.path} className="pl-4 flex justify-between gap-6">
                <span className="text-cobalt-light">{s.path}</span>
                <span className="text-white/35">{s.note}</span>
              </p>
            ))}
            <p className="mt-3">
              <span className="text-amber">$</span> open my-next-book▌
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

