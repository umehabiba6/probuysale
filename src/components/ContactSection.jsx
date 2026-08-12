import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { sendEmailInquiry } from "../utils/formspree";

const budgetOptions = [
  "Under $50",
  "$50-$200",
  "$200-$500",
  "$500+",
  "Open to discuss",
];

export default function ContactSection({ initialSpecimen }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specimen: initialSpecimen || "",
    budget: "Under $50",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (initialSpecimen) {
      setForm((prev) => ({ ...prev, specimen: initialSpecimen }));
    }
  }, [initialSpecimen]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setBusy(true);

    try {
      await sendEmailInquiry({ ...form });
      await addDoc(collection(db, "inquiries"), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        specimen: form.specimen.trim(),
        budget: form.budget,
        message: form.message.trim(),
        responded: false,
        createdAt: serverTimestamp(),
      });
      setStatus("Your inquiry has been sent. We will reply within 24 hours.");
      setForm((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      console.error(error);
      setStatus("Unable to send inquiry right now. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="rounded-[2rem] border border-line bg-ink p-6 text-white shadow-xl shadow-black/20 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">GET IN TOUCH</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Inquire About a Specimen</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
            Interested in a piece? Have a question? Fill the form below and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-10 space-y-4 rounded-[2rem] border border-white/10 bg-surface p-6 text-white/80">
            <p className="text-sm">📍 Pakistan (Gilgit-Baltistan region)</p>
            <p className="text-sm">� WhatsApp and email inquiries welcome</p>
            <p className="text-sm">⏰ Response within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-white/80">
              Your Name*
              <input
                value={form.name}
                onChange={handleChange("name")}
                required
                className="form-input mt-2"
              />
            </label>
            <label className="block text-sm text-white/80">
              Email Address*
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                required
                className="form-input mt-2"
              />
            </label>
          </div>

          <label className="block text-sm text-white/80">
            Phone/WhatsApp
            <input
              value={form.phone}
              onChange={handleChange("phone")}
              className="form-input mt-2"
            />
          </label>

          <label className="block text-sm text-white/80">
            Specimen of Interest
            <input
              value={form.specimen}
              onChange={handleChange("specimen")}
              className="form-input mt-2"
            />
          </label>

          <label className="block text-sm text-white/80">
            Budget Range
            <select
              value={form.budget}
              onChange={handleChange("budget")}
              className="form-input mt-2"
            >
              {budgetOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-white/80">
            Message*
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              required
              rows={5}
              className="form-input mt-2 min-h-[140px]"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
          >
            Send Inquiry
          </button>

          {status && <p className="text-sm text-white/75">{status}</p>}
        </form>
      </div>
    </section>
  );
}
