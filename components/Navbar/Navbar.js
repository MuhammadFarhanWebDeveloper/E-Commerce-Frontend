"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularImage from "../General/CircularImage";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import UpdateUserModal from "../UpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/lib/redux/slices/user";

function Navbar({ user: providedUser }) {
  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isUserUpdateModalOpened, setIsUserUpdateModalOpened] = useState(false);
  const [userControlMenuOpened, setUserControlMenuOpened] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user) || providedUser;

  // Only dispatch addUser after the component mounts on the client
  useEffect(() => {
    if (providedUser) {
      dispatch(addUser(providedUser));
    }
  }, [dispatch]);

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
      {/* User Update Modal */}
      {isUserUpdateModalOpened && (
        <UpdateUserModal user={user} close={toggleUserUpdateModal} />
      )}
      <div className="w-full h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/" className="text-3xl font-bold text-rose-800">
            Logo
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className={`md:w-[30%] bg-slate-300 md:h-full ${
            isSearchBarOpened ? "block" : "hidden md:block"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="flex gap-3 p-3 items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Products"
              className="w-full p-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-all duration-300"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
          </form>
        </div>

        {/* Search Icon (Small Screens) */}
        <div
          onClick={() => setIsSearchBarOpened(!isSearchBarOpened)}
          className="p-1 md:hidden rounded-full bg-slate-400 cursor-pointer"
        >
          <AiOutlineSearch size={25} />
        </div>

        {/* Hamburger Menu Icon (Small Screens) */}
        {!user?.isSeller && (
          <div
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className="p-1 border border-black rounded-full md:hidden cursor-pointer"
          >
            <ul>
              <li className="w-6 h-0.5 bg-black my-1"></li>
              <li className="w-6 h-0.5 bg-black my-1"></li>
              <li className="w-6 h-0.5 bg-black my-1"></li>
            </ul>
          </div>
        )}

        {/* Menu Links */}
        <div
          className={`flex items-center md:flex-row flex-col md:static absolute bg-slate-300 left-0 right-0 top-16 ${
            isMenuOpened ? "block" : "hidden md:flex"
          }`}
        >
          {!user?.isSeller && (
            <Link href="/auth/become-seller" className="text-lg font-semibold">
              Become a seller
            </Link>
          )}
          {user?.isSeller && (
            <Link href="/seller/dashboard" className="text-lg font-semibold">
              Dashboard
            </Link>
          )}
          {!providedUser && (
            <div className="flex md:gap-4 gap-3 items-center mx-4 flex-col md:flex-row">
              <Link href="/auth/login" className="w-fit">Login</Link>
              <Link href="/auth/send-otp" className="w-fit">Sign Up</Link>
            </div>
          )}
        </div>

        {providedUser && (
          <div className="flex items-center md:gap-4">
            {/* Shopping Cart Icon */}
            <div className="relative">
              <div className="absolute -top-3 -right-3 rounded-full w-5 h-5 bg-red-700 text-white flex items-center justify-center text-xs">
                0
              </div>
              <AiOutlineShoppingCart size={30} />
            </div>

            {/* User Account Menu */}
            <div className="relative px-3">
              <div
                onClick={() => setUserControlMenuOpened(!userControlMenuOpened)}
                className="cursor-pointer"
              >
                <CircularImage
                  imageUrl={user?.profilePicture || providedUser?.profilePicture || "/noavatar.png"}
                  size={50}
                />
              </div>
              {userControlMenuOpened && (
                <ul className="absolute right-0 top-12 bg-gray-600 text-white rounded-lg w-36 py-2 mt-2 z-20">
                  <li onClick={toggleUserUpdateModal} className="p-2 flex items-center cursor-pointer hover:bg-gray-500">
                    <GoPencil /> <span className="ml-2">Update Info</span>
                  </li>
                  <li className="p-2 flex items-center cursor-pointer hover:bg-gray-500">
                    <AiOutlineLogout /> <span className="ml-2">Logout</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
