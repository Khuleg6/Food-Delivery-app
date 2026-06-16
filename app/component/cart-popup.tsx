"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { useUser } from "../user-provider";
import { toast } from "sonner";

export const CartPopup = () => {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    clearCart,
    address,
    setAddress,
  } = useCart();
  const { user, accessToken } = useUser();

  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");

  // 🌟 ШИНЭ: Хэрэглэгчийн захиалгуудыг хадгалах state
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = 0.99; // Чиний дизайн дээрх хүргэлтийн төлбөр
  const finalTotal = totalPrice + shippingFee;

  // 🌟 ШИНЭ: "Order" тэб идэвхжих үед эсвэл поп-ап нээгдэхэд захиалгуудыг татах функц
  useEffect(() => {
    if (isOpen && user?.id) {
      setLoadingOrders(true);
      axios
        .get(`/api/orders?userId=${user.id}`) // Зөвхөн өөрийнхөө захиалгыг шүүж авна
        .then((res) => {
          setMyOrders(res.data);
          setLoadingOrders(false);
        })
        .catch((err) => {
          toast("Захиалга татахад алдаа:", err);
          setLoadingOrders(false);
        });
    }
  }, [isOpen, user?.id, activeTab]); // activeTab солигдоход дата дахин шинэчлэгдэнэ

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!user) return toast("Захиалга хийхийн тулд нэвтэрнэ үү!.");
    if (!address.trim()) return toast("Хүргэлтийн хаягаа оруулна уу!.");
    try {
      const response = await axios.post(
        "/api/orders",
        {
          userId: user.id,
          totalPrice: totalPrice,
          items: cartItems,
          address: address,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (response.status === 201) {
        toast("Захиалга амжилттай баталгаажлаа! 🎉");
        clearCart();
        setActiveTab("order"); // 🌟 Захиалга амжилттай болмогц шууд Order тэб рүү шилжүүлнэ
      }
    } catch (error: any) {
      toast(error.response?.data?.error || "Алдаа гарлаа.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* АРЫН ХАР ХЭСЭГ */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* СУУРЬ ПОП-АП ХАСГ */}
      <div className="relative w-full max-w-md h-full bg-[#141416] text-white shadow-2xl flex flex-col z-10">
        {/* ТОЛГОЙ ХЭСЭГ */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-[#1c1c1e]">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>🛒</span>{" "}
            {activeTab === "cart" ? "Order Detail" : "Order History"}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* ТЭБ СОЛИХ ХЭСЭГ */}
        <div className="p-4 bg-[#1c1c1e]">
          <div className="bg-zinc-900 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "cart" ? "bg-zinc-800 text-white shadow" : "text-zinc-400"}`}
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "order" ? "bg-[#ff4b4b] text-white shadow" : "text-zinc-400"}`}
            >
              Order ({myOrders.length})
            </button>
          </div>
        </div>

        {/* ДҮҮРЭГЧ ХЭСЭГ (Скролл хийгддэг хэсэг) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-800/30">
          {activeTab === "cart" ? (
            cartItems.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                Сагс хоосон байна.
              </div>
            ) : (
              <div className="space-y-4">
                {/* 1-Р ЦАГААН КАРТ: MY CART & DELIVERY LOCATION (ЯГ ЧИНИЙ ДИЗАЙН) */}
                <div className="bg-white text-black p-5 rounded-2xl space-y-4 shadow-sm">
                  <h3 className="font-bold text-lg text-zinc-800">My cart</h3>

                  {/* Сагсан дахь хоолнуудын жагсаалт */}
                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-zinc-800">
                            {item.foodName}
                          </h4>
                          <p className="text-xs text-zinc-400 font-medium line-clamp-2 max-w-[200px]">
                            {item.ingredients}
                          </p>
                          <p className="text-sm text-zinc-900 font-bold pt-1">
                            {item.price.toLocaleString()} ₮
                          </p>
                        </div>

                        {/* Тоолуур */}
                        <div className="flex items-center gap-3 border border-zinc-200 bg-zinc-50 rounded-lg px-2 py-1">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-500 font-bold px-1 hover:text-black"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-zinc-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="text-zinc-500 font-bold px-1 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-dashed border-zinc-200" />

                  {/* ХҮРГЭЛТИЙН ХАЯГ ОРУУЛАХ ТАЛБАР (Карт дотор нэг л удаа зурагдана) */}
                  <div className="space-y-2">
                    <label className="block font-bold text-zinc-800 text-sm">
                      Delivery location
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Please share your complete address"
                      className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none h-20"
                    />
                  </div>
                </div>

                {/* 2-Р ЦАГААН КАРТ: PAYMENT INFO (ЯГ ЧИНИЙ ДИЗАЙН) */}
                <div className="bg-white text-black p-5 rounded-2xl space-y-4 shadow-sm">
                  <h3 className="font-bold text-lg text-zinc-800">
                    Payment info
                  </h3>

                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Items</span>
                    <span className="font-semibold text-zinc-800">
                      {totalPrice.toLocaleString()} ₮
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-zinc-800">
                      {(shippingFee * 2500).toLocaleString()} ₮{" "}
                      {/* Долларыг төгрөг рүү ойролцоолох эсвэл шууд тоогоо тавьж болно */}
                    </span>
                  </div>

                  <hr className="border-dashed border-zinc-200" />

                  <div className="flex justify-between font-bold text-base text-zinc-900">
                    <span>Total</span>
                    <span>
                      {(totalPrice + shippingFee * 2500).toLocaleString()} ₮
                    </span>
                  </div>

                  {/* ХҮЛЭЭН АВАХ ТОВЧЛУУР КАРТ ДОТОР ОРСОН */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#ff4b4b] hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl transition shadow-md active:scale-[0.99] mt-2"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )
          ) : /* ORDER ТЭБ - ЗАХИАЛГЫН ТҮҮХ */
          loadingOrders ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              Ачаалж байна...
            </div>
          ) : myOrders.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              Захиалгын түүх хоосон байна.
            </div>
          ) : (
            myOrders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-xs text-zinc-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border 
                        ${order.status === "PENDING" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : ""}
                        ${order.status === "DELIVERED" ? "bg-green-500/10 text-green-400 border-green-500/20" : ""}
                        ${order.status === "CANCELED" ? "bg-red-500/10 text-red-400 border-red-500/20" : ""}
                      `}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1">
                  {order.foodOrderItems?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-xs text-zinc-300"
                    >
                      <span>🍔 {item.food?.foodName || "Хоол"}</span>
                      <span className="text-zinc-500">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm font-semibold pt-1 text-zinc-100">
                  <span>Нийт:</span>
                  <span className="text-orange-400">
                    {order.totalPrice.toLocaleString()} ₮
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
