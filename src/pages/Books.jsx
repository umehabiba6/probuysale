import { Helmet } from "react-helmet-async";

import Products from "../components/Products";

import SiteLayout from "../layouts/SiteLayout";

export default function Books() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Books — ProBuySale</title>
        <meta
          name="description"
          content="Browse all digital books and resources from ProBuySale. Filter by English, Kids, Programming and more."
        />
      </Helmet>

      <main>
        <Products variant="full" />
      </main>
    </SiteLayout>
  );
}

