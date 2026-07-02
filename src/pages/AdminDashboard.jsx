import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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
  "Business",
  "Startup Ideas",
  "Other Digital Products",
];

function safeTrim(v) {
  return typeof v === "string" ? v.trim() : "";
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({ sellers: 0, listings: 0, conversations: 0, admins: 0 });

  // Admin Listing Management
  const [adminTab, setAdminTab] = useState("listings");
  const [listings, setListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [listingForm, setListingForm] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    category: "Flutter / Mobile Apps",
    shopLink: "",
    shopName: "",
    sellerId: "",
    sellerName: "",
    mode: "create", // create | edit
  });
  const [busy, setBusy] = useState(false);

  async function loadListings() {
    setListingsLoading(true);
    setError("");
    try {
      const listingsSnap = await getDocs(collection(db, "listings"));
      setListings(
        listingsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    } catch (e) {
      console.error(e);
      setError("Failed to load listings.");
      setListings([]);
    } finally {
      setListingsLoading(false);
    }
  }


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

  async function handleLoadListingsTab() {
    if (listings.length === 0 && !listingsLoading) {
      await loadListings();
    }
  }

  async function handleSubmitListing(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const payload = {
        title: safeTrim(listingForm.title),
        description: safeTrim(listingForm.description),
        price: safeTrim(listingForm.price),
        category: listingForm.category,
        shopLink: safeTrim(listingForm.shopLink),
        shopName: safeTrim(listingForm.shopName) || undefined,
        sellerId: listingForm.sellerId || undefined,
        sellerName: safeTrim(listingForm.sellerName) || undefined,
        createdAt: serverTimestamp(),
      };

      // Live website Products expects:
      // - collection: "products"
      // - status: "published"
      // - pricePKR / priceUSD / gumroadLink / previewUrl / imageUrl
      // We map Admin form fields into those fields.
      const priceStr = safeTrim(listingForm.price);
      const parsed = {
        pricePKR: "",
        priceUSD: "",
      };
      const usdMatch = priceStr.match(/\$\s*([0-9.,]+)/i);
      const pkrMatch = priceStr.match(/PKR\s*([0-9.,]+)/i);
      // support plain numbers as PKR by default
      const plainNumMatch = !usdMatch && !pkrMatch ? priceStr.match(/([0-9]+[0-9.,]*)/) : null;

      if (usdMatch) parsed.priceUSD = usdMatch[1].replace(/,/g, "");
      if (pkrMatch) parsed.pricePKR = pkrMatch[1].replace(/,/g, "");
      if (!usdMatch && !pkrMatch && plainNumMatch) parsed.pricePKR = plainNumMatch[1].replace(/,/g, "");

      const productPayload = {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        status: "published",
        gumroadLink: payload.shopLink,
        previewUrl: payload.shopName || undefined,
        imageUrl: undefined,
        pricePKR: parsed.pricePKR || undefined,
        priceUSD: parsed.priceUSD || undefined,
        createdAt: serverTimestamp(),
        sellerId: payload.sellerId,
        sellerName: payload.sellerName,
      };

      if (listingForm.mode === "edit" && listingForm.id) {
        // Update listings (admin view)
        const listingRef = doc(db, "listings", listingForm.id);
        await setDoc(
          listingRef,
          {
            ...payload,
            createdAt: undefined,
          },
          { merge: true }
        );

        // Mirror update to products (live view)
        const productRef = doc(db, "products", listingForm.id);
        await setDoc(
          productRef,
          {
            ...productPayload,
            createdAt: undefined,
          },
          { merge: true }
        );
      } else {
        // Create listing + create product with the SAME id so edit/delete stays consistent.
        const listingRef = doc(collection(db, "listings"));
        const productRef = doc(db, "products", listingRef.id);

        // Firestore does NOT allow undefined values for fields.
        // Remove optional fields when empty.
        const clean = (obj) =>
          Object.fromEntries(
            Object.entries(obj).filter(([, v]) => v !== undefined)
          );

        await Promise.all([
          setDoc(listingRef, clean(payload)),
          setDoc(productRef, clean(productPayload)),
        ]);
      }

      setListingForm({
        id: null,
        title: "",
        description: "",
        price: "",
        category: "Flutter / Mobile Apps",
        shopLink: "",
        shopName: "",
        sellerId: "",
        sellerName: "",
        mode: "create",
      });

      await loadListings();
    } catch (e2) {
      console.error(e2);
      setError(e2?.message || "Failed to save listing.");
    } finally {
      setBusy(false);
    }
  }

  async function handleEdit(l) {
    setError("");
    setListingForm({
      id: l.id,
      title: l.title || "",
      description: l.description || "",
      price: l.price || "",
      category: l.category || "Flutter / Mobile Apps",
      shopLink: l.shopLink || "",
      shopName: l.shopName || "",
      sellerId: l.sellerId || "",
      sellerName: l.sellerName || "",
      mode: "edit",
    });
  }

  async function handleDelete(id) {
    const ok = window.confirm(
      "Delete this listing? This cannot be undone."
    );
    if (!ok) return;
    setBusy(true);
    setError("");
    try {
      await deleteDoc(doc(db, "listings", id));
      await loadListings();
      if (listingForm.id === id) {
        setListingForm({
          id: null,
          title: "",
          description: "",
          price: "",
          category: "Flutter / Mobile Apps",
          shopLink: "",
          shopName: "",
          sellerId: "",
          sellerName: "",
          mode: "create",
        });
      }
    } catch (e2) {
      console.error(e2);
      setError(e2?.message || "Failed to delete listing.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-xs text-cobalt tracking-widest">ADMIN PANEL</p>
            <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Manage the marketplace</h1>
            <p className="text-slate text-sm mt-2">Non-coder friendly: Listings add/edit/delete.</p>
          </div>
        </header>

        {error ? (
          <div className="bg-amber/10 border border-amber/30 text-amber px-4 py-3 rounded-xl text-sm font-mono">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="text-slate">Loading…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((c) => (
              <div
                key={c.label}
                className="bg-white/70 backdrop-blur border border-line rounded-xl p-5"
              >
                <p className="font-mono text-xs text-cobalt tracking-widest">
                  {c.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <button
            onClick={async () => {
              setAdminTab("listings");
              await handleLoadListingsTab();
            }}
            className={
              adminTab === "listings"
                ? "bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md text-sm font-medium focus-ring"
                : "bg-white/70 border border-line text-ink px-4 py-2 rounded-md text-sm font-medium focus-ring"
            }
          >
            Manage Listings
          </button>
          <button
            onClick={() => setAdminTab("roadmap")}
            className={
              adminTab === "roadmap"
                ? "bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md text-sm font-medium focus-ring"
                : "bg-white/70 border border-line text-ink px-4 py-2 rounded-md text-sm font-medium focus-ring"
            }
          >
            Roadmap
          </button>
        </div>

        {adminTab === "listings" ? (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-white/70 backdrop-blur border border-line rounded-xl p-5">
              <p className="font-mono text-xs text-cobalt tracking-widest">
                {listingForm.mode === "edit" ? "Edit listing" : "Add new listing"}
              </p>

              <form onSubmit={handleSubmitListing} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm text-slate mb-1">Title</label>
                  <input
                    className="form-input text-ink w-full"
                    value={listingForm.title}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate mb-1">Description</label>
                  <textarea
                    className="form-input text-ink min-h-28 w-full"
                    value={listingForm.description}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, description: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate mb-1">
                      Price / Starting from
                    </label>
                    <input
                      className="form-input text-ink w-full"
                      value={listingForm.price}
                      onChange={(e) =>
                        setListingForm((f) => ({ ...f, price: e.target.value }))
                      }
                      required
                      placeholder="e.g., $25 or Free"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate mb-1">
                      Category
                    </label>
                    <select
                      className="form-input text-ink w-full"
                      value={listingForm.category}
                      onChange={(e) =>
                        setListingForm((f) => ({ ...f, category: e.target.value }))
                      }
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
                  <label className="block text-sm text-slate mb-1">
                    Shop / Product Link
                  </label>
                  <input
                    className="form-input text-ink w-full"
                    value={listingForm.shopLink}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, shopLink: e.target.value }))
                    }
                    required
                    type="url"
                    placeholder="https://your-store.com/product"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate mb-1">
                    Your Website / Shop Name (optional)
                  </label>
                  <input
                    className="form-input text-ink w-full"
                    value={listingForm.shopName}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, shopName: e.target.value }))
                    }
                    placeholder="e.g., Amazon / Shopify"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate mb-1">Seller Id (optional)</label>
                    <input
                      className="form-input text-ink w-full"
                      value={listingForm.sellerId}
                      onChange={(e) =>
                        setListingForm((f) => ({ ...f, sellerId: e.target.value }))
                      }
                      placeholder="uid"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate mb-1">Seller Name (optional)</label>
                    <input
                      className="form-input text-ink w-full"
                      value={listingForm.sellerName}
                      onChange={(e) =>
                        setListingForm((f) => ({ ...f, sellerName: e.target.value }))
                      }
                      placeholder="Habiba"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring disabled:opacity-50"
                    type="submit"
                    disabled={busy}
                  >
                    {busy
                      ? "Saving…"
                      : listingForm.mode === "edit"
                        ? "Save changes"
                        : "Add listing"}
                  </button>

                  {listingForm.mode === "edit" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        setListingForm({
                          id: null,
                          title: "",
                          description: "",
                          price: "",
                          category: "Flutter / Mobile Apps",
                          shopLink: "",
                          shopName: "",
                          sellerId: "",
                          sellerName: "",
                          mode: "create",
                        })
                      }
                      className="bg-white/70 border border-line text-ink text-sm font-medium px-4 py-3 rounded-md transition-colors focus-ring disabled:opacity-50"
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
                  <p className="font-mono text-xs text-cobalt tracking-widest">All listings</p>
                  <span className="text-slate text-sm font-mono">
                    {listingsLoading ? "Loading…" : `${listings.length} total`}
                  </span>
                </div>

                {listings.length === 0 && !listingsLoading ? (
                  <div className="text-slate text-sm">No listings yet.</div>
                ) : null}

                <div className="space-y-4">
                  {listings.map((l) => (
                    <div
                      key={l.id}
                      className="border border-line rounded-xl p-4 bg-white/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display font-semibold text-ink">
                            {l.title}
                          </p>
                          <p className="font-mono text-xs text-slate mt-1">
                            {l.category} • {l.price}
                          </p>
                          <p className="text-slate text-sm mt-2 line-clamp-2">
                            {l.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(l)}
                            className="p-2 rounded-md bg-white/70 hover:bg-white border border-line focus-ring text-ink"
                            aria-label="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(l.id)}
                            className="p-2 rounded-md bg-white/70 hover:bg-white border border-line focus-ring text-amber"
                            aria-label="Delete"
                            disabled={busy}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="font-mono text-xs text-cobalt tracking-widest">
                Next moderation tools
              </p>
              <span className="text-slate text-sm font-mono">Roadmap</span>
            </div>
            <ul className="list-disc pl-5 text-slate text-sm space-y-2">
              <li>Admin-controlled seller approvals / suspensions</li>
              <li>Listing moderation (approve/remove)</li>
              <li>Conversation viewer + message search</li>
              <li>Audit logs (who did what and when)</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

