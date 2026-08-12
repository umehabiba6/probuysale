import { ShieldCheck, Award, Package } from "lucide-react";

const cards = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Mineral Inquiry Report",
    description:
      "Detailed specimen report including origin, crystal species, dimensions, weight, condition and authenticity confirmation.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "100% Natural Guarantee",
    description:
      "Every specimen is 100% natural and has not been treated, enhanced, or artificially colored in any way.",
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "Safe Worldwide Shipping",
    description:
      "Carefully packed specimens shipped worldwide with tracking. Daily deals from $20 to $200, premium collector pieces also available.",
  },
];

export default function CertificationsSection() {
  return (
    <section className="rounded-[2rem] border border-line bg-surface p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">TRUST & AUTHENTICITY</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Every Piece, Verified</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-white/10 bg-ink p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gold text-black">{item.icon}</div>
            <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
