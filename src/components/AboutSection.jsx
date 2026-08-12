export default function AboutSection() {
  return (
    <section id="about" className="rounded-[2rem] border border-line bg-ink p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">ABOUT US</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Passion for Earth&apos;s Finest Specimens</h2>
          <p className="mt-6 text-sm leading-8 text-white/80">
            Artistic Fine Art is a specialized dealer in fine gems and minerals, sourcing exceptional specimens directly from Pakistan&apos;s legendary mining regions — Gilgit-Baltistan, Swat, Skardu, and beyond. We also source rare specimens from Afghanistan and other mineral-rich regions worldwide. Every piece in our collection is 100% natural, untreated, and accompanied by a detailed description of its origin and characteristics. Whether you&apos;re a serious collector, a reseller, or discovering the world of fine minerals for the first time, we&apos;re here to help you find something truly extraordinary.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { value: "1,150+", label: "Specimens Sold" },
              { value: "2,000+", label: "Happy Collectors" },
              { value: "100%", label: "Natural & Untreated" },
              { value: "10+", label: "Countries Served" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-surface-2 p-5 text-white">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="https://instagram.com/artistic_fine_minerals"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
          >
            Follow Our Journey
          </a>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
          <div className="aspect-[4/5] rounded-[1.75rem] bg-[linear-gradient(135deg,_rgba(201,168,76,0.2),_rgba(255,255,255,0.04))] p-6">
            <div className="flex h-full items-end justify-between rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_60%)] p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-gold">Fine Mineral Sourcing</p>
                <p className="mt-4 max-w-xs text-xl font-semibold text-white">Pakistan & Beyond</p>
              </div>
              <div className="h-20 w-20 rounded-3xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
