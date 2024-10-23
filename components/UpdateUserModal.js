"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CircularImage from "./General/CircularImage";
import { updateUser } from "@/lib/apiCalls/user";

function UpdateUserModal({ close, user: userObject }) {
  const profilePictureRef = useRef();
  const [user, setUser] = useState(userObject);
  const [profilePicture, setProfilePicture] = useState("");

  const changeProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setUser({ ...user, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateUser(
      user.firstName,
      user.lastName,
      user.bio,
      user.address,
      user.phoneNumber,
      profilePicture
    );
    console.log(`The updated user is updated`);
  };

  return (
    <div
      id="updateProductModal"
      className=" overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0 h-full  md:h-full"
    >
      <div className="relative p-4 mx-auto w-full  max-w-2xl  h-full md:h-auto ">
        <div className="relative p-4 bg-white overflow-y-auto top-0 h-full rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center  mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update User
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
              <div className="sm:col-span-2 mx-auto">
                <div
                  className="cursor-pointer rounded-full border-2 border-black"
                  onClick={() => {
                    profilePictureRef.current.click();
                  }}
                >
                  <CircularImage
                    imageUrl={user?.profilePicture || "/noavatar.png"}
                    size={100}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeProfilePicture}
                    name="profilePicture"
                    id="profilePicture"
                    ref={profilePictureRef}
                    hidden
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user?.firstName || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={user?.lastName || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={user?.phoneNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={user?.bio || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=""
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={user?.address || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=""
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center my-2 ">
              <button
                type="submit"
                className=" font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black bg-gray-400"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;