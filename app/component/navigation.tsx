"use client";
import Link from "next/link";
import { NaviLogo } from "./naviLogo";
import { useUser } from "../user-provider";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isVisible, setisVisible] = useState(false);
  const { user, logout } = useUser();

  const handleSignOut = () => {
    const isConfirmed = window.confirm(
      "Та системээс гарахдаа итгэлтэй байна уу?",
    );
    if (isConfirmed) {
      logout();
      setisVisible(false);
    }
  };
  return (
    <div className="bg-[#18181B] relative py-3 ">
      <div className="flex justify-between container mx-auto items-center">
        <NaviLogo />
        {!user ? (
          <div className="text-[14px] font-medium flex gap-[12.81px]">
            <Link
              href={"/signin"}
              className="bg-[#EF4444] py-1 px-2 rounded-full"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white rounded-full px-4 py-2 hover:bg-zinc-100 transition-colors">
              <MapPin className="w-5 h-5 text-[#E05345]" />
              <span className="text-sm font-medium text-[#E05345]">
                Delivery Address
              </span>
              <span className="text-sm text-zinc-500">Add Location</span>
              <ChevronRight className="w-4 h-4 text-zinc-450" />
            </button>
            <button className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-zinc-100">
              <ShoppingCart className="w-5 h-5 text-zinc-800" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#E05345] text-white text-xs rounded-full">
                1
              </span>
            </button>
            <button
              onClick={() => {
                setisVisible(!isVisible);
              }}
              className="flex items-center justify-center w-10 h-10 bg-[#E05345] text-white text-xs rounded-full"
            >
              <User className="h-5 w-5 relative hover:cursor-pointer" />
            </button>

            <div
              data-shown={isVisible}
              className="absolute right-73 opacity-0 top-15 flex flex-col justify-center items-center gap-3 bg-white h-30 rounded-xl w-60 data-[shown=true]:visible data-[shown=true]:opacity-100"
            >
              <span className="font-semibold text-black text-[20px] ">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="h-9 py-2 px-3 bg-gray-300 text-black font-medium text-[14px] rounded-full"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
