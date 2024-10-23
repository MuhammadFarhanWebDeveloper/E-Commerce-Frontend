"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import CircularImage from "../General/CircularImage";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import UpdateUserModal from "../UpdateUserModal";

function Navbar({ user }) {
  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isUserUpdateModalOpened, setIsUserUpdateModalOpened] = useState(false);
  const [userControlMenuOpened, setUserControlMenuOpened] = useState(false);
  const router = useRouter(); // Get router instance

  const toggleUserUpdateModal = () => {
    setIsUserUpdateModalOpened(!isUserUpdateModalOpened);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchBarOpened(false);

    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`);
    }

    setSearchQuery("");
  };

  return (
    <div className="fixed top-0 bg-slate-300 z-20 w-full px-5">
      {isUserUpdateModalOpened && (
        <UpdateUserModal user={user} close={toggleUserUpdateModal} />
      )}
      <div className="w-full h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <Link
            href={"/"}
            className="text-3xl text-center font-bold text-rose-800"
          >
            Logo
          </Link>
        </div>
        {/* Search Bar */}
        <div
          className={`md:w-[30%] md:static bg-slate-300 md:h-full absolute -bottom-14 left-0 right-0 ${
            !isSearchBarOpened && "hidden"
          } md:block`}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-3 items-center justify-center p-3"
          >
            <input
              type="search"
              value={searchQuery} // Bind input value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              placeholder="Search Products"
              className="w-full p-2 px-4 outline-none border-none rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-all duration-300"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
          </form>
        </div>

        {/* Search Icon (appears in small screens) */}
        <div
          onClick={() => {
            setIsSearchBarOpened(true);
          }}
          className={`p-1 md:hidden ${
            !isSearchBarOpened && "block"
          } rounded-full cursor-pointer bg-slate-400`}
        >
          <AiOutlineSearch size={25} />
        </div>

        {/*Hamburger (appears in small screens)  */}
        {!user?.isSeller && (
          <div
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className="p-1 cursor-pointer border border-black rounded-full md:hidden block"
          >
            <ul>
              <li className="w-[24px] my-[3px] h-[3px] bg-black"></li>
              <li className="w-[24px] my-[3px] h-[3px] bg-black"></li>
              <li className="w-[24px] my-[3px] h-[3px] bg-black"></li>
            </ul>
          </div>
        )}

        {/* Links  */}
        <div
          className={`flex items-center md:gap-4 gap-3  md:flex-row flex-col md:static absolute bg-slate-300 left-0 right-0 top-16 ${
            !isMenuOpened && "hidden md:flex"
          }`}
        >
          {user && !user?.isSeller && (
            <Link href="/auth/become-seller" className="w-fit text-lg font-semibold navlink relative cursor-pointer">
              Become a seller
            </Link>
          )}
          {user?.isSeller && (
            <div className="w-fit text-lg font-semibold navlink relative cursor-pointer">
              <Link href={"/seller/dashboard"}>Dashboard</Link>
            </div>
          )}
          <div className="flex items-center md:flex-row flex-col py-2 justify-center text-lg font-semibold">
            {!user && (
              <div
                className={`items-center md:gap-4 gap-3 flex md:flex-row flex-col`}
              >
                <Link href={"/auth/login"} className="w-fit navlink relative cursor-pointer">
                  Login
                </Link>
                <Link href={"/auth/send-otp"} className="w-fit navlink relative cursor-pointer">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {user && (
          <>
            {/* Shoping Cart Icon */}
            <div className="relative">
              <div className="absolute -top-3 -right-3 rounded-full w-[20px] h-[20px] p-1 text-sm  bg-red-700 flex items-center justify-center text-white">
                0
              </div>
              <AiOutlineShoppingCart size={30} />
            </div>

            {/* User Account Menu */}
            <div className="relative px-3 flex md:gap-4 items-center">
              <div
                onClick={() => {
                  setUserControlMenuOpened(!userControlMenuOpened);
                }}
                className="w-fit h-fit rounded-full cursor-pointer"
              >
                <CircularImage
                  imageUrl={user?.profilePicture || "/noavatar.png"}
                  size={50}
                />
              </div>
              {userControlMenuOpened && (
                <ul
                  onClick={() => {
                    setUserControlMenuOpened(!userControlMenuOpened);
                  }}
                  className="absolute mt-1 rounded-lg w-[150px] gap-2 text-white z-20  right-0 top-12 bg-gray-600 px-2 min-h-[100px]"
                >
                  <li
                    onClick={toggleUserUpdateModal}
                    className="p-2 rounded-lg w-full flex gap-2 items-center cursor-pointer hover:bg-gray-500"
                  >
                    <div className="">
                      <GoPencil />
                    </div>
                    <p className="w-full">Update Info</p>
                  </li>
                  <hr />
                  <li className="p-2 rounded-lg  flex gap-2 items-center cursor-pointer hover:bg-gray-500">
                    <div className="">
                      <AiOutlineLogout />
                    </div>
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
