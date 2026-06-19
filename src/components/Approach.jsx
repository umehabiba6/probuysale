const STEPS = [
  {
    n: "01",
    title: "Brief",
    desc: "You describe the app, site or AI feature you need through the contact form below.",
  },
  {
    n: "02",
    title: "Scope & quote",
    desc: "A fixed price and timeline land in your inbox within one business day.",
  },
  {
    n: "03",
    title: "Build",
    desc: "You get progress checkpoints, not silence — screenshots and short demos as it comes together.",
  },
  {
    n: "04",
    title: "Ship & support",
    desc: "Delivered with source code and two weeks of post-launch fixes included.",
  },
];

export default function Approach() {
  return (
    <section id="work" className="bg-white py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-cobalt tracking-widest mb-3">PROCESS</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight max-w-lg">
          From brief to build, in four steps
        </h2>

        <div className="mt-14 grid md:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative pl-0 rounded-xl border border-line bg-white/60 backdrop-blur p-6 hover:bg-white/80 transition-colors group"
            >
              <span className="font-mono text-3xl text-cobalt/25">{s.n}</span>
              <h3 className="font-display text-lg font-semibold text-ink mt-3">
                {s.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed mt-2">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="hidden md:block absolute top-6 -right-4 w-px h-10 bg-line" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

