import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowUpRight, Search, ArrowDownUp } from "lucide-react";
import { Helmet } from "react-helmet-async";


const CATEGORIES = [
  "All",
  "UI Kits & Templates",
  "Flutter Ebooks",
  "Python Ebooks",
  "C++ Ebooks",
  "English Learning Ebooks",
  "Kids Ebooks",
  "Flutter / Mobile Apps",
  "React / Web Development",
  "AI & ML Services",
  "Graphic Design",
  "WordPress & Shopify",
  "Video & Animation",
  "Other Digital Products",
];

function formatCategoryTag(category) {
  // marketplace categories requested: UI Kits, Ebooks, Apps/Tools, Courses, Services, Other
  // store as-is in Firestore.
  return category;
}

export default function Marketplace() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");


  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (cancelled) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setListings(docs);
      } catch (e) {
        console.error(e);
        if (!cancelled) setListings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let result = listings;

    if (category !== "All") {
      result = result.filter((l) => l.category === category);
    }

    const s = search.trim().toLowerCase();
    if (s) {
      result = result.filter((l) => {
        const haystack = [l.title, l.description, l.shopName]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(s);
      });
    }

    // Sort
    const copy = [...result];
    if (sort === "price_asc") {
      copy.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price_desc") {
      copy.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    // newest keeps Firestore order (createdAt desc)
    return copy;
  }, [listings, category, search, sort]);


  return (
    <>
      <Helmet>
        <title>Digital Products Marketplace — ProBuySale</title>
        <meta
          name="description"
          content="Browse Flutter ebooks, Python guides, C++ tutorials, kids ebooks, English learning books, UI kits and digital services from independent sellers worldwide."
        />
      </Helmet>
      <section className="bg-mist pb-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">



        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-cobalt tracking-widest mb-3">MARKETPLACE</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              Browse products from independent sellers
            </h1>
            <p className="mt-4 text-slate leading-relaxed">
              Find UI kits, ebooks, apps/tools, courses, services, and more — then chat
              directly with the seller.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate mb-2 font-mono">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/70" size={16} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type title, seller or description..."
                    className="w-full form-input text-ink bg-white/10 border border-line rounded-md pl-9 pr-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate mb-2 font-mono">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full form-input text-ink bg-white/10 border border-line rounded-md px-4 py-2"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-ink text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm text-slate mb-2 font-mono">Sort</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full form-input text-ink bg-white/10 border border-line rounded-md px-4 py-2"
                  >
                    <option value="newest" className="bg-ink text-white">
                      Newest
                    </option>
                    <option value="price_asc" className="bg-ink text-white">
                      Price: Low to High
                    </option>
                    <option value="price_desc" className="bg-ink text-white">
                      Price: High to Low
                    </option>
                  </select>
                  <div className="flex items-center gap-2 text-sm text-slate/80 sm:justify-end">
                    <ArrowDownUp size={16} />
                    <span className="font-mono">{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {loading ? (
          <div className="text-slate">Loading listings...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/70 border border-line rounded-xl p-8 text-center">
            <p className="font-display text-lg text-ink">No listings yet — be the first to sell!</p>
            <Link
              to="/sell/signup"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring"
            >
              Become a seller <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((l) => (
              <Link
                key={l.id}
                to={`/marketplace/${l.id}`}
                className="group relative overflow-hidden bg-white/70 backdrop-blur border border-line rounded-xl p-6 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]"
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-line bg-white/50">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="mx-auto w-12 h-12 rounded-xl bg-ink/5 border border-line flex items-center justify-center text-ink">
                        <span className="font-mono">IMG</span>
                      </div>
                      <div className="mt-3 text-slate/60 text-sm">Preview unavailable</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-slate tracking-wide">
                    {formatCategoryTag(l.category)}
                  </span>
                  <span className="font-mono text-xs text-navy">{l.price}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-ink mt-3 group-hover:text-cobalt transition-colors">
                  {l.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mt-2 line-clamp-2">
                  {l.description}
                </p>

                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-slate/80">
                    {l.shopName ? `Sold on: ${l.shopName}` : (l.sellerName || "Seller")}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-cobalt">
                    Buy on {l.shopName || "Seller"} 
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      </section>
    </>

  );
}

