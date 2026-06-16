"use client";
import React from "react";
import Link from "next/link";
import { NaviLogo } from "./naviLogo";
import { useUser } from "../user-provider";
import { MapPin, ShoppingCart, User, ShieldAlert } from "lucide-react"; // ShieldAlert icon нэмэв
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Navigation = () => {
  const { user, logout } = useUser();
  const { cartItems, setIsOpen, address, setAddress } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = () => {
    toast("Системээс гарах", {
      description: "Та системээс гарахдаа итгэлтэй байна уу?",
      action: {
        label: "Тийм",
        onClick: () => {
          logout();
          toast.success("Амжилттай гарлаа");
        },
      },
      cancel: {
        label: "Үгүй",
        onClick: () => {}, // 🌟 Энийг нэмснээр алдаа шууд арилна!
      },
    });
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
            {/* 📍 ХҮРГЭЛТИЙН ХАЯГ */}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-zinc-200 shadow-sm focus-within:ring-1 focus-within:ring-[#E05345]">
              <MapPin className="w-4 h-4 text-[#E05345] shrink-0" />
              <span className="text-xs font-bold text-[#E05345] whitespace-nowrap hidden sm:inline">
                Delivery Address:
              </span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

            {/* 👤 ХЭРЭГЛЭГЧИЙН ПРОФАЙЛ ПОП-АП */}
            <Popover>
              <PopoverTrigger asChild>
                {/* 🌟 Хэрэв Admin бол улаан icon биш, арай өөр хөх эсвэл алтан шаргал өнгөтэй байж болно. Энд би өнгийг нь хэвээр үлдээв */}
                <button className="relative flex items-center justify-center w-10 h-10 bg-[#E05345] text-white rounded-full hover:opacity-90 active:scale-95 transition cursor-pointer">
                  <User className="h-5 w-5" />
                  {/* 🌟 Хэрэв Admin бол icon дээр жижигхэн анхааруулах цэг эсвэл тэмдэг харуулж болно */}
                  {user.role === "ADMIN" && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-amber-500 border-2 border-[#18181B] rounded-full" />
                  )}
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-60 p-4 flex flex-col justify-center items-center gap-4 bg-white rounded-xl border border-zinc-200 shadow-xl mt-2 animate-in fade-in-50 zoom-in-95 duration-100"
              >
                <div className="w-full text-center space-y-1">
                  {/* 🌟 ЭРХИЙН БАЙДЛЫГ ХАРУУЛАХ ХЭСЭГ */}
                  {user.role === "ADMIN" ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      <ShieldAlert className="w-3 h-3" /> Admin Mode
                    </span>
                  ) : (
                    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Имэйл хаяг
                    </p>
                  )}

                  <p className="font-semibold text-zinc-800 text-[14px] px-2 truncate w-full">
                    {user.email}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-zinc-100" />

                {/* 🌟 ЧУХАЛ: Хэрэв ADMIN бол Admin Dashboard руу орох товчлуур харуулна */}
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin" // Энд өөрийн админ хуудасны path-ийг бичээрэй (жишээ нь /admin эсвэл /admin/dashboard)
                    className="w-full h-9 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-[13px] rounded-full transition text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full h-9 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-[13px] rounded-full transition cursor-pointer text-center"
                >
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};
