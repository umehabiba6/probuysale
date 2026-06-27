import { Helmet } from "react-helmet-async";

import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import HeroDigitalProducts from "../components/HeroDigitalProducts";
import About from "../components/About";
import Products from "../components/Products";
import Categories from "../components/Categories";

import SiteLayout from "../layouts/SiteLayout";

export default function Home() {
  return (
    <SiteLayout>
      <Helmet>
        <title>ProBuySale — Digital books & resources by Ume Habiba</title>
        <meta
          name="description"
          content="ProBuySale is a personal digital products store for Ume Habiba — digital books & resources for learning English, helping kids learn, and mastering coding."
        />
      </Helmet>

      <main>
        <HeroDigitalProducts />

        {/* Products */}
        <Products variant="home" limit={8} />


        {/* Categories */}
        <Categories />

        {/* About */}
        <About />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact */}
        <Contact />
      </main>
    </SiteLayout>
  );
}



