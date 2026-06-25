import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";




export default function SellerMessagesTab({ uid }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // For now implement only the conversations list; full thread UI will be added next step.
  useEffect(() => {
    const convRef = collection(db, "conversations");
    const q = query(convRef, where("sellerId", "==", uid));

    return onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Most recent first by lastMessageAt (serverTimestamp supported, but sort client-side)
      docs.sort((a, b) => (b.lastMessageAt?.seconds || 0) - (a.lastMessageAt?.seconds || 0));
      setConversations(docs);
    });
  }, [uid]);

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white/70 backdrop-blur border border-line rounded-xl p-5">
        <p className="font-mono text-xs text-cobalt tracking-widest">Conversations</p>
        <div className="mt-4 space-y-3">
          {conversations.length === 0 ? (
            <div className="text-slate text-sm">No conversations yet.</div>
          ) : (
            conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={
                  activeId === c.id
                    ? "w-full text-left bg-cobalt/10 border border-cobalt/40 rounded-xl p-3 focus-ring"
                    : "w-full text-left bg-white/50 border border-line rounded-xl p-3 hover:bg-white/70 focus-ring"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display font-semibold text-ink">{c.buyerName || "Buyer"}</p>
                  {c.unreadCount > 0 ? (
                    <span className="text-xs font-mono bg-amber text-ink px-2 py-0.5 rounded-full">
                      {c.unreadCount}
                    </span>
                  ) : null}
                </div>
                <p className="font-mono text-xs text-slate mt-1">{c.listingTitle || "Listing"}</p>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-3 bg-white/70 backdrop-blur border border-line rounded-xl p-5">
        {activeId ? (
          <div className="text-slate text-sm">
            Thread view will be implemented next (messages real-time + seller replies).
          </div>
        ) : (
          <div className="text-slate text-sm">Select a conversation to view messages.</div>
        )}
      </div>
    </div>
  );
}

