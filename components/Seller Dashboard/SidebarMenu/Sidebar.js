"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  MdAnalytics,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import {AiOutlineClose, AiOutlineBars} from "react-icons/ai"
import LeftMenuItem from "./LeftMenuItem";
const Sidebar = () => {
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const pagesList = [
    { title: "Dashboard", link: "/dashboard", icon: <MdDashboard /> },
    { title: "Products", link: "/dashboard/products", icon: <MdShoppingBag /> },
    {
      title: "Users",
      link: "/dashboard/users",
      icon: <MdSupervisedUserCircle />,
    },
  ];
  const analyticsList = [
    { title: "Revenue", link: "/dashboard/revenue", icon: <MdWork /> },
    { title: "Reports", link: "/dashboard/reports", icon: <MdAnalytics /> },
    { title: "Teams", link: "/dashboard/teams", icon: <MdPeople /> },
  ];
  const usersList = [
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <MdOutlineSettings />,
    },
    { title: "Help", link: "/dashboard/help", icon: <MdHelpCenter /> },
  ];
  const toggleMenu = () => {
    setisMenuOpened(!isMenuOpened);
  };
  return (
    <div className={`min-h-screen  w-fit  p-2 bottom-0 bg-slate-300`}>
      {isMenuOpened ? ( 
        <AiOutlineClose
          onClick={toggleMenu}
          className="cursor-pointer md:hidden block w-6 h-6"
        />
      ) : (
        <AiOutlineBars
          onClick={toggleMenu}
          className="cursor-pointer md:hidden block w-6 h-6 "
        />
      )}
      <div className={`user-logo mx-2 my-3 py-1  items-center flex gap-1  `}>
        
        <div className={`rounded-full overflow-hidden`}>
          <Image
            src={"/noavatar.png"}
            width={50}
            height={50}
            alt={"User IMAGE"}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="userName font-semibold text-base">Farhan</p>
          <p className="userTitle opacity-60 text-base">Administrater</p>
        </div>
      </div>
      <div className={`Lists flex flex-col  ${isMenuOpened ? "block" :"hidden"} md:block`}>
        <div className="PagesList pl-3 flex gap-0 flex-col">
          <h2 className="pages font-bold">Pages</h2>
          <ul className=" py-0 p-2">
            {pagesList.map((item, index) => {
              return (
                <LeftMenuItem
                  key={index}
                  title={item.title}
                  link={item.link}
                  icon={item.icon}
                />
              );
            })}
          </ul>
        </div>
        <div className="AnalyticsList pl-3 flex gap-0 flex-col">
          <h2 className="analytics font-bold">Analytics(not working)</h2>

          <ul className=" py-0 p-2">
            {analyticsList.map((item, index) => {
              return (
                <LeftMenuItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  link={item.link}
                />
              );
            })}
          </ul>
        </div>
        <div className="UsersList pl-3 flex gap-0 flex-col">
          <h2 className="pages font-bold">Users(not working)</h2>
          <ul className=" py-0 p-2">
            {usersList.map((item, index) => {
              return (
                <LeftMenuItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  link={item.link}
                />
              );
            })}
          </ul>
          <button className="flex gap-2 items-center rounded hover:bg-gray-400 p-2">
            <MdLogout />
            Logout (not working)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
