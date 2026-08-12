import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SignatureSpecimens from "../components/SignatureSpecimens";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoriesSection from "../components/CategoriesSection";
import VideoGallerySection from "../components/VideoGallerySection";
import AboutSection from "../components/AboutSection";
import CertificationsSection from "../components/CertificationsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSpecimen, setSelectedSpecimen] = useState("");

  return (
    <div className="min-h-screen bg-ink text-white">
      <Helmet>
        <title>Artistic Fine Art — Rare Gems & Minerals from Pakistan</title>
        <meta
          name="description"
          content="Premium gems and minerals dealer — Tourmaline, Aquamarine, Emerald and rare collector specimens from Pakistan's finest mines. Natural, untreated, certified."
        />
      </Helmet>

      <Navbar />
      <main className="space-y-16 px-6 pb-16 pt-28 lg:px-8">
        <HeroSection />
        <SignatureSpecimens />
        <VideoGallerySection />
        <FeaturedProducts
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onInquire={(name) => setSelectedSpecimen(name)}
        />
        <CategoriesSection onSelectCategory={setActiveCategory} />
        <AboutSection />
        <CertificationsSection />
        <ContactSection initialSpecimen={selectedSpecimen} />
      </main>
      <Footer />
    </div>
  );
}
