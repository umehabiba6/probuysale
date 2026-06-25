import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";

import Approach from "./components/Approach";
import About from "./components/About";
import Blog from "./components/Blog";
import LeadMagnet from "./components/LeadMagnet";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdUnit from "./components/AdUnit";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SellerProtectedRoute from "./components/SellerProtectedRoute";

import { Routes, Route, Navigate } from "react-router-dom";
import useAnonAuth from "./hooks/useAnonAuth";
import BootstrapDiagnostics from "./BootstrapDiagnostics";

import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";
import SellerSignup from "./pages/SellerSignup";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import HireTeam from "./pages/HireTeam";

import { Helmet } from "react-helmet-async";

function Homepage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ProBuySale — Buy & Sell Digital Products | Hire Dev Teams</title>
        <meta
          name="description"
          content="ProBuySale is a digital marketplace to buy and sell Flutter ebooks, Python guides, kids books, English learning resources, UI kits, React templates and AI tools. Also hire development teams."
        />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <Services />

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

export default function App() {
  // Silent anonymous auth for all visitors (buyers).
  // Provides stable uid for chat security.
  useAnonAuth();

  return (
    <>
      <BootstrapDiagnostics />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:listingId" element={<ListingDetail />} />
        <Route path="/hire-team" element={<HireTeam />} />

        {/* Seller */}
        <Route path="/sell/signup" element={<SellerSignup />} />
        <Route path="/sell/login" element={<SellerLogin />} />
        <Route
          path="/sell/dashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        />

        {/* Blog post */}
        <Route path="/blog/:slug" element={<div />} />

        {/* Admin */}
        <Route path="/admin/login" element={<div />} />
        <Route path="/admin" element={<div />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

