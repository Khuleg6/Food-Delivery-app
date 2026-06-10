"use client";
import React, { useState } from "react";
// Чиний өөрийн хэрэглэгчийн hook
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { useUser } from "../user-provider";

export const CartPopup = () => {
  const { cartItems, isOpen, setIsOpen, addToCart, removeFromCart, clearCart } =
    useCart();
  const { user, accessToken } = useUser();

  // Дотоод төлөв: "cart" эсвэл "order" тэбийг солихын тулд
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");

  // Нийт үнийг бодох
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Сагс хаалттай бол дэлгэцэнд юу ч зурахгүй
  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!user) return alert("Захиалга хийхийн тулд нэвтэрнэ үү.");

    try {
      const response = await axios.post(
        "/api/orders",
        {
          userId: user.id,
          totalPrice: totalPrice,
          items: cartItems,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (response.status === 201) {
        alert("Захиалга амжилттай баталгаажлаа!");
        clearCart();
        setIsOpen(false); // Захиалга дууссан тул сагсыг хаана
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Алдаа гарлаа.");
    }
  };

  return (
    // fixed inset-0 нь бүтэн дэлгэцийг эзэлнэ, z-50 нь хамгийн дээр харагдуулна
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* 1. АРЫН ХАР ХАСГ (Backdrop) - Дээр нь дарахад сагс хаагдана */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* 2. СУУРЬ ПОП-АП ХАСГ - Баруун талаас гулсах анимацитай */}
      <div className="relative w-full max-w-md h-full bg-[#1c1c1e] text-white shadow-2xl flex flex-col z-10 transition-transform duration-300 translate-x-0">
        {/* ТОЛГОЙ ХЭСЭГ: Order Detail ба Хаах товч (✕) */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>🛒</span> Order detail
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* ТЭБ СОЛИХ ХЭСЭГ: Cart / Order */}
        <div className="p-4">
          <div className="bg-zinc-900 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "cart" ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "order" ? "bg-[#ff4b4b] text-white shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Order
            </button>
          </div>
        </div>

        {/* ЖАГСААЛТ ХЭСЭГ (Доошоо гүйдэг гүйлгээтэй) */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
          {activeTab === "cart" ? (
            cartItems.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                Сагс хоосон байна.
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-zinc-100">
                      {item.foodName}
                    </h4>
                    <p className="text-xs text-orange-400 font-medium">
                      {item.price.toLocaleString()} ₮
                    </p>
                  </div>

                  {/* Тоо ширхэг нэмэх хасах хэсэг */}
                  <div className="flex items-center gap-3 border border-zinc-700 bg-zinc-800 rounded-lg px-2 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-orange-500 font-bold px-1"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center text-zinc-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-zinc-400 hover:text-orange-500 font-bold px-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            // Хэрэв "Order" тэб идэвхтэй үед харагдах түүхийн хэсэг
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              Захиалгын түүх хоосон байна.
            </div>
          )}
        </div>

        {/* ДООД ХЭСЭГ: Нийт үнэ болон Захиалга өгөх товчлуур */}
        {activeTab === "cart" && cartItems.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-900 space-y-4">
            <div className="flex justify-between items-center font-semibold text-zinc-300">
              <span>Нийт төлөх дүн:</span>
              <span className="text-xl font-bold text-orange-400">
                {totalPrice.toLocaleString()} ₮
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#ff4b4b] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition shadow-lg active:scale-[0.99]"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
