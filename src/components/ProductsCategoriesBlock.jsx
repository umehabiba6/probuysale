import { useState } from "react";
import Products from "./Products";
import Categories from "./Categories";

export default function ProductsCategoriesBlock() {
  const [selected, setSelected] = useState("All");

  return (
    <>
      <Products key={selected} />
      <Categories onSelectCategory={(cat) => setSelected(cat)} />
    </>
  );
}

