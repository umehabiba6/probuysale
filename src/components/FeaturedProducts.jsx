import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { MapPin, ChevronRight } from "lucide-react";

const tabs = ["All", "Tourmaline", "Aquamarine", "Emerald", "Quartz", "Other"];

const sampleProducts = [
  {
    id: "sample-amethyst-1",
    title: "Royal Amethyst Cathedral",
    category: "Quartz",
    origin: "Skardu, Pakistan",
    pricePKR: "45,000",
    priceUSD: "180",
    status: "Available",
    coverImageUrl: "/images/specimens/royal-amethyst-cathedral.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-aquamarine-1",
    title: "Ocean-Clear Aquamarine Tower",
    category: "Aquamarine",
    origin: "Swat Valley, Pakistan",
    pricePKR: "120,000",
    priceUSD: "480",
    status: "Available",
    coverImageUrl: "/images/specimens/ocean-clear-aquamarine-tower.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1519741490076-0c673dacd9a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-emerald-1",
    title: "Imperial Green Emerald Matrix",
    category: "Emerald",
    origin: "Gilgit-Baltistan, Pakistan",
    pricePKR: "95,000",
    priceUSD: "380",
    status: "Available",
    coverImageUrl: "/images/specimens/imperial-green-emerald-matrix.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1548092372-d3d01d9f7601?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-tourmaline-1",
    title: "Watermelon Tourmaline Slice",
    category: "Tourmaline",
    origin: "Islamabad Region, Pakistan",
    pricePKR: "75,000",
    priceUSD: "300",
    status: "Sold",
    coverImageUrl: "/images/specimens/watermelon-tourmaline-slice.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1517039630-7f8b8cbfca16?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-smoky-1",
    title: "Smoky Quartz Phantom Cluster",
    category: "Quartz",
    origin: "Balochistan, Pakistan",
    pricePKR: "55,000",
    priceUSD: "220",
    status: "Available",
    coverImageUrl: "/images/specimens/smoky-quartz-phantom-cluster.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1517904964774-3fba1aa72b1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-fluorite-1",
    title: "Collector's Fluorite Octahedron",
    category: "Other",
    origin: "Northern Pakistan",
    pricePKR: "65,000",
    priceUSD: "260",
    status: "Available",
    coverImageUrl: "/images/specimens/collectors-fluorite-octahedron.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1516572113194-71e018c1f784?auto=format&fit=crop&w=900&q=80",
  },
];

function formatCategory(value) {
  if (!value) return "Other";
  return value;
}

export default function FeaturedProducts({ activeCategory, onCategoryChange, onInquire }) {
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const q = query(collection(db, "products"), where("status", "!=", "deleted"));
        const snap = await getDocs(q);
        const items = snap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          });

        if (mounted && items.length > 0) {
          setProducts(items);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError("Unable to load specimens at this time.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => {
      const category = (product.category || "").toLowerCase();
      if (activeCategory === "Quartz") return category.includes("quartz");
      return category.includes(activeCategory.toLowerCase());
    });
  }, [activeCategory, products]);

  return (
    <section id="products" className="rounded-[2rem] border border-line bg-surface p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">COLLECTION</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Handpicked Specimens</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onCategoryChange(tab)}
              className={`rounded-full px-4 py-2 text-sm transition ${activeCategory === tab ? "border-b-2 border-gold text-gold" : "text-white/70 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="animate-pulse rounded-3xl bg-surface-2 p-6">
              <div className="mb-4 h-56 rounded-3xl bg-slate-700" />
              <div className="mb-3 h-4 w-3/4 rounded-full bg-slate-600" />
              <div className="mb-3 h-3 w-1/2 rounded-full bg-slate-600" />
              <div className="mb-5 h-10 rounded-full bg-slate-600" />
              <div className="h-11 rounded-full bg-slate-600" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-black/40 p-12 text-center">
          <p className="text-lg font-semibold text-white">New specimens arriving soon.</p>
          <p className="mt-3 text-sm text-white/70">
            Follow us on Instagram for daily updates.
          </p>
          <a
            href="https://instagram.com/artistic_fine_minerals"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            View Instagram
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-line bg-ink p-4 transition hover:border-gold/40 sm:p-5">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-surface-2">
                <img
                  src={product.coverImageUrl || "https://via.placeholder.com/640x640?text=Specimen"}
                  alt={product.title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = product.fallbackImageUrl || "https://via.placeholder.com/640x640?text=Specimen";
                  }}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold">
                  {formatCategory(product.category)}
                </span>
                {product.status?.toLowerCase() === "sold" && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
                    SOLD
                  </span>
                )}
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-display font-semibold text-white">{product.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-gold" />
                  {product.origin || "Pakistan"}
                </p>
                <div className="mt-5 space-y-2 text-sm text-white/80">
                  {product.pricePKR && <p>PKR {product.pricePKR}</p>}
                  {product.priceUSD && <p>USD {product.priceUSD}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onInquire(product.title)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-gold px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink"
              >
                Inquire to Buy
              </button>
            </article>
          ))}
        </div>
      )}

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
    </section>
  );
}
