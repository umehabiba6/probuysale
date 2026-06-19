import { Smartphone, Globe, Sparkles, PackageOpen, ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    tag: "service/app-development",
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Native-feel Android & iOS apps built in Flutter or React Native, from a single codebase you can maintain.",
    price: "From PKR 35,000",
  },
  {
    tag: "service/web-development",
    icon: Globe,
    title: "Websites & dashboards",
    desc: "React storefronts, portals and admin dashboards — fast to load, easy to extend, deployed on your own domain.",
    price: "From PKR 20,000",
  },
  {
    tag: "service/ai-ml-integration",
    icon: Sparkles,
    title: "AI & ML integration",
    desc: "Chat assistants, RAG search and fine-tuned models wired into your product, not just a demo notebook.",
    price: "From PKR 25,000",
  },
  {
    tag: "product/ui-kits",
    icon: PackageOpen,
    title: "UI kits & templates",
    desc: "Ready-made Flutter and React UI kits you can license and customize today — no build queue to wait for.",
    price: "From PKR 4,000",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-mist py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">CATALOG</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Four ways to ship faster
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Every item below is delivered by the same person who builds it — pick what
            you need, or combine a product with a service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {ITEMS.map(({ tag, icon: Icon, title, desc, price }) => (
            <div
              key={tag}
              className="group bg-white border border-line rounded-xl p-7 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate tracking-wide">
                  {tag}
                </span>
                <Icon size={20} className="text-cobalt" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mt-5">
                {title}
              </h3>
              <p className="text-slate text-sm leading-relaxed mt-2.5">{desc}</p>
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-line">
                <span className="font-mono text-xs text-navy">{price}</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-navy transition-colors focus-ring rounded"
                >
                  Get this <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
