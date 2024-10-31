"use client";
import { deleteProduct } from "@/lib/apiCalls/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ProductActionModal from "./ProductActionModal";

function SellerProductCard({ product }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditProductOpened, setIsEditProductOpened] = useState(false);
  const router = useRouter();
  const handleDelete = async (id) => {
    setIsDeleteLoading(true);
    const deletedProduct = await deleteProduct(id);
    setIsDeleteLoading(false);
    router.refresh();
  };
  const toggleEditModal = () => {
    setIsEditProductOpened(!isEditProductOpened);
  };
  console.log(product)
  return (
    <>
      {isEditProductOpened && (
        <ProductActionModal
          product={product}
          type="edit"
          close={toggleEditModal}
        />
      )}
      <div className="p-2 w-[350px]  h-fit border rounded bg-slate-200 flex flex-col gap-2">
        <Image
          src={product.images[0]?.url || "/header.png"}
          width={350}
          className="object-contain rounded w-[400px] h-[220px]"
          height={350}
          alt="this"
        />
        <h2 className="font-bold text-xl">
          {product.name.length > 15
            ? `${product.name.slice(0, 15)}...`
            : product.name}
        </h2>

        <div className="flex items-center justify-between">
          <div>RS:{product.price}</div>
          <div className="flex gap-2">
            <button
              disabled={isDeleteLoading}
              className="rounded-full p-2 bg-slate-300"
              onClick={() => {
                handleDelete(product.id);
              }}
            >
              {!isDeleteLoading ? (
                <AiOutlineDelete size={20} />
              ) : (
                <img src="/loading.gif" />
              )}
            </button>
            <button
              className="rounded-full p-2 bg-slate-300"
              onClick={toggleEditModal}
            >
              <AiOutlineEdit size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProductCard;
