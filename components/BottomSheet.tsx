"use client";

import Link from "next/link";
import { ReactElement, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { LuSwords } from "react-icons/lu";
import { TbMessage2, TbUsersPlus } from "react-icons/tb";

export default function BottomSheet() {
  const [routeIndex, setRouteIndex] = useState(0);
  interface routesType {
    title: string;
    link: string;
    icon: ReactElement;
    id: number;
  }
  const routes: routesType[] = [
    {
      id: 0,
      title: "Home",
      link: "/",
      icon: (
        <HiOutlineHome
          color={routeIndex === 0 ? "white" : "#9ca3af"}
          className="w-6 h-6"
        />
      ),
    },
    {
      id: 1,
      title: "Mine",
      link: "/Mine",
      icon: (
        <LuSwords
          color={routeIndex === 1 ? "white" : "#9ca3af"}
          className="w-6 h-6"
        />
      ),
    },
    {
      id: 2,
      title: "Referrals",
      link: "/Referrals",
      icon: (
        <TbUsersPlus
          color={routeIndex === 2 ? "white" : "#9ca3af"}
          className="w-6 h-6"
        />
      ),
    },
    {
      id: 3,
      title: "FAQ",
      link: "/FAQ",
      icon: (
        <TbMessage2
          color={routeIndex === 3 ? "white" : "#9ca3af"}
          className="w-6 h-6"
        />
      ),
    },
  ];
  return (
    <div className="fixed bottom-2 w-[94%] bg-gray-100 grid grid-cols-4 gap-2 p-2 left-[3%] rounded-lg">
      {routes.map((route) => {
        return (
          <Link
            href={route.link}
            key={route.title}
            className={`flex flex-col items-center p-1 rounded-md ${
              routeIndex === route.id
                ? "text-white bg-green-600"
                : "text-gray-400 bg-white"
            }`}
          >
            {route.icon}
            {route.title}
          </Link>
        );
      })}
    </div>
  );
}
