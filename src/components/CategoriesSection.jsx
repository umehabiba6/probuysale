import { Gem, Droplet, Star } from "lucide-react";

const categories = [
  {
    icon: <Gem className="h-6 w-6" />, 
    title: "Tourmaline",
    description:
      "Multi-colored tourmaline crystals from Pakistan's finest mines — including rare watermelon, green cap, and color-change specimens.",
    category: "Tourmaline",
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    title: "Aquamarine & Emerald",
    description:
      "Stunning beryl family specimens from Swat and Gilgit-Baltistan — crystal clear aquamarines and rich green emeralds on matrix.",
    category: "Aquamarine",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Collector Specimens",
    description:
      "Rare and exceptional mineral formations for serious collectors — smoky quartz, rare formations, and one-of-a-kind natural masterpieces.",
    category: "Quartz",
  },
];

export default function CategoriesSection({ onSelectCategory }) {
  return (
    <section className="rounded-[2rem] border border-line bg-surface-2 p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">WHAT WE OFFER</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Our Specialties</h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {categories.map((item) => (
          <div key={item.title} className="space-y-5 rounded-[2rem] border border-white/10 bg-ink p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gold text-black">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectCategory(item.category)}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
            >
              View Collection
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
