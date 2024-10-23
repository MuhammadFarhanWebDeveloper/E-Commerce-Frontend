import ProductOverview from "@/components/Products/ProductOverview";
import RecommendedProducts from "@/components/Products/RecommendedProducts";
import { getOneProduct, getProducts } from "@/lib/apiCalls/products";
import React from "react";

async function page({ params }) {
  const { product } = await getOneProduct(params.id);
  const {products} = await getProducts(1, 8, product.category.name);
  console.log(products)
  return (
    <div className="md:p-3 p-1">
      <ProductOverview product={product} />
      <RecommendedProducts products={products}/>
    </div>
  );
}

export default page;
