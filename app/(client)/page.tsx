"use client";

import { Food } from "@/src/generated/prisma/client";

import { FoodDetails } from "../component/details";
import { useEffect, useState } from "react";
import { FoodCategoryWithFoods } from "../(admin)/admin/products/page";
import { Card } from "../component/ card";
import { Car } from "lucide-react";
import axios from "axios";

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

  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);
  console.log(categories);

  return (
    <div className="bg-gray-200 relative ">
      <img className="w-full h-[724px]" src="/hero1.png" alt="Logo" />
      <div className="px-20 py-10 container">
        <div className="">
          <div className="flex flex-col">
            {categories?.map((category, index) => (
              <div key={index} className="flex flex-col gap-5">
                <span className="text-[30px] py-4.5 font-semibold leading-9">
                  {category.categoryName}
                </span>

                <div className="flex gap-9">
                  {category?.foods?.map((e) => (
                    <Card
                      bg="bg-white"
                      food={e}
                      key={e.id}
                      onClick={() => setisVisible(true)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
