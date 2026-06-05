import React from "react";
import { AddProduct } from "./add-product";

import { FoodCategoryWithFoods } from "./page";
import { ProductCard } from "./product-card";

export const ProductSection = ({
  category,
  onCreate,
  onEdit,
}: {
  category: FoodCategoryWithFoods;
  onCreate: (catId: string) => void;
  onEdit: (food: any) => void;
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
            <ProductCard
              onClick={() => {
                onEdit(food);
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
