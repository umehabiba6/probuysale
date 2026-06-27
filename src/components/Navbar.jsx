import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/books", label: "Books" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 focus-ring rounded">
          <img
            src="/images/Copilot_20260619_164008.png"
            alt="ProBuySale"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            ProBuySale
            <span className="text-amber">&nbsp;</span>

          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors focus-ring rounded"
          >
            Home
          </a>

          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors focus-ring rounded"
            >
              {l.label}
            </a>
          ))}

          <a

            href="/hire-team"
            className="text-sm text-white/70 hover:text-white transition-colors focus-ring rounded"
          >
            Hire a Team
          </a>
          <a
            href="/books"
            className="text-sm font-medium bg-cobalt hover:bg-cobalt-light text-white px-4 py-2 rounded-md transition-colors focus-ring"
          >
            Browse Books
          </a>

        </nav>


        <button
          className="md:hidden text-white focus-ring rounded p-1"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="text-white/80 text-sm"
          >
            Home
          </a>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/hire-team"
            onClick={() => setOpen(false)}
            className="text-white/80 text-sm"
          >
            Hire a Team
          </a>
          <a
            href="/books"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-cobalt text-white px-4 py-2 rounded-md text-center"
          >
            Browse Books
          </a>

        </div>
      )}

    </header>
  );
}

