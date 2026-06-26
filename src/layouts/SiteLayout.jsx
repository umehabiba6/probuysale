import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Fixed navbar spacer */}
      <div className="pt-20 md:pt-24">
        {children}
      </div>
      <Footer />
    </div>
  );
}

