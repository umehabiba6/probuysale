import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  LoaderCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

const CATEGORY_TABS = [
  { key: "All", label: "All" },
  { key: "English Learning", label: "English" },
  { key: "Kids Learning", label: "Kids" },
  { key: "Programming", label: "Programming" },
  { key: "Business", label: "Business" },
  { key: "Startup Ideas", label: "Startup Ideas" },
];

const CATEGORY_BADGE = {
  "English Learning": {
    className: "bg-blue-500/15 text-blue-200 border border-blue-500/25",
    label: "English",
  },
  "Kids Learning": {
    className: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/25",
    label: "Kids",
  },
  Programming: {
    className: "bg-purple-500/15 text-purple-200 border border-purple-500/25",
    label: "Programming",
  },
  Business: {
    className: "bg-amber-500/15 text-amber-200 border border-amber-500/25",
    label: "Business (Leadership + AI) ",
  },
  "Startup Ideas": {
    className: "bg-rose-500/15 text-rose-200 border border-rose-500/25",
    label: "Startup Ideas",
  },
};


function formatPrice(pkr, usd) {
  const parts = [];
  if (pkr) parts.push(`PKR ${pkr}`);
  if (usd) parts.push(`USD ${usd}`);
  return parts.join(" • ");
}

function ProductCard({ product }) {
  const badge = CATEGORY_BADGE[product.category] || null;

  return (
    <div className="group relative bg-white/70 backdrop-blur border border-line rounded-xl p-6 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]">
      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-line bg-white/50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-ink/5 border border-line flex items-center justify-center text-ink">
                <span className="font-mono">IMG</span>
              </div>
              <div className="mt-3 text-slate/60 text-sm">No cover</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {badge ? (
          <span className={`font-mono text-[11px] px-3 py-1 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-slate/60">{product.category}</span>
        )}
        <span className="font-mono text-xs text-navy">{formatPrice(product.pricePKR, product.priceUSD)}</span>
      </div>

      <h3 className="font-display text-lg font-semibold text-ink mt-3 group-hover:text-cobalt transition-colors">
        {product.title}
      </h3>
      <p className="text-slate text-sm leading-relaxed mt-2 line-clamp-2">{product.description}</p>

      <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-3">
        <a
          href={product.gumroadLink}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-2 rounded-md transition-colors focus-ring ${!product.gumroadLink ? "opacity-50 pointer-events-none" : ""}`}
        >
          Buy Now <ArrowUpRight size={15} />
        </a>
        {product.previewUrl ? (
          <a
            href={product.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white text-ink text-sm font-medium px-4 py-2 rounded-md border border-line transition-colors focus-ring"
          >
            Preview
          </a>
        ) : (
          <span className="text-xs text-slate/50 font-mono">&nbsp;</span>
        )}
      </div>
    </div>
  );
}

export default function Products({ variant = "full", limit } = {}) {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("status", "==", "published"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (cancelled) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(docs);
      } catch (e) {
        console.error(e);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter(
      (p) =>
        p.category === active ||
        (active === "Programming" && String(p.category || "").includes("Programming"))
    );
  }, [active, products]);

  const visibleProducts = useMemo(() => {
    if (variant === "home") {
      return typeof limit === "number" ? filtered.slice(0, limit) : filtered.slice(0, 8);
    }
    return filtered;
  }, [filtered, variant, limit]);


  return (
    <section id="products" className="bg-mist py-24 md:py-28 border-t border-line">
      <Helmet>
        <title>Books — ProBuySale</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">CATALOG</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Books made for real progress
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {CATEGORY_TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  isActive
                    ? "bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md text-sm font-medium focus-ring"
                    : "bg-white/70 border border-line text-ink px-4 py-2 rounded-md text-sm font-medium focus-ring"
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/70 border border-line rounded-xl p-6 animate-pulse">
                <div className="aspect-[4/3] w-full rounded-lg bg-line" />
                <div className="h-4 w-2/3 bg-line rounded mt-4" />
                <div className="h-3 w-full bg-line rounded mt-2" />
                <div className="h-3 w-5/6 bg-line rounded mt-2" />
                <div className="h-10 w-full bg-line rounded mt-5" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/70 border border-line rounded-xl p-8 text-center">
            <p className="font-display text-lg text-ink">New books coming soon! Follow on Facebook to get notified.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}

          </div>
        )}

        {!loading && products.length === 0 ? (
          <div className="mt-6 text-slate text-sm flex items-center gap-2 justify-center">
            <LoaderCircle className="animate-spin" size={16} />
            Loading products…
          </div>
        ) : null}
      </div>
    </section>
  );
}

