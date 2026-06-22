import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

export default function useAnonAuth() {
  const [uid, setUid] = useState(null);
  const [ready, setReady] = useState(false);

  const anonSignIn = useMemo(() => async () => {
    try {
      const { user } = auth;
      if (!user) {
        const res = await signInAnonymously(auth);
        setUid(res.user.uid);
      } else {
        setUid(user.uid);
      }
    } catch (e) {
      // In case anonymous sign-in is blocked, still allow app to render.
      setUid(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setReady(true);
        return;
      }
      // No user signed in yet.
      await anonSignIn();
    });

    return () => unsub();
  }, [anonSignIn]);

  return { uid, ready };
}

