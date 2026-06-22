import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatWidget } from "../components/ChatWidget";
import { ArrowUpRight } from "lucide-react";

export default function ListingDetail() {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ref = doc(db, "listings", listingId);
        const snap = await getDoc(ref);
        if (cancelled) return;
        if (!snap.exists()) {
          setListing(null);
          return;
        }
        setListing({ id: snap.id, ...snap.data() });
      } catch (e) {
        console.error(e);
        if (!cancelled) setListing(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [listingId]);

  const header = useMemo(() => {
    if (!listing) return null;
    return (
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="lg:w-1/2">
          <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-line bg-white/50">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center px-4">
                <div className="mx-auto w-12 h-12 rounded-xl bg-ink/5 border border-line flex items-center justify-center text-ink">
                  <span className="font-mono">IMG</span>
                </div>
                <div className="mt-3 text-slate/60 text-sm">Preview unavailable</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-white/70 border border-line rounded-full px-3 py-1.5">
            <span className="font-mono text-[11px] text-slate tracking-wide">{listing.category}</span>
            <span className="font-mono text-xs text-navy">{listing.price}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight mt-4">
            {listing.title}
          </h1>
          <p className="mt-4 text-slate leading-relaxed">{listing.description}</p>

          <div className="mt-6 pt-6 border-t border-line">
            <p className="font-mono text-xs text-slate/80">
              {listing.shopName ? `Sold on: ${listing.shopName}` : "Seller"}
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-display text-lg text-ink font-semibold">{listing.shopName || listing.sellerName || "Seller"}</p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={listing.shopLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring ${!listing.shopLink ? "opacity-50 pointer-events-none" : ""}`}
                >
                  Visit Shop <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="mt-2">
                <ChatWidget listingId={listing.id} listingTitle={listing.title} sellerId={listing.sellerId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [listing]);

  return (
    <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="text-slate">Loading listing...</div>
        ) : listing ? (
          header
        ) : (
          <div className="bg-white/70 border border-line rounded-xl p-8 text-center">
            <p className="font-display text-lg text-ink">Listing not found.</p>
            <a
              href="/marketplace"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring"
            >
              Back to marketplace <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

