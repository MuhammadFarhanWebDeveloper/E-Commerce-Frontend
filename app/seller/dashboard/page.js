import SellerHeader from "@/components/Seller Dashboard/SellerHeader";
import SellerProductContailer from "@/components/Seller Dashboard/SellerProductContailer";

import React from "react";
export const dynamic = "force-dynamic";
async function page() {
  return (
    <div className="flex gap-2">
      <div className="md:px-10 w-full flex flex-col gap-2">
        <SellerHeader />
        <SellerProductContailer />
      </div>
    </div>
  );
}

export default page;
