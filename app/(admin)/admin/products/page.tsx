"use client";
import { useEffect, useState } from "react";
import { Categorycard } from "./category-card";
import { Prisma } from "@/src/generated/prisma/client";
import { ProductSection } from "./product-section";
import axios from "axios";
import { FoodCreateDialog } from "./food-create-dialog";

export type FoodCategoryWithFoods = Prisma.FoodCategoryGetPayload<{
  include: { foods: true };
}>;

export default function AdminProductsPage() {
  const [active, setActive] = useState("All");

  const [isCategoryCreating, setIsCategoryCreating] = useState(false);
  const [categories, setCategories] = useState<FoodCategoryWithFoods[]>([]);
  const [creatingCategory, setCreatingCategory] = useState("");
  const visible =
    active === "All" ? categories : categories.filter((s) => s.id === active);

  const handleOnCreateCategory = (open?: boolean) => {
    setIsCategoryCreating(open || true);
  };
  const handleOnCreateProduct = (categoryId: string) => {
    setCreatingCategory(categoryId);
  };

  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Categorycard
        active={active}
        onSelect={setActive}
        onCreate={handleOnCreateCategory}
      />
      <div className="flex flex-col gap-4">
        {visible.map((section) => (
          <ProductSection
            category={section}
            key={section.id}
            onCreate={handleOnCreateProduct}
          />
        ))}
      </div>
      <FoodCreateDialog
        open={Boolean(creatingCategory)}
        onClose={() => {
          setCreatingCategory("");
        }}
        categories={categories}
        foodCategoryId={creatingCategory}
      />
    </div>
  );
}
