import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SellerProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!mounted) return;
      if (!u) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "sellers", u.uid));
        if (!mounted) return;
        setAllowed(snap.exists());
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setAllowed(false);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  if (loading) return <div className="pt-24 px-6 text-slate">Checking access…</div>;
  if (!allowed) return <Navigate to="/sell/login" replace />;
  return children;
}

