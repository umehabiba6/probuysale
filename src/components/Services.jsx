import { Smartphone, Globe, Sparkles, PackageOpen, ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    tag: "service/app-development",
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Native-feel Android & iOS apps built in Flutter or React Native, from a single codebase you can maintain.",
    price: "depend on requirements",
  },
  {
    tag: "service/web-development",
    icon: Globe,
    title: "Websites & dashboards",
    desc: "React storefronts, portals and admin dashboards — fast to load, easy to extend, deployed on your own domain.",
    price: "not fixed, depends on requirements",
  },
  {
    tag: "service/ai-ml-integration",
    icon: Sparkles,
    title: "AI & ML integration",
    desc: "Chat assistants, RAG search and fine-tuned models wired into your product, not just a demo notebook.",
    price: "depend on requirements",
  },
  {
    tag: "product/ui-kits",
    icon: PackageOpen,
    title: "UI kits & templates",
    desc: "Ready-made Flutter and React UI kits you can license and customize today — no build queue to wait for.",
    price: "depends on requirements",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-mist py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 bg-white/70 border border-line rounded-full px-3 py-1.5">
            <span className="font-mono text-[11px] text-cobalt tracking-widest">CATALOG</span>
            <span className="font-mono text-[11px] text-slate/60">AI • Content • Monitoring</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            AI-powered services for fast, real growth
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            AI agents, digital content, monitoring & automation — delivered end-to-end so your
            business ships faster and runs smarter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {ITEMS.map(({ tag, icon: Icon, title, desc, price }) => (
            <div
              key={tag}
              className="group bg-white/70 backdrop-blur border border-line rounded-xl p-7 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]"
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
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="font-mono text-[11px] text-slate/70 border border-line rounded-full px-2 py-1">
                  Delivery in days
                </span>
                <span className="font-mono text-[11px] text-slate/70 border border-line rounded-full px-2 py-1">
                  Performance-first
                </span>
              </div>
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
