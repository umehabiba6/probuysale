export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-amber text-sm">{"{ }"}</span>
          <span className="font-display text-white/80 text-sm">ProBuySale</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/privacy-policy"
            className="font-mono text-xs text-white/35 hover:text-white focus-ring rounded"
          >
            Privacy Policy
          </a>
          <p className="font-mono text-xs text-white/35">
            © {new Date().getFullYear()} ProBuySale. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

