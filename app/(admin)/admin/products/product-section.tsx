import React from "react";
import { AddProduct } from "./add-product";
import { Cart } from "@/app/component/ cart";
import { FoodCategoryWithFoods } from "./page";

export const ProductSection = ({
  category,
  onCreate,
}: {
  category: FoodCategoryWithFoods;
  onCreate: (catId: string) => void;
}) => {
  return (
    <section>
      <div className="bg-white flex flex-col p-6 rounded-xl gap-4 shadow-sm border border-zinc-100">
        <h3 className="flex items-center gap-1">
          <span>{category.categoryName}</span>
          <span>({category.foods.length})</span>
        </h3>
        <div className="flex gap-5">
          <AddProduct
            category={category.categoryName}
            onClick={() => {
              onCreate(category.id);
            }}
          />
          {category.foods.map((food, i) => (
            <Cart
              onClick={() => {
                onclick;
              }}
              food={food}
              key={`${category.id}-${i}`}
              className="bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
