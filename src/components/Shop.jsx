import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: "YOUR_PRODUCT_ID_UI_1",
    category: "UI kits/templates",
    title: "Flutter UI Kit for SaaS Dashboards",
    description: "A production-ready Flutter UI kit with dashboard screens and components.",
    price: "$49",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },
  {
    id: "YOUR_PRODUCT_ID_UI_2",
    category: "UI kits/templates",
    title: "React Landing Page Template (Tailwind)",
    description: "Conversion-focused sections, responsive layout, and clean Tailwind structure.",
    price: "$29",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },

  {
    id: "YOUR_PRODUCT_ID_EBOOK_1",
    category: "ebooks/guides",
    title: "Monetize Digital Products: A Practical Guide",
    description: "Pricing, packaging, and launch strategies that work for solo devs.",
    price: "$19",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },
  {
    id: "YOUR_PRODUCT_ID_EBOOK_2",
    category: "ebooks/guides",
    title: "Flutter App Hardening Checklist",
    description: "Improve performance, UX, and reliability with a step-by-step checklist.",
    price: "$15",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },

  {
    id: "YOUR_PRODUCT_ID_APP_1",
    category: "apps/tools",
    title: "RAG Debugger for Business Teams",
    description: "A simple tool to inspect retrieval quality and generated answers.",
    price: "$39",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },
  {
    id: "YOUR_PRODUCT_ID_APP_2",
    category: "apps/tools",
    title: "LaunchOps: Project Timeline Generator",
    description: "Turn your idea into a realistic release plan in minutes.",
    price: "$25",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },

  {
    id: "YOUR_PRODUCT_ID_COURSE_1",
    category: "courses",
    title: "Build a Custom Mobile App (End-to-End)",
    description: "From discovery to deployment — learn the full delivery workflow.",
    price: "$99",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },
  {
    id: "YOUR_PRODUCT_ID_COURSE_2",
    category: "courses",
    title: "AI Integration for Real Products (RAG + Agents)",
    description: "Ship AI features that are reliable, measurable, and maintainable.",
    price: "$149",
    imageSrc: "/images/placeholder-product.png",
    gumroadUrl: "https://gumroad.com/l/YOUR_PRODUCT_ID",
  },
];

export default function Shop() {
  return (
    <section id="shop" className="bg-mist py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">SHOP</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Digital products you can buy today
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            UI kits, guides, tools, and courses — designed to help you ship faster and smarter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden bg-white/70 backdrop-blur border border-line rounded-xl p-6 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cobalt/20 blur-2xl" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-amber/15 blur-2xl" />
              </div>

              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-line bg-white/50">
                  <img
                    src={p.imageSrc}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-slate tracking-wide">
                    {p.category}
                  </span>
                  <span className="font-mono text-xs text-navy">{p.price}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-ink mt-3">
                  {p.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mt-2">{p.description}</p>

                <a
                  href={p.gumroadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring"
                >
                  Buy Now <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

