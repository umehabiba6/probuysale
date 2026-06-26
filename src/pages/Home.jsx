import { Helmet } from "react-helmet-async";

import AdUnit from "../components/AdUnit";
import About from "../components/About";
import Approach from "../components/Approach";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import LeadMagnet from "../components/LeadMagnet";
import Marketplace from "./Marketplace";
import Services from "../components/Services";

import SiteLayout from "../layouts/SiteLayout";

export default function Home() {
  return (
    <SiteLayout>
      <Helmet>
        <title>ProBuySale — Buy & Sell Digital Products | Hire Dev Teams</title>
        <meta
          name="description"
          content="ProBuySale is a digital marketplace to buy and sell Flutter ebooks, Python guides, kids books, English learning resources, UI kits, React templates and AI tools. Also hire development teams."
        />
      </Helmet>

      <main>
        <Hero />
        <Services />

        {/* Products */}
        <Marketplace />

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
    </SiteLayout>
  );
}


