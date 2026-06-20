import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Shop from "./components/Shop";
import Approach from "./components/Approach";
import About from "./components/About";
import Blog from "./components/Blog";
import LeadMagnet from "./components/LeadMagnet";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdUnit from "./components/AdUnit";
import PrivacyPolicy from "./components/PrivacyPolicy";


export default function App() {
  // Simple route handling without extra deps.
  // - /privacy-policy shows the privacy policy page
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isPrivacy = path === "/privacy-policy";

  if (isPrivacy) {
    return <PrivacyPolicy />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Shop />

        {/* Ad between Services and Approach */}

        <section className="py-10 px-6 bg-mist">
          <div className="max-w-6xl mx-auto">
            <AdUnit slotId="ca-pub-6087131991867287" className="flex justify-center" />
          </div>
        </section>

        <Approach />
        <About />
        <Blog />

        {/* Ad above Contact */}

        <section className="py-10 px-6 bg-mist">
          <div className="max-w-6xl mx-auto">
            <AdUnit slotId="ca-pub-6087131991867287" className="flex justify-center" />
          </div>
        </section>

        <LeadMagnet />
        <Contact />
      </main>

      <Footer />

      {/* Footer ad (non-intrusive) */}
      <section className="px-6 pb-14" aria-label="Advertisement">
        <div className="max-w-6xl mx-auto">
          <AdUnit slotId="ca-pub-6087131991867287" className="flex justify-center" />
        </div>
      </section>
    </div>
  );
}

