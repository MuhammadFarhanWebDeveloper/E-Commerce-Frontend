"use client";

import { createProduct } from "@/lib/apiCalls/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

function ProductActionModal({ close, actualProduct = {}, type = "upload" }) {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [product, setProduct] = useState({
    name: actualProduct.name || "",
    price: actualProduct.price || 0,
    categoryName: actualProduct.categoryName || "",
    description: actualProduct.description || "",
    images: actualProduct.images || [],
  });

  const changeFieldName = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    const data = await createProduct({ ...product, images: selectedFiles });
    if (data.success) {
      router.refresh();
    }
  };

  const selectImages = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); // Store the selected files in the state

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: imageUrls,
    }));
  };

  const removeImageFromArray = (imageParam) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageParam),
    }));

    // Remove the corresponding file from selectedFiles
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => URL.createObjectURL(file) !== imageParam)
    );
  };
  return (
    <div
      id="updateProductModal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 mx-auto w-full max-w-2xl h-full md:h-auto ">
        <div className="relative p-4 bg-white  rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center  mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update product
            </h3>
            <button
              onClick={() => {
                close();
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <AiOutlineClose size={19} />
            </button>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={changeFieldName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={changeFieldName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="categoryName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={product.categoryName}
                  onChange={changeFieldName}
                  id="categoryName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={product.description}
                  onChange={changeFieldName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=""
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="images"
                className="text-white cursor-pointer font-semibold border rounded p-1 mx-auto border-slate-200"
              >
                Select Images
              </label>
              <input
                type="file"
                name="images"
                multiple
                accept="images/*"
                onChange={selectImages}
                id="images"
                hidden
              />
            </div>
            <div className="col-span-2 my-5  flex gap-2 flex-wrap justify-center">
              {product?.images?.map((image, index) => {
                return (
                  <div key={index} className="relative w-[150px]  ">
                    <div
                      onClick={() => {
                        removeImageFromArray(image);
                      }}
                      className="absolute  top-0 right-0 p-2 rounded  hover:bg-gray-900 text-white cursor-pointer"
                    >
                      <AiOutlineDelete size={20} />
                    </div>
                    <Image
                      src={image || "/images/call to action.png"}
                      alt={`productImage`}
                      width={150}
                      height={150}
                      className="border w-full h-full object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center my-2 ">
              <button
                type="submit"
                className=" font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black bg-gray-400"
              >
                Upload product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductActionModal;
