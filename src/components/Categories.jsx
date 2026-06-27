import { BookOpen, Code, MessageSquare } from "lucide-react";
import { useMemo, useState } from "react";

function scrollToProducts() {
  const el = document.getElementById("products");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Categories({ onSelectCategory } ) {
  const cards = useMemo(

    () =>
      [
        {
          icon: MessageSquare,
          title: "English Learning Books",
          desc:
            "From grammar basics to confident speaking — books designed for Pakistani learners who want to communicate fluently in real life.",
          button: "See English Books",
          category: "English Learning",
        },
        {
          icon: BookOpen,
          title: "Kids Learning Books",
          desc:
            "Colorful, fun and educational — stories and activity books that make little ones love learning from their very first page.",
          button: "See Kids Books",
          category: "Kids Learning",
        },
        {
          icon: Code,
          title: "Programming Books",
          desc:
            "Flutter, Python, C++ and more — step-by-step guides written for beginners who want to build real things, not just pass exams.",
          button: "See Coding Books",
          category: "Programming",
        },
      ],
    []
  );

  return (
    <section className="bg-ink py-24 md:py-28 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <p className="font-mono text-xs text-amber tracking-widest mb-3">CATEGORIES</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Learn the right way — in the right category
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.category}
                className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-ink/60 border border-white/10 flex items-center justify-center text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {c.title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">{c.desc}</p>
                <button
                  onClick={() => {
                    onSelectCategory?.(c.category);
                    scrollToProducts();
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-cobalt-light text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors focus-ring w-full"
                >
                  {c.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

