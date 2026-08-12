const reels = [
  {
    id: "DYda0oEium0",
    title: "Crystal Formation Reveal",
    caption: "A close-up reel showing a premium crystal specimen in motion.",
  },
  {
    id: "DYFFW5nN5Ro",
    title: "Gemstone Spotlight",
    caption: "Highlighting the cut, glow, and natural structure of our favorite gems.",
  },
  {
    id: "DYBwvh3tLUA",
    title: "Mineral Matrix Story",
    caption: "A slow reveal of rare mineral matrix and polished surfaces.",
  },
  {
    id: "DYBwIyCt0xI",
    title: "Tourmaline Close-Up",
    caption: "A detailed reel of a stunning watermelon tourmaline specimen.",
  },
  {
    id: "DYBuzboNa9i",
    title: "Collector Specimen Showcase",
    caption: "A premium reel featuring museum-quality crystals and collector pieces.",
  },
];

export default function VideoGallerySection() {
  return (
    <section id="videos" className="rounded-[2rem] border border-line bg-ink p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">VIDEO GALLERY</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Instagram Reel Showcase</h2>
        <p className="mt-4 text-sm leading-7 text-white/70">
          Watch our latest specimen reels directly on the site. Each card is embedded for instant preview, with the original reel available if the player does not load.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {reels.map((reel) => (
          <div key={reel.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-4 shadow-xl shadow-black/20">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-black">
              <iframe
                title={reel.title}
                src={`https://www.instagram.com/reel/${reel.id}/embed`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-[380px] w-full border-0 bg-black"
              />
            </div>
            <div className="mt-5 space-y-3 px-2">
              <h3 className="text-lg font-semibold text-white">{reel.title}</h3>
              <p className="text-sm leading-7 text-white/70">{reel.caption}</p>
              <a
                href={`https://www.instagram.com/reel/${reel.id}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
              >
                Open Original Reel
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
