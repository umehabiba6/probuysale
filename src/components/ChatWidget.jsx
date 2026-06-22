import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

export function ChatWidget({ listingId, listingTitle, sellerId }) {
  const [buyerUid, setBuyerUid] = useState(null);
  const [buyerName, setBuyerName] = useState(
    () => localStorage.getItem("buyerName") || ""
  );
  const [open, setOpen] = useState(false);
  const [namePrompt, setNamePrompt] = useState(
    () => !localStorage.getItem("buyerName")
  );

  const [conversation, setConversation] = useState(null); // {id, ...data}
  const [messages, setMessages] = useState([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setBuyerUid(u.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!open || !conversation) return;

    const messagesRef = collection(db, "conversations", conversation.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    return onSnapshot(q, (snap) => {
      const m = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(m);
    });
  }, [open, conversation]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function ensureConversation() {
    if (!buyerUid) return;
    setLoadingConversation(true);
    try {
      // Reuse conversation: buyerUid + listingId
      const convQ = query(
        collection(db, "conversations"),
        where("buyerUid", "==", buyerUid),
        where("listingId", "==", listingId)
      );
      const existing = await getDocs(convQ);
      if (!existing.empty) {
        const first = existing.docs[0];
        setConversation({ id: first.id, ...first.data() });
        return;
      }

      const buyerDisplayName = (buyerName || "").trim() || "Buyer";

      const convDoc = await addDoc(collection(db, "conversations"), {
        sellerId,
        listingId,
        listingTitle,
        buyerUid,
        buyerName: buyerDisplayName,
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
      });

      setConversation({
        id: convDoc.id,
        sellerId,
        listingId,
        listingTitle,
        buyerUid,
        buyerName: buyerDisplayName,
      });
    } finally {
      setLoadingConversation(false);
    }
  }

  const chatTitle = useMemo(
    () => (listingTitle ? `Chat about: ${listingTitle}` : "Chat"),
    [listingTitle]
  );

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring w-full lg:w-auto"
      >
        Chat with Seller
      </button>

      {open && (
        <div className="mt-4 bg-ink/95 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 border-b border-white/10">
            <div>
              <p className="font-display text-white text-sm font-semibold">{chatTitle}</p>
              <p className="font-mono text-xs text-white/50">Messages are real-time</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white focus-ring rounded p-2"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {namePrompt ? (
            <div className="p-4">
              <label className="block text-xs text-white/70 font-mono mb-2">Your name</label>
              <input
                className="w-full form-input"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="e.g., John"
              />
              <button
                onClick={async () => {
                  const trimmed = buyerName.trim();
                  if (!trimmed) return;
                  localStorage.setItem("buyerName", trimmed);
                  setNamePrompt(false);
                  await ensureConversation();
                }}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring"
              >
                Start chat
              </button>
            </div>
          ) : (
            <div>
              {!conversation && (
                <div className="p-4">
                  <button
                    onClick={async () => {
                      await ensureConversation();
                    }}
                    className="w-full bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus-ring"
                    disabled={loadingConversation}
                  >
                    {loadingConversation ? "Preparing chat…" : "Open conversation"}
                  </button>
                </div>
              )}

              {conversation && (
                <div>
                  <div className="p-4 h-72 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="text-white/60 text-sm">No messages yet. Say hello 👋</div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((m) => {
                          const isMine = m.senderUid === buyerUid;
                          return (
                            <div key={m.id} className={isMine ? "flex justify-end" : "flex justify-start"}>
                              <div
                                className={
                                  isMine
                                    ? "max-w-[85%] bg-cobalt text-white rounded-lg px-3 py-2"
                                    : "max-w-[85%] bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10"
                                }
                              >
                                <p className="text-xs text-white/80 font-mono">
                                  {isMine ? "You" : m.senderName || "Other"}
                                </p>
                                <p className="text-sm leading-relaxed">{m.text}</p>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={endRef} />
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 form-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message…"
                      />
                      <button
                        disabled={!text.trim()}
                        onClick={async () => {
                          const msg = text.trim();
                          if (!msg || !conversation) return;
                          setText("");

                          const parentRef = doc(db, "conversations", conversation.id);
                          await addDoc(collection(parentRef, "messages"), {
                            text: msg,
                            senderUid: buyerUid,
                            senderName: buyerName || "Buyer",
                            createdAt: serverTimestamp(),
                          });

                          await updateDoc(parentRef, { lastMessageAt: serverTimestamp() });
                        }}
                        className="px-4 py-2 rounded-md bg-cobalt hover:bg-cobalt-light text-white disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
                      >
                        Send
                      </button>
                    </div>
                    <p className="mt-2 text-[11px] text-white/50 font-mono">
                      Keep it respectful. No payments inside chat.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

