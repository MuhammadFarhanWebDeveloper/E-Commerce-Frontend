import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCard({ product }) {
  return (
    <div className="p-2  w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="rounded-lg p-2 flex flex-col gap-3 border border-black min-h-[400px]">
        <Link href={`/product/${product.id}`} className="w-full">
          <Image
            src={product.images[0].url}
            width={1500}
            height={1000}
            alt="Product Image"
            className="w-[1500px] h-[200px] object-cover rounded-lg"
          />
        </Link>
        <div className="text-lg font-semibold">
          {product.name.length > 27
            ? `${product.name.slice(0, 24)}...`
            : product.name}
        </div>
        <div className="">
          {product.description.length > 70
            ? `${product.description.slice(0, 65)}...`
            : product.description}
        </div>
        <div className="text-lg">RS:{product.price}</div>
        <button className="w-full p-1 text-center rounded-lg bg-blue-700 text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
