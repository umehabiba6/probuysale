import { useEffect, useState } from "react";

export default function BootstrapDiagnostics() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const keys = [
      "VITE_FIREBASE_API_KEY",
      "VITE_FIREBASE_AUTH_DOMAIN",
      "VITE_FIREBASE_PROJECT_ID",
      "VITE_FIREBASE_STORAGE_BUCKET",
      "VITE_FIREBASE_MESSAGING_SENDER_ID",
      "VITE_FIREBASE_APP_ID",
    ];

    const missing = keys.filter((k) => {
      const v = import.meta.env[k];
      return !v || String(v).trim() === "";
    });

    // Avoid sync setState inside effect body (lint rule). 
    queueMicrotask(() => {
      setInfo({
        hasMissing: missing.length > 0,
        missing,
      });
    });
  }, []);

  if (!info) return null;

  if (!info.hasMissing) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 99999,
        top: 0,
        left: 0,
        right: 0,
        background: "#b91c1c",
        color: "white",
        padding: 12,
        fontFamily: "monospace",
        fontSize: 12,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>
        Firebase env vars missing - app may white-screen
      </div>
      <div>
        {info.missing.map((m) => (
          <div key={m}>{m}</div>
        ))}
      </div>
    </div>
  );
}

