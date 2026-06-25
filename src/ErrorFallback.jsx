import "react";

export default function ErrorFallback({ error, reset }) {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "monospace" }}>App crashed</h2>
      <p style={{ opacity: 0.8 }}>
        {error?.message || "Unknown error"}
      </p>
      {error?.stack && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "#0a1a33",
            color: "#fff",
            padding: 16,
            borderRadius: 12,
          }}
        >
          {error.stack}
        </pre>
      )}
      <button
        onClick={reset}
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          background: "#2456db",
          color: "white",
          border: 0,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}

