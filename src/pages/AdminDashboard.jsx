import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({ sellers: 0, listings: 0, conversations: 0, admins: 0 });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const [sellersSnap, listingsSnap, conversationsSnap, adminsSnap] = await Promise.all([
          getDocs(collection(db, "sellers")),
          getDocs(collection(db, "listings")),
          getDocs(collection(db, "conversations")),
          getDocs(collection(db, "admins")),
        ]);

        if (!mounted) return;
        setCounts({
          sellers: sellersSnap.size,
          listings: listingsSnap.size,
          conversations: conversationsSnap.size,
          admins: adminsSnap.size,
        });
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError("Failed to load admin data.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const cards = useMemo(
    () => [
      { label: "Admins", value: counts.admins },
      { label: "Sellers", value: counts.sellers },
      { label: "Listings", value: counts.listings },
      { label: "Conversations", value: counts.conversations },
    ],
    [counts]
  );

  return (
    <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-xs text-cobalt tracking-widest">ADMIN DASHBOARD</p>
            <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Manage the marketplace</h1>
            <p className="text-slate text-sm mt-2">Overview dashboard (starter). Next step: approvals & moderation tools.</p>
          </div>
        </header>

        {error ? (
          <div className="bg-amber/10 border border-amber/30 text-amber px-4 py-3 rounded-xl text-sm font-mono">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-slate">Loading…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((c) => (
              <div key={c.label} className="bg-white/70 backdrop-blur border border-line rounded-xl p-5">
                <p className="font-mono text-xs text-cobalt tracking-widest">{c.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">{c.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="font-mono text-xs text-cobalt tracking-widest">Next moderation tools</p>
            <span className="text-slate text-sm font-mono">Roadmap</span>
          </div>

          <ul className="list-disc pl-5 text-slate text-sm space-y-2">
            <li>Admin-controlled seller approvals / suspensions</li>
            <li>Listing moderation (approve/remove)</li>
            <li>Conversation viewer + message search</li>
            <li>Audit logs (who did what and when)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

