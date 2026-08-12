import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "admins", cred.user.uid));
      if (!snap.exists() || snap.data().role !== "admin") {
        throw new Error("This account is not an admin.");
      }
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink px-6 py-16 text-white lg:px-12">
      <div className="mx-auto max-w-md rounded-[2rem] border border-line bg-surface p-10 shadow-xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Admin Login</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Sign in to Artistic Fine Art</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-white/80">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input mt-2"
            />
          </label>
          <label className="block text-sm text-white/80">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input mt-2"
            />
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
