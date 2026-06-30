import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Helmet } from "react-helmet-async";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Support both "admins" and legacy/alternate collection naming like "main/admins" (case-sensitive).
      // Current code expects role field at the user's document: { role: "admin" }
      const snap = await getDoc(doc(db, "admins", uid));
      const legacySnap = !snap.exists()
        ? await getDoc(doc(db, "main", "admins", uid))
        : null;
      const data = (snap.exists() ? snap.data() : legacySnap?.exists?.() ? legacySnap.data() : null);


      if (data?.role !== "admin") {
        throw new Error("This account is not an admin.");
      }

      nav("/admin");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login — ProBuySale</title>
        <meta name="description" content="Login to ProBuySale admin panel." />
      </Helmet>

      <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-7">
            <p className="font-mono text-xs text-cobalt tracking-widest mb-4">ADMIN PANEL</p>
            <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Admin login</h1>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm text-slate mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input text-ink w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-slate mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input text-ink w-full"
                />
              </div>

              {error && <div className="text-amber text-sm font-mono">{error}</div>}

              <button
                disabled={loading}
                className="w-full bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium py-3 rounded-md transition-colors focus-ring disabled:opacity-50"
                type="submit"
              >
                {loading ? "Signing in…" : "Log in"}
              </button>
            </form>

            <p className="mt-4 text-slate text-sm">
              Go to seller panel?{" "}
              <a className="text-cobalt hover:text-navy focus-ring" href="/sell/login">
                Seller login
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

