import { useState } from "react";
import { Menu, X, Share2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#products" },
  { label: "Videos", href: "#videos" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/95 border-b border-line backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold">
            <span className="text-xl">💎</span>
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-gold">Artistic Fine Art</p>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Rare gems & minerals</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#contact"
            className="rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition hover:bg-gold hover:text-ink"
          >
            Inquire Now
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/98 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-white transition hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-gold bg-gold/10 px-4 py-3 text-sm font-medium text-gold transition hover:bg-gold hover:text-ink"
              onClick={() => setOpen(false)}
            >
              Inquire Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
