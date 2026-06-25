import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

import SellerListingsTab from "./SellerListingsTab";
import SellerMessagesTab from "./SellerMessagesTab";

export default function SellerDashboard() {
  const [uid, setUid] = useState(null);
  const [tab, setTab] = useState("listings");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUid(u?.uid || null);
    });
    return () => unsub();
  }, []);

  return (
    <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-xs text-cobalt tracking-widest">SELLER DASHBOARD</p>
            <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Manage your listings & messages</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await signOut(auth);
              }}
              className="bg-ink/95 hover:bg-ink text-white text-sm font-medium px-4 py-2 rounded-md transition-colors focus-ring border border-white/10"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab("listings")}
            className={
              tab === "listings"
                ? "bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md text-sm font-medium focus-ring"
                : "bg-white/70 border border-line text-ink px-4 py-2 rounded-md text-sm font-medium focus-ring"
            }
          >
            My Listings
          </button>
          <button
            onClick={() => setTab("messages")}
            className={
              tab === "messages"
                ? "bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md text-sm font-medium focus-ring"
                : "bg-white/70 border border-line text-ink px-4 py-2 rounded-md text-sm font-medium focus-ring"
            }
          >
            Messages
          </button>
        </div>

        {!uid ? (
          <div className="text-slate">Loading seller session…</div>
        ) : tab === "listings" ? (
          <SellerListingsTab uid={uid} />
        ) : (
          <SellerMessagesTab uid={uid} />
        )}
      </div>
    </section>
  );
}

