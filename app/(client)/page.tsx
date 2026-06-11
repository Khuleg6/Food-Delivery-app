"use client";

import { Food } from "@/src/generated/prisma/client";

import { FoodDetails } from "../component/details";
import { useEffect, useState } from "react";
import { FoodCategoryWithFoods } from "../(admin)/admin/products/page";
import { Card } from "../component/ card";
import { Car } from "lucide-react";
import axios from "axios";
import { CartPopup } from "../component/cart-popup";

type FoodsWithCategory = {
  categoryName: string;
  foods: Food[];
};

export default function Home({
  food,
  category,
}: {
  food: Food;
  category: FoodCategoryWithFoods;
}) {
  const [isVisible, setisVisible] = useState(false);
  const [categories, setCategories] = useState<FoodsWithCategory[]>();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);
  console.log(categories);

  const handleCardClick = (food: Food) => {
    setSelectedFood(food);
    setisVisible(true);
  };

  return (
    <div className="bg-[#FAFAFA] relative ">
      <img className="w-full h-[724px]" src="/hero1.png" alt="Logo" />
      <div className="px-20 py-10 container">
        <div className="">
          <div className="flex flex-col">
            {categories?.map((category, index) => {
              // 🌟 ШИНЭ: Хэрэв тухайн ангилал дотор хоол байхгүй бол
              // энэ ангиллыг огт зурахгүй, алгасаад дараагийнх руу нь шилжинэ.
              if (!category.foods || category.foods.length === 0) {
                return null;
              }

              // Зөвхөн хоолтой ангиллууд л доорх кодоор зурагдана
              return (
                <div key={index} className="flex flex-col gap-5 mb-10">
                  <span className="text-[30px] py-4.5 font-semibold leading-9">
                    {category.categoryName}
                  </span>

                  <div className="flex flex-wrap gap-9">
                    {" "}
                    {/* flex-wrap нэмбэл хоолнууд багтахгүй бол доошоо гоё шилжинэ */}
                    {category.foods.map((e) => (
                      <Card
                        bg="bg-white"
                        food={e}
                        key={e.id}
                        onClick={() => handleCardClick(e)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Поп-ап хэсэг хэвээрээ... */}
        {isVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => {
                setisVisible(false);
                setSelectedFood(null);
              }}
            />
            <div className="relative z-10">
              <FoodDetails
                food={selectedFood}
                onClose={() => {
                  setisVisible(false);
                  setSelectedFood(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <CartPopup />
    </div>
  );
}
