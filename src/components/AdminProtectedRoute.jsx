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

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!mounted) return;

      if (!u) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        // Admin identity stored in: admins/{uid} with fields {uid, email, role: 'admin'}
        const snap = await getDoc(doc(db, "admins", u.uid));
        if (!mounted) return;

        const data = snap.exists() ? snap.data() : null;
        setAllowed(Boolean(data?.role === "admin"));
      } catch (e) {
        console.error(e);
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

  if (loading) return <div className="pt-24 px-6 text-slate">Checking admin access…</div>;
  if (!allowed) return <Navigate to="/admin/login" replace />;
  return children;
}

