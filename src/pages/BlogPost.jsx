import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { db } from "../firebase";

export default function BlogPost() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const { getDocs, query, collection, where } = await import("firebase/firestore");
        const postsSnap = await getDocs(
          query(
            collection(db, "blogPosts"),
            where("slug", "==", slug)
          )
        );

        if (cancelled) return;

        const first = postsSnap.docs[0];
        if (!first) {
          setPost(null);
          return;
        }
        setPost({ id: first.id, ...first.data() });
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError(e?.message || "Failed to load post.");
          setPost(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="pt-24 pb-16">
      <Helmet>
        <title>{post?.title ? `${post.title} — ProBuySale` : "Blog Post — ProBuySale"}</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:text-navy focus-ring"
          >
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="bg-white/70 border border-line rounded-xl p-7 text-slate">Loading…</div>
        ) : error ? (
          <div className="bg-amber/10 border border-amber/30 text-amber px-4 py-3 rounded-xl text-sm font-mono">
            {error}
          </div>
        ) : !post ? (
          <div className="bg-white/70 border border-line rounded-xl p-7 text-slate">
            Post not found
          </div>
        ) : (
          <article className="bg-white/70 backdrop-blur border border-line rounded-xl p-7">
            {post.coverImageUrl ? (
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg border border-line"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 rounded-lg border border-line bg-ink/5 flex items-center justify-center">
                <span className="text-slate/60 font-mono">No cover</span>
              </div>
            )}

            <h1 className="font-display text-3xl font-semibold text-ink mt-6">{post.title}</h1>

            <div className="text-slate text-sm font-mono mt-2">
              {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
            </div>

            <div className="mt-6 text-slate leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>
        )}
      </div>
    </main>
  );
}

