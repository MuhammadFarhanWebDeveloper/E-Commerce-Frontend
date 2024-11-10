import CategoryList from '@/components/Categories/CategoryList';
import ProductsContainer from '@/components/Products/ProductsContainer';
import { getProducts } from '@/lib/apiCalls/products';
import React from 'react'


export const dynamic = 'force-dynamic';
async function page({searchParams}) {
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 8;
  const category = searchParams.category || "";
  const search = searchParams.search || "";
  const sortBy = searchParams.sortBy || "createdAt";
  const order = searchParams.order || "desc";
  
  const {products} = await getProducts(page, limit, category, search, sortBy, order);
  
  return (
    <div>
      <ProductsContainer products={products}heading=''  />
    </div>
  )
}

export default page
