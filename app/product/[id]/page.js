import ProductOverview from "@/components/Products/ProductOverview";
import RecommendedProducts from "@/components/Products/RecommendedProducts";
import { getOneProduct, getProducts } from "@/lib/apiCalls/products";
import React from "react";

async function page({ params }) {
  const { product } = await getOneProduct(params.id);
  const data = await getProducts(1, 8, product.category.name);
  const products = data?.products?.filter((p) => p.id !== product.id);
  return (
    <div className="md:p-3 p-1">
      <ProductOverview product={product} />
      {products?.length > 0 && <RecommendedProducts products={products} />}
    </div>
  );
}

export default page;
