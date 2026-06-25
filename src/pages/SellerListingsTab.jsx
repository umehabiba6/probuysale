import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { Pencil, Trash } from "lucide-react";

const CATEGORIES = [
  "Flutter / Mobile Apps",
  "React / Web Development",
  "AI & ML Services",
  "UI Kits & Templates",
  "Flutter Ebooks",
  "Python Ebooks",
  "C++ Ebooks",
  "English Learning Ebooks",
  "Kids Ebooks",
  "Graphic Design",
  "WordPress & Shopify",
  "Video & Animation",
  "Other Digital Products",
];

export default function SellerListingsTab({ uid }) {
  const [sellerName, setSellerName] = useState("");
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Flutter / Mobile Apps",
    shopLink: "",
    shopName: "",
  });

  const PRICE_PLACEHOLDER = "e.g., $25, Free, Contact for quote";
  const SHOP_LINK_PLACEHOLDER = "https://your-store.com/product";
  const SHOP_NAME_PLACEHOLDER = "e.g., Amazon, Shopify Store, Your Website";

  useEffect(() => {
    let unsub;
    (async () => {
      const sellerRef = doc(db, "sellers", uid);
      const snap = await getDoc(sellerRef);
      setSellerName(snap.exists() ? snap.data().name || "" : "");
    })();

    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("sellerId", "==", uid), orderBy("createdAt", "desc"));
    unsub = onSnapshot(q, (snap) => {
      setListings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      if (unsub) unsub();
    };
  }, [uid]);

  function startEdit(l) {
    setEditingId(l.id);
    setForm({
      title: l.title || "",
      description: l.description || "",
      price: l.price || "",
      category: l.category || "Flutter / Mobile Apps",
      shopLink: l.shopLink || "",
      shopName: l.shopName || "",
    });
  }

  async function submit(e) {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: form.price.trim(),
      category: form.category,
      shopLink: form.shopLink.trim(),
      shopName: form.shopName.trim() || undefined,
      sellerId: uid,
      sellerName: sellerName || "",
      createdAt: editingId ? undefined : serverTimestamp(),
    };

    if (editingId) {
      const ref = doc(db, "listings", editingId);
      await updateDoc(ref, payload);
    } else {
      const ref = doc(collection(db, "listings"));
      await setDoc(ref, { ...payload, createdAt: serverTimestamp() });
    }

    setEditingId(null);
    setForm({ title: "", description: "", price: "", category: "Flutter / Mobile Apps", shopLink: "", shopName: "" });
  }

  async function remove(id) {
    const ok = window.confirm("Delete this listing? This cannot be undone.");
    if (!ok) return;
    await deleteDoc(doc(db, "listings", id));
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white/70 backdrop-blur border border-line rounded-xl p-5">
        <p className="font-mono text-xs text-cobalt tracking-widest">{editingId ? "Edit listing" : "Add new listing"}</p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-slate mb-1">Title</label>
            <input className="form-input text-ink" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1">Description</label>
            <textarea className="form-input text-ink min-h-28" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate mb-1">Price / Starting from</label>
            <input
              className="form-input-ink form-input"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              required
              placeholder={PRICE_PLACEHOLDER}
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1">Category</label>
            <select
              className="form-input-ink form-input"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-ink text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div>
            <label className="block text-sm text-slate mb-1">Shop / Product Link</label>
            <input
              className="form-input-ink form-input"
              value={form.shopLink}
              onChange={(e) => setForm((f) => ({ ...f, shopLink: e.target.value }))}
              required
              type="url"
              placeholder={SHOP_LINK_PLACEHOLDER}
            />
          </div>

          <div>
            <label className="block text-sm text-slate mb-1">Your Website / Shop Name (optional)</label>
            <input
              className="form-input-ink form-input"
              value={form.shopName}
              onChange={(e) => setForm((f) => ({ ...f, shopName: e.target.value }))}
              placeholder={SHOP_NAME_PLACEHOLDER}
            />
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring"
              type="submit"
            >
              {editingId ? "Save" : "Add listing"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    description: "",
                    price: "",
                    category: "Flutter / Mobile Apps",
                    shopLink: "",
                    shopName: "",
                  });
                }}
                className="bg-white/70 border border-line text-ink text-sm font-medium px-4 py-3 rounded-md transition-colors focus-ring"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="font-mono text-xs text-cobalt tracking-widest">Your listings</p>
            <span className="text-slate text-sm font-mono">{listings.length} total</span>
          </div>

          {listings.length === 0 ? (
            <div className="text-slate">No listings yet.</div>
          ) : (
            <div className="space-y-4">
              {listings.map((l) => (
                <div key={l.id} className="border border-line rounded-xl p-4 bg-white/50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display font-semibold text-ink">{l.title}</p>
                      <p className="font-mono text-xs text-slate mt-1">{l.category} • {l.price}</p>
                      <p className="text-slate text-sm mt-2 line-clamp-2">{l.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(l)}
                        className="p-2 rounded-md bg-white/70 hover:bg-white border border-line focus-ring text-ink"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(l.id)}
                        className="p-2 rounded-md bg-white/70 hover:bg-white border border-line focus-ring text-amber"
                        aria-label="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

