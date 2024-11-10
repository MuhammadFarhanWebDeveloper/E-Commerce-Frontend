import SellerHeader from "@/components/Seller Dashboard/SellerHeader";
import SellerProductCard from "@/components/Seller Dashboard/SellerProductCard";
import SellerProductContailer from "@/components/Seller Dashboard/SellerProductContailer";
import { getProducts } from "@/lib/apiCalls/products";
import { headers } from "next/headers";
import React from "react";
export const dynamic = "force-dynamic";
async function page() {
  

  return (
    <div className="flex gap-2">
      <div className="">{/* <Sidebar /> */}</div>

      <div className="md:px-10 w-full flex flex-col gap-2">
        <SellerHeader />
        <SellerProductContailer  />
       
      </div>
    </div>
  );
}

export default page;
