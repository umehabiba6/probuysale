import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "admins", user.uid));
        if (!mounted) return;
        setAllowed(snap.exists() && snap.data().role === "admin");
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setAllowed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  if (loading) {
    return <div className="pt-24 px-6 text-white">Checking admin access…</div>;
  }
  if (!allowed) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
