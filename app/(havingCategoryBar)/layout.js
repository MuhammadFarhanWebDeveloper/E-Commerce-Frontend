import CategoryList from "@/components/Categories/CategoryList";
import { getAllCategories } from "@/lib/apiCalls/category";
import React from "react";

async function layout({children}) {
  const categories = await getAllCategories();
  const { data } = categories;
  return (
    <div>
      <CategoryList categories={data} />
      {children}
    </div>
  );
}

export default layout;
