"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";

function ProductOverview({product}) {
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [activeImage, setActiveImage] = useState(product.images[0].url || "")
  const [isShowZooming, setIsShowZooming] = useState(false);
  const handleImageZooming = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }
   const changeActiveImage = (url)=>{
    setActiveImage(url)
   }
  return (
    <div className="flex md:flex-row flex-col gap-3 md:h-[400px]">
      <div className="md:w-[110px]  order-2 md:order-1 p-2 flex flex-row md:flex-col  gap-2 md:h-full ">
        {product.images?.map((image)=>{
          return <div key={image.id} onClick={()=>{changeActiveImage(image.url)}} onMouseEnter={()=>{changeActiveImage(image.url)}} className="border border-red-700 w-[90px] h-[90px]">
          <Image
            src={image.url}
            width={90}
            height={90}
            alt="An Image"
            className="w-full h-full object-cover"
          />
        </div>
        })}
        
      </div>
      {/* Product image */}
      <div className="relative md:order-2 order-1 p-2 md:h-full md:w-[470px]">
        <img
          src={activeImage}
          alt="Camera Image"
          className="w-full border border-black h-full object-contain"
          onMouseMove={handleImageZooming}
          onMouseEnter={()=>setIsShowZooming(true)}
          onMouseLeave={()=>setIsShowZooming(false)}
        />
        {/* Product image zoom */}
        {isShowZooming &&<div className="hidden p-2 lg:block absolute min-w-[350px] z-10 -right-[358px] top-1 min-h-[350px]  bg-slate-200">
          <div
            className="w-full h-full min-w-[350px]  min-h-[350px] bg-slate-200 mix-blend-multiply"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                zoomImageCoordinate.y * 100
              }%`,
              backgroundSize: "170%",
            }}
          ></div>
        </div>}
        
      </div>
      <div className="border order-3 border-black w-full p-2 flex flex-col">
        <h1 className="font-bold text-2xl">{product.name}</h1>
        <div className="opacity-35 font-medium">{product.category.name}</div>
        <div className="text-3xl font-bold text-red-700">RS:{product.price}</div>
        <div className="my-2">
          <button className="mr-2 px-2 py-1 border-2 border-red-700 rounded">
            Buy Now
          </button>
          <button className="mr-2 px-2 py-1 border-2 bg-red-700 text-white rounded">
            Buy Now
          </button>
        </div>
        <div className="md:w-1/2 text-lg">
          {product.description}
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
