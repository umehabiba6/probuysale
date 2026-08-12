import { ShieldCheck, Award, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.2),_transparent_25%),radial-gradient(circle_at_center,_rgba(255,209,115,0.08),_transparent_20%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">FINE GEMS & MINERALS</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Where Earth&apos;s Rarest Treasures Find Their Home
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white text-opacity-80 sm:text-lg">
              Artistic Fine Art brings museum-quality gemstones and collector specimens together in one curated destination. Every piece is sourced with provenance, beauty, and rarity in mind.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
              >
                Explore Signature Pieces
              </a>
              <a
                href="https://instagram.com/artistic_fine_minerals"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Curated Portfolio
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                "100% Natural & Untreated",
                "Authenticity Certificate Available",
                "Worldwide Shipping",
              ].map((badge) => (
                <div key={badge} className="rounded-3xl border border-line bg-surface-2 px-4 py-3 text-sm text-white text-opacity-85">
                  <span className="mr-2 text-gold">✓</span>
                  {badge}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div
                  tabIndex={0}
                  className="group flex items-start gap-4 rounded-3xl border border-line bg-surface-2 p-4 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Provenance & Ethics</h4>
                    <p className="mt-1 text-sm text-white/80">Traceable sourcing and a transparent chain-of-custody for every specimen.</p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="group flex items-start gap-4 rounded-3xl border border-line bg-surface-2 p-4 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Curated Authenticity</h4>
                    <p className="mt-1 text-sm text-white/80">All specimens are gemologist-reviewed; certificates provided for premium pieces.</p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="group flex items-start gap-4 rounded-3xl border border-line bg-surface-2 p-4 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105">
                    <Truck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">White-Glove Service</h4>
                    <p className="mt-1 text-sm text-white/80">Insured concierge shipping and dedicated post-sale support for collectors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-8">
            <div className="h-[420px] rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,_rgba(201,168,76,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))] p-6">
              <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_45%)] p-8 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-gold">Luxury Collection</p>
                <p className="mt-8 text-3xl font-semibold text-white">Premium gems, museum-quality minerals, and handcrafted specimen displays.</p>
                <p className="mt-6 text-sm leading-7 text-white text-opacity-80">
                  Discover rare tourmaline, aquamarine, emerald, smoky quartz, and more from Pakistan&apos;s finest mineral regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
