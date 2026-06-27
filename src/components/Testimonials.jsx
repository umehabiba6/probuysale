import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sara K.",
    stars: 5,
    review:
      "These digital books helped me finally speak with confidence. Clean explanations and super practical exercises.",
  },
  {
    name: "Ayesha R.",
    stars: 5,
    review:
      "My kids actually enjoyed learning! The activities are fun and the quality is excellent for the price.",
  },
  {
    name: "Hamza M.",
    stars: 5,
    review:
      "Great step-by-step programming guides. I built real things without getting lost in theory.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-mist py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">WHAT READERS SAY</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Real feedback from real readers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="bg-white/70 backdrop-blur border border-line rounded-xl p-7 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-ink">{t.name}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < t.stars
                          ? "fill-amber text-amber"
                          : "fill-white/10 text-amber/30"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate text-sm leading-relaxed mt-4">{t.review}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

