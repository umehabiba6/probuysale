import { useEffect, useMemo, useState } from "react";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";

const PRODUCT_CATEGORIES = ["Tourmaline", "Aquamarine", "Emerald", "Smoky Quartz", "Fluorite", "Other"];
const CONDITION_OPTIONS = ["Excellent", "Very Good", "Good", "Display Grade"];
const STATUS_OPTIONS = ["Available", "Sold", "Reserved", "Draft"];

const emptyProduct = {
  id: null,
  specimenName: "",
  origin: "",
  category: "Tourmaline",
  description: "",
  crystalSpecies: "",
  size: "",
  weight: "",
  condition: "Excellent",
  pricePKR: "",
  priceUSD: "",
  coverImageUrl: "",
  additionalImageUrls: "",
  certificateAvailable: false,
  status: "Available",
  mode: "create",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [productsSnap, inquiriesSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "inquiries")),
        ]);

        if (!mounted) return;

        setProducts(
          productsSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((product) => !product.status || product.status.toLowerCase() !== "deleted")
            .sort((a, b) => {
              const aTime = a.createdAt?.toMillis?.() || 0;
              const bTime = b.createdAt?.toMillis?.() || 0;
              return bTime - aTime;
            })
        );
        setInquiries(
          inquiriesSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => {
              const aTime = a.createdAt?.toMillis?.() || 0;
              const bTime = b.createdAt?.toMillis?.() || 0;
              return bTime - aTime;
            })
        );
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load admin data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const activeProducts = useMemo(() => products, [products]);

  function updateForm(field) {
    return (event) => {
      const value = field === "certificateAvailable" ? event.target.checked : event.target.value;
      setProductForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const id = productForm.id || doc(collection(db, "products")).id;
      const payload = {
        title: productForm.specimenName.trim(),
        origin: productForm.origin.trim(),
        category: productForm.category,
        description: productForm.description.trim(),
        crystalSpecies: productForm.crystalSpecies.trim(),
        size: productForm.size.trim(),
        weight: productForm.weight.trim(),
        condition: productForm.condition,
        pricePKR: productForm.pricePKR.trim(),
        priceUSD: productForm.priceUSD.trim(),
        coverImageUrl: productForm.coverImageUrl.trim(),
        additionalImageUrls: productForm.additionalImageUrls
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
        certificateAvailable: productForm.certificateAvailable,
        status: productForm.status,
        createdAt: serverTimestamp(),
      };

      const productRef = doc(db, "products", id);
      await setDoc(productRef, payload, { merge: true });
      setProductForm(emptyProduct);
      await refreshProducts();
      setActiveTab("products");
    } catch (err) {
      console.error(err);
      setError("Failed to save specimen.");
    } finally {
      setSaving(false);
    }
  }

  async function refreshProducts() {
    try {
      const productsSnap = await getDocs(collection(db, "products"));
      setProducts(
        productsSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => !product.status || product.status.toLowerCase() !== "deleted")
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          })
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditProduct(product) {
    setProductForm({
      id: product.id,
      specimenName: product.title || "",
      origin: product.origin || "",
      category: product.category || "Tourmaline",
      description: product.description || "",
      crystalSpecies: product.crystalSpecies || "",
      size: product.size || "",
      weight: product.weight || "",
      condition: product.condition || "Excellent",
      pricePKR: product.pricePKR || "",
      priceUSD: product.priceUSD || "",
      coverImageUrl: product.coverImageUrl || "",
      additionalImageUrls: (product.additionalImageUrls || []).join(", "),
      certificateAvailable: Boolean(product.certificateAvailable),
      status: product.status || "Available",
      mode: "edit",
    });
  }

  async function handleDeleteProduct(productId) {
    const confirmed = window.confirm("Delete this specimen? This action cannot be undone.");
    if (!confirmed) return;
    setSaving(true);
    setError("");

    try {
      await deleteDoc(doc(db, "products", productId));
      await refreshProducts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete specimen.");
    } finally {
      setSaving(false);
    }
  }

  async function markResponded(inquiryId) {
    try {
      await updateDoc(doc(db, "inquiries", inquiryId), { responded: true });
      setInquiries((prev) => prev.map((item) => (item.id === inquiryId ? { ...item, responded: true } : item)));
    } catch (err) {
      console.error(err);
      setError("Could not mark inquiry as responded.");
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      window.location.href = "/admin/login";
    } catch (err) {
      console.error(err);
      setError("Unable to sign out right now.");
    }
  }

  return (
    <div className="min-h-screen bg-ink px-6 py-10 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Artistic Fine Art Admin</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === "products" ? "bg-gold text-ink" : "border border-white/10 text-white hover:bg-white/5"}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              type="button"
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === "inquiries" ? "bg-gold text-ink" : "border border-white/10 text-white hover:bg-white/5"}`}
              onClick={() => setActiveTab("inquiries")}
            >
              Inquiries
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-line bg-surface p-10 text-center text-white/70">Loading admin data…</div>
        ) : (
          <>
            {error && <div className="mb-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

            {activeTab === "products" ? (
              <div className="space-y-10">
                <div className="rounded-[2rem] border border-line bg-surface p-8">
                  <h2 className="text-2xl font-semibold text-white">Add / Edit Specimen</h2>
                  <form onSubmit={handleSaveProduct} className="mt-8 grid gap-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <label className="block text-sm text-white/80">
                        Specimen Name*
                        <input
                          required
                          value={productForm.specimenName}
                          onChange={updateForm("specimenName")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Origin / Location
                        <input
                          value={productForm.origin}
                          onChange={updateForm("origin")}
                          className="form-input mt-2"
                        />
                      </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <label className="block text-sm text-white/80">
                        Category
                        <select
                          value={productForm.category}
                          onChange={updateForm("category")}
                          className="form-input mt-2"
                        >
                          {PRODUCT_CATEGORIES.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm text-white/80">
                        Condition
                        <select
                          value={productForm.condition}
                          onChange={updateForm("condition")}
                          className="form-input mt-2"
                        >
                          {CONDITION_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block text-sm text-white/80">
                      Description
                      <textarea
                        rows={4}
                        value={productForm.description}
                        onChange={updateForm("description")}
                        className="form-input mt-2 min-h-[140px]"
                      />
                    </label>

                    <div className="grid gap-6 lg:grid-cols-3">
                      <label className="block text-sm text-white/80">
                        Crystal Species
                        <input
                          value={productForm.crystalSpecies}
                          onChange={updateForm("crystalSpecies")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Size
                        <input
                          value={productForm.size}
                          onChange={updateForm("size")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Weight
                        <input
                          value={productForm.weight}
                          onChange={updateForm("weight")}
                          className="form-input mt-2"
                        />
                      </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                      <label className="block text-sm text-white/80">
                        Price PKR
                        <input
                          value={productForm.pricePKR}
                          onChange={updateForm("pricePKR")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Price USD
                        <input
                          value={productForm.priceUSD}
                          onChange={updateForm("priceUSD")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Status
                        <select
                          value={productForm.status}
                          onChange={updateForm("status")}
                          className="form-input mt-2"
                        >
                          {STATUS_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <label className="block text-sm text-white/80">
                        Cover Image URL
                        <input
                          value={productForm.coverImageUrl}
                          onChange={updateForm("coverImageUrl")}
                          className="form-input mt-2"
                        />
                      </label>
                      <label className="block text-sm text-white/80">
                        Additional Image URLs (comma separated)
                        <input
                          value={productForm.additionalImageUrls}
                          onChange={updateForm("additionalImageUrls")}
                          className="form-input mt-2"
                        />
                      </label>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <label className="inline-flex items-center gap-3 text-sm text-white/80">
                        <input
                          type="checkbox"
                          checked={productForm.certificateAvailable}
                          onChange={updateForm("certificateAvailable")}
                          className="accent-gold"
                        />
                        Certificate Available
                      </label>
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
                      >
                        {productForm.mode === "edit" ? "Save Changes" : "Add Specimen"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-[2rem] border border-line bg-surface p-8">
                  <h2 className="text-2xl font-semibold text-white">Specimen Listings</h2>
                  <div className="mt-6 space-y-4">
                    {activeProducts.length === 0 ? (
                      <p className="text-white/70">No specimens currently listed.</p>
                    ) : (
                      activeProducts.map((item) => (
                        <div key={item.id} className="rounded-[1.75rem] border border-white/10 bg-ink p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xl font-semibold text-white">{item.title}</p>
                              <p className="mt-1 text-sm text-white/70">{item.category} • {item.origin}</p>
                              <p className="mt-2 text-sm text-white/70">Status: {item.status}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => handleEditProduct(item)}
                                className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(item.id)}
                                className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-line bg-surface p-8">
                <h2 className="text-2xl font-semibold text-white">Inquiries</h2>
                <div className="mt-6 space-y-4">
                  {inquiries.length === 0 ? (
                    <p className="text-white/70">No inquiries yet.</p>
                  ) : (
                    inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="rounded-[1.75rem] border border-white/10 bg-ink p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
                          <div>
                            <p className="text-lg font-semibold text-white">{inquiry.name}</p>
                            <p className="mt-1 text-sm text-white/70">{inquiry.email} • {inquiry.phone || "No phone provided"}</p>
                            <p className="mt-2 text-sm text-white/70">Specimen: {inquiry.specimen || "General inquiry"}</p>
                            <p className="mt-1 text-sm text-white/70">Budget: {inquiry.budget || "Not specified"}</p>
                            <p className="mt-4 text-sm leading-7 text-white/80">{inquiry.message}</p>
                          </div>
                          <div className="flex min-w-[180px] flex-col items-start gap-3 sm:items-end">
                            <p className="text-sm text-white/70">{new Date(inquiry.createdAt?.toDate?.() || Date.now()).toLocaleString()}</p>
                            <button
                              type="button"
                              onClick={() => markResponded(inquiry.id)}
                              disabled={inquiry.responded}
                              className="rounded-full border px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:border-white/20 disabled:text-white/50"
                            >
                              {inquiry.responded ? "Responded" : "Mark as Responded"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
