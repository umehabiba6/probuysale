import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const CATEGORIES = [
  "UI Kits",
  "Ebooks",
  "Apps/Tools",
  "Courses",
  "Services",
  "Other",
];

export default function SellerSignup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(
        doc(db, "sellers", uid),
        {
          uid,
          name: name.trim(),
          email,
          contact: contact.trim(),
          createdAt: serverTimestamp(),
        },
        { merge: false }
      );

      nav("/sell/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-7">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-4">SELL ON PROBUYSALE</p>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Create seller account</h1>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate mb-1">Shop / seller name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="form-input-ink form-input text-ink w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input text-ink w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input text-ink w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate mb-1">Contact method (WhatsApp number or email)</label>
              <input value={contact} onChange={(e) => setContact(e.target.value)} required className="form-input text-ink w-full" placeholder="e.g., +1 555 0100 or seller@example.com" />
            </div>

            {error && <div className="text-amber text-sm font-mono">{error}</div>}

            <button
              disabled={loading}
              className="w-full bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring disabled:opacity-50"
              type="submit"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>

          <p className="mt-4 text-slate text-sm">
            Already have an account?{" "}
            <a className="text-cobalt hover:text-navy focus-ring" href="/sell/login">Log in</a>
          </p>
        </div>
      </div>
    </section>
  );
}

