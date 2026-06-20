import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "5 Signs You Need a Custom Mobile App",
    excerpt:
      "If your business is scaling, your existing app (or website) may no longer cut it. Here’s how to spot the moment to go custom.",
    url: "/blog/custom-mobile-apps",
  },
  {
    title: "What is RAG and Why It Matters for Your Business AI",
    excerpt:
      "RAG bridges knowledge gaps so your AI stays grounded in real data. Learn the basics and where it delivers measurable value.",
    url: "/blog/rag-business-ai",
  },
  {
    title: "From Idea to Launch: A Simple Checklist for Digital Products",
    excerpt:
      "A practical pre-launch workflow to validate, build, ship, and iterate — without burning weeks on guesswork.",
    url: "/blog/digital-product-launch-checklist",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-mist py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">BLOG</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            SEO-friendly updates & practical guides
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Placeholder posts today — real content later. This section sets up the structure and URLs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <article
              key={post.url}
              className="group relative overflow-hidden bg-white/70 backdrop-blur border border-line rounded-xl p-7 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cobalt/20 blur-2xl" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-amber/15 blur-2xl" />
              </div>

              <h3 className="font-display text-xl font-semibold text-ink relative">
                {post.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed mt-3 relative">{post.excerpt}</p>

              <a
                href={post.url}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy transition-colors focus-ring rounded"
              >
                Read more <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

