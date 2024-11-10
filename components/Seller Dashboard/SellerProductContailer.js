"use client";
import { getProducts } from "@/lib/apiCalls/products";
import { initializeProducts } from "@/lib/redux/slices/products";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerProductCard from "./SellerProductCard";

function SellerProductContailer() {
  const user = useSelector((state) => state.user.user);
  const sellerId = user?.seller?.id || 0;
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(
          1,
          8,
          "",
          "",
          "createdAt",
          "desc",
          sellerId
        );
        if (response.success) {
          dispatch(initializeProducts(response.products));
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, sellerId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <img
          src="/loading.gif"
          className="w-[24px] h-[24px]"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap content-start items-center">
      {products && products.length > 0 ? (
        products.map((product) => {
          return <SellerProductCard key={product.id} product={product} />;
        })
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default SellerProductContailer;
