import SellerHeader from "@/components/Seller Dashboard/SellerHeader";
import SellerProductCard from "@/components/Seller Dashboard/SellerProductCard";
import Sidebar from "@/components/Seller Dashboard/SidebarMenu/Sidebar";
import { getProducts } from "@/lib/apiCalls/products";
import { headers } from "next/headers";
import React from "react";
export const dynamic = "force-dynamic";
async function page() {
  const headersList = headers();
  const userHeader = headersList.get("user");
  const user = JSON.parse(userHeader);
  console.log(user);
  const { products } = await getProducts(
    1,
    8,
    "",
    "",
    "createdAt",
    "desc",
    user.seller.id
  );

  return (
    <div className="flex gap-2">
      <div className="">{/* <Sidebar /> */}</div>

      <div className="md:px-10 w-full flex flex-col gap-2">
        <SellerHeader />
        <div className=" flex gap-2 flex-wrap content-start items-center">
          {products && products.length > 0 ? (
            products.map((product) => {
              return <SellerProductCard product={product} />;
            })
          ) : (
            <p>No product found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
