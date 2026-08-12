import { Gem, Droplet, ExternalLink, Star } from "lucide-react";

const categories = [
  {
    icon: <Gem className="h-6 w-6" />,
    title: "Tourmaline",
    description:
      "Multi-colored tourmaline crystals from Pakistan's finest mines — including rare watermelon, green cap, and color-change specimens.",
    category: "Tourmaline",
    image: "/images/OIP.webp",
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    title: "Aquamarine & Emerald",
    description:
      "Stunning beryl family specimens from Swat and Gilgit-Baltistan — crystal clear aquamarines and rich green emeralds on matrix.",
    category: "Aquamarine",
    image: "/images/OIP%20(1).webp",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Collector Specimens",
    description:
      "Rare and exceptional mineral formations for serious collectors — smoky quartz, rare formations, and one-of-a-kind natural masterpieces.",
    category: "Quartz",
    image: "/images/OIP%20(2).webp",
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
          <div
            key={item.title}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCategory(item.category)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onSelectCategory(item.category);
              }
            }}
            className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-0 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="relative h-56 overflow-hidden rounded-t-[2rem] bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent p-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.35em] text-gold">
                  {item.icon}
                  {item.title}
                </span>
              </div>
            </div>
            <div className="space-y-5 p-8">
              <p className="text-sm leading-7 text-white/75">{item.description}</p>
              <a
                href="https://instagram.com/artistic_fine_minerals"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:bg-gold-light"
              >
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                View Collection
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
