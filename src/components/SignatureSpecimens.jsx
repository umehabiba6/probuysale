export default function SignatureSpecimens() {
  const specimens = [
    {
      title: "Aurora Aquamarine Prism",
      description: "A flawless blue tower carved from premium Swat Valley aquamarine.",
      origin: "Swat Valley, Pakistan",
      image: "/images/specimens/aurora-aquamarine-prism.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1519741490076-0c673dacd9a2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Imperial Emerald Matrix",
      description: "A dramatic green matrix specimen with vivid, collector-grade emerald crystals.",
      origin: "Gilgit-Baltistan, Pakistan",
      image: "/images/specimens/imperial-emerald-matrix.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1548092372-d3d01d9f7601?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Royal Amethyst Cathedral",
      description: "A luxurious purple amethyst cathedral with deep color and extraordinary clarity.",
      origin: "Skardu, Pakistan",
      image: "/images/specimens/royal-amethyst-cathedral.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section className="animate-fade-up rounded-[2rem] border border-line bg-gradient-to-br from-stone-950 via-ink to-black/80 p-6 text-white shadow-xl shadow-black/30 sm:p-8">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Signature Specimens</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Museum-quality minerals curated for serious collectors.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
          Discover three of our most remarkable specimens, hand-selected for rarity,
          brilliance, and unforgettable presence.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {specimens.map((specimen) => (
          <article key={specimen.title} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 transition hover:-translate-y-1 hover:border-gold/25 hover:bg-slate-950/80">
            <div className="relative h-[26rem] overflow-hidden rounded-[1.75rem] bg-slate-900">
              <img
                src={specimen.image}
                alt={specimen.title}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = specimen.fallbackImageUrl;
                }}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-gold/80">{specimen.origin}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{specimen.title}</h3>
              </div>
            </div>
            <div className="space-y-4 p-6 text-white/80">
              <p>{specimen.description}</p>
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">
                Collector’s edition • Limited availability
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
