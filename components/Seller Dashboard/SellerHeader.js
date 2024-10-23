"use client";
import React, { useState } from "react";
import ProductActionModal from "./ProductActionModal";

function SellerHeader() {
  const [IsAddProductOpened, setIsAddProductOpened] = useState(false);

  const toggleModal = () => {
    setIsAddProductOpened(!IsAddProductOpened);
  };

  return (
    <>
      {IsAddProductOpened && <ProductActionModal close={toggleModal} />}
      <div className="p-4 rounded bg-slate-300 flex items-center justify-between ">
        <div></div>
        <div>
          <button
            onClick={toggleModal}
            className="p-2 rounded-full bg-blue-700 text-white"
          >
            Upload Product
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerHeader;
