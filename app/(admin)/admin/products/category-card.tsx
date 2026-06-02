"use client";
import { Prisma } from "@/src/generated/prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryManageDialog } from "./category-manage";

type Props = {
  active: string;
  onSelect: (id: string) => void;
  onCreate: () => void; // Энэ prop одоо хэрэггүй болсон ч хуучин кодонд байсан тул хэвээр үлдээв
};

type CategoryWithCount = Prisma.FoodCategoryGetPayload<{
  include: {
    _count: {
      select: {
        foods: true;
      };
    };
  };
}>;

export const Categorycard = ({ active, onSelect }: Props) => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isManageOpen, setIsManageOpen] = useState(false); // Удирдах диалогийн state

  // Бэкендээс дата татах функц (Нэмэх, засах, устгасны дараа шууд дуудна)
  const fetchCategories = () => {
    axios.get("/api/foods/categories").then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 43-р мөрний унадаг алдааг бүрмөсөн засаж хамгаалсан хэсэг
  const AllCount = categories.reduce((prev, next) => {
    return prev + (next._count?.foods || 0);
  }, 0);

  return (
    <section className="bg-white flex flex-col p-6 rounded-xl gap-4 shadow-sm border border-zinc-100">
      <h2 className="text-lg font-bold text-zinc-800">Dishes Category</h2>
      <div className="flex items-center gap-2 flex-wrap">
        {/* ALL DISHES ТОВЧЛУУР */}
        <button
          type="button"
          onClick={() => onSelect("All")}
          className={`inline-flex h-9 items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium transition ${
            active === "All"
              ? "border-red-500 text-red-500 bg-red-50/20"
              : "border-border text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <span>All dishes</span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${
              active === "All"
                ? "bg-red-500 text-white"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {AllCount}
          </span>
        </button>

        {/* КАТЕГОРИУД (Маш цэвэрхэн харагдацтай болсон) */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`inline-flex h-9 items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium transition ${
              active === cat.id
                ? "border-red-500 text-red-500 bg-red-50/20"
                : "border-border text-zinc-600 hover:border-zinc-300"
            }`}
          >
            <span>{cat.categoryName}</span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${
                active === cat.id
                  ? "bg-red-500 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {cat._count?.foods || 0}{" "}
              {/* 43-р мөрний алдааг бүрмөсөн зассан хэсэг */}
            </span>
          </button>
        ))}

        {/* МЕНЕЖЕР ЦОНХ НЭЭХ ГАНЦХАН НЭГДСЭН ТОВЧЛУУР */}
        <button
          onClick={() => setIsManageOpen(true)}
          type="button"
          aria-label="Manage categories"
          className="inline-flex size-9 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600 shadow-md shrink-0"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* БҮХ ҮЙЛДЛИЙГ БАГТААСАН НЭГДСЭН ДИАЛОГ ЦОНХ */}
      <CategoryManageDialog
        open={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        categories={categories}
        refreshData={fetchCategories}
      />
    </section>
  );
};
