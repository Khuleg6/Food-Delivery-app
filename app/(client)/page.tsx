"use client";
import { Card } from "../component/ card";
import { FoodDetails } from "../component/details";
import { useState } from "react";

export default function Home() {
  const [isVisible, setisVisible] = useState(false);
  return (
    <div className="bg-gray-200 relative ">
      <img className="w-full h-[724px]" src="/hero1.png" alt="Logo" />
      <div className="px-20 py-10 container">
        <p className="text-black text-3xl font-semibold">Appetizers</p>
        <div className="grid py-10 grid-cols-4 grid-rows-2 gap-6">
          {" "}
          {Array.from({ length: 8 }).map((_, index) => (
            <Card onClick={() => setisVisible(!isVisible)} key={index} />
          ))}
        </div>
        <div
          data-shown={isVisible}
          className="opacity-0 pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 data-[shown=true]:opacity-100 data-[shown=true]:pointer-events-auto transition-opacity duration-200"
        >
          <FoodDetails onClose={() => setisVisible(false)} />
        </div>
      </div>
    </div>
  );
}
