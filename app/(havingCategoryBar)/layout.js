import CategoryList from "@/components/Categories/CategoryList";
import { getAllCategories } from "@/lib/apiCalls/category";
import React from "react";

async function layout({children}) {

  return (
    <div>
      <CategoryList  />
      {children}
    </div>
  );
}

export default layout;
