"use client";
import CircularImage from "@/components/General/CircularImage";
import { becomeSeller } from "@/lib/apiCalls/user";
import { useRouter } from "nextjs-toploader/app";

import React, { useRef, useState } from "react";

function page() {
  const logoRef = useRef();
  const router = useRouter()
  const [formData, setFormData] = useState({
    storeName:"",
    storeDescription:"",
    businessAddress:"",
    logo:""
  })
  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setFormData({...formData, logo:URL.createObjectURL(file)})
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const sellerDetail = await becomeSeller({...formData, logo:logo})
    if(sellerDetail?.success){
      router.push("/")
    }
    
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Become a Seller
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center gap-2">
          <div
            className="cursor-pointer rounded-full border-2 border-black w-fit h-fit mx-auto"
            onClick={() => {
              logoRef.current.click();
            }}
          >
            <CircularImage imageUrl={formData.logo ||  "/noavatar.png"} size={100} />
          </div>
          <label
            className="text-lg font-semibold mx-auto text-center h-fit cursor-pointer"
            htmlFor="logo"
          >
            Store Logo
          </label>
          <input
            type="file"
            name="logo"
            id="logo"
            ref={logoRef}
            accept="images/*"
            onChange={handleChangeLogo}
            hidden
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="storeName"
          >
            Store Name
          </label>
          <input
            type="text"
            name="storeName"
            id="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your store name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="storeDescription"
          >
            Store Description
          </label>
          <textarea
            name="storeDescription"
            id="storeDescription"
            value={formData.storeDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your Store Description..."
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="businessAddress"
          >
            Business Address
          </label>
          <textarea
            name="businessAddress"
            id="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your Store Description..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center hover:bg-indigo-700 transition duration-300"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Become Seller"
          ) : (
            <img src="/loading.gif" className="mx-auto" />
          )}
        </button>

      </form>
    </div>
  );
}

export default page;
