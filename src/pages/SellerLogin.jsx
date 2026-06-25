import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Helmet } from "react-helmet-async";

export default function SellerLogin() {
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
      await signInWithEmailAndPassword(auth, email, password);
      nav("/sell/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Seller Login — ProBuySale</title>
        <meta name="description" content="Login to manage your ProBuySale seller account, listings, and messages." />
      </Helmet>
      <section className="bg-mist pt-20 md:pt-24 pb-16 border-t border-line">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white/70 backdrop-blur border border-line rounded-xl p-7">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-4">SELL ON PROBUYSALE</p>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Seller login</h1>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input text-ink w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input text-ink w-full" />
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
            New seller?{" "}
            <a className="text-cobalt hover:text-navy focus-ring" href="/sell/signup">Create an account</a>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

