import { Mail, Phone } from "lucide-react";


export default function AboutSection() {
  const initials = "UH";

  return (
    <section id="about" className="bg-white py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
        <div className="flex items-start">
          <div className="h-52 w-52 rounded-full bg-gradient-to-br from-cobalt/20 via-amber/20 to-purple-500/20 border border-line flex items-center justify-center">
            <div className="h-36 w-36 rounded-full bg-white/70 border border-line flex items-center justify-center">
              <span className="font-display text-4xl font-semibold text-ink">{initials}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">ABOUT THE AUTHOR</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Hi, I'm Ume Habiba
          </h2>
          <p className="mt-5 text-slate leading-relaxed">
            I'm a BSIT graduate and full-stack Flutter developer who builds apps,
            delivers AI solutions to companies, and creates digital learning resources.
            I write books because I believe quality education should be accessible —
            whether you're learning English, teaching your kids, or starting your coding journey.
            Every book I publish is something I genuinely wished existed when I was learning.
          </p>

          <div className="flex flex-wrap gap-2 mt-7">
            {[
              "Flutter",
              "React",
              "Firebase",
              "AI/ML",
              "Python",
              "Content Creation",
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-xs text-slate/80 border border-line rounded-full px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy focus-ring"
              aria-label="Facebook"
            >
              <Phone size={18} /> Facebook
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy focus-ring"
              aria-label="TikTok"
            >
              <Phone size={18} /> TikTok
            </a>

            <a
              href="mailto:habibachand6@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy focus-ring"
              aria-label="Email"
            >
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

