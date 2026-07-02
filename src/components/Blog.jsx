import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

function formatDate(d) {
  try {
    if (!d) return "";
    const date = d?.toDate ? d.toDate() : new Date(d);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return "";
  }
}

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const postsRef = collection(db, "blogPosts");
        const q = query(
          postsRef,
          where("status", "==", "published"),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        if (cancelled) return;

        const docs = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .slice(0, 3);

        setPosts(docs);
      } catch (e) {
        console.error(e);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="bg-mist py-24 md:py-28 border-t border-line">
      <Helmet>
        <title>Blog — ProBuySale</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs text-cobalt tracking-widest mb-3">BLOG</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            SEO-friendly updates & practical guides
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/70 border border-line rounded-xl p-7 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white/70 border border-line rounded-xl p-8 text-center">
            <p className="font-display text-lg text-ink">No published posts yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden bg-white/70 backdrop-blur border border-line rounded-xl p-7 hover:border-cobalt/40 hover:shadow-[0_20px_40px_-20px_rgba(36,86,219,0.25)] transition-all motion-reduce:hover:scale-[1] hover:scale-[1.02]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cobalt/20 blur-2xl" />
                  <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-amber/15 blur-2xl" />
                </div>

                <div className="text-slate text-xs font-mono">
                  {post.createdAt ? formatDate(post.createdAt) : ""}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink relative mt-3">
                  {post.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mt-3 relative line-clamp-3">{post.excerpt}</p>

                <a
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy transition-colors focus-ring rounded"
                >
                  Read More <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

