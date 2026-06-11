"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NaviLogo } from "./naviLogo";
import { useUser } from "../user-provider";
import { MapPin, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navigation = () => {
  const [isVisible, setisVisible] = useState(false);
  const { user, logout } = useUser();

  // 🌟 Context-оос address болон setAddress, setIsOpen-ийг татаж авна
  const { cartItems, setIsOpen, address, setAddress } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    <div className="bg-[#18181B] relative w-full py-3">
      <div className="flex justify-between container mx-auto items-center px-4">
        <NaviLogo />
        {!user ? (
          <div className="text-[14px] font-medium flex gap-[12.81px] text-white">
            <Link
              href={"/signin"}
              className="bg-[#EF4444] py-1 px-4 rounded-full hover:bg-red-600 transition"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            {/* 📍 ГАРААРАА БИЧДЭГ ХҮРГЭЛТИЙН ХАЯГНЫ ТАЛБАР (INPUT БОЛГОЖ ЗАССАН) */}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-zinc-200 shadow-sm focus-within:ring-1 focus-within:ring-[#E05345]">
              <MapPin className="w-4 h-4 text-[#E05345] shrink-0" />
              <span className="text-xs font-bold text-[#E05345] whitespace-nowrap hidden sm:inline">
                Delivery Address:
              </span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)} // 🌟 Энд бичихэд сагсан доторх хаяг шууд дагаж солигдоно!
                placeholder="Write your address..."
                className="text-sm text-zinc-800 bg-transparent border-none outline-none w-44 md:w-35 font-medium placeholder-zinc-400"
              />
            </div>

            {/* 🛒 САГСНЫ ТОВЧЛУУР */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-zinc-100 transition"
            >
              <ShoppingCart className="w-5 h-5 text-zinc-800" />
              {totalCount > 0 && (
                <span className="bg-[#ff4b4b] absolute -top-1 -right-1 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-in zoom-in-50">
                  {totalCount}
                </span>
              )}
            </button>

            {/* 👤 ХЭРЭГЛЭГЧИЙН ПРОФАЙЛ */}
            <button
              onClick={() => {
                setisVisible(!isVisible);
              }}
              className="flex items-center justify-center w-10 h-10 bg-[#E05345] text-white rounded-full hover:opacity-90 transition"
            >
              <User className="h-5 w-5 hover:cursor-pointer" />
            </button>

            {/* ПРОФАЙЛ ПОП-АП */}
            <div
              data-shown={isVisible}
              className="absolute opacity-0 hidden flex-col justify-center z-50 items-center gap-3 bg-white h-32 rounded-xl w-60 border border-zinc-200 shadow-xl data-[shown=true]:flex data-[shown=true]:opacity-100 top-16 right-4"
            >
              <span className="font-semibold text-black text-[16px] px-4 truncate w-full text-center">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="h-9 py-2 px-4 bg-zinc-100 hover:bg-zinc-200 text-black font-medium text-[13px] rounded-full transition"
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
