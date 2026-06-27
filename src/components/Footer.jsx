import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/Copilot_20260619_164006.png"
                alt="ProBuySale"
                className="h-10 w-10 object-contain"
              />
              <div>
                <div className="font-display text-white text-lg font-semibold tracking-tight">
                  ProBuySale
                </div>
                <div className="text-white/60 text-sm">
                  Digital books &amp; resources — crafted by Ume Habiba
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://www.facebook.com/share/1CVQpFU653/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors focus-ring"
                aria-label="Facebook"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@englishspecking?_r=1&_t=ZS-97YXQ5WywFB"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors focus-ring"
                aria-label="TikTok"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/ume-habiba-133560397/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors focus-ring"
                aria-label="LinkedIn"
              >
                <MessageCircle size={18} />
              </a>
            </div>

          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs text-white/60 tracking-widest">LINKS</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#top" className="text-white/70 hover:text-white focus-ring rounded">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-white/70 hover:text-white focus-ring rounded">
                    Books
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/70 hover:text-white focus-ring rounded">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white focus-ring rounded">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/hire-team" className="text-white/70 hover:text-white focus-ring rounded">
                    Hire a Team
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs text-white/60 tracking-widest">FOLLOW</p>
              <div className="mt-4 space-y-3">
                <a
                  href="https://www.facebook.com/share/1CVQpFU653/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white focus-ring"
                >
                  <MessageCircle size={16} /> Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@englishspecking?_r=1&_t=ZS-97YXQ5WywFB"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white focus-ring"
                >
                  <MessageCircle size={16} /> TikTok
                </a>
                <a
                  href="https://www.linkedin.com/in/ume-habiba-133560397/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white focus-ring"
                >
                  <MessageCircle size={16} /> LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-white/50 text-sm">© 2026 ProBuySale by Ume Habiba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

