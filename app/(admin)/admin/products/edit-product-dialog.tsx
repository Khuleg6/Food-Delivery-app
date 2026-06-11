"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FoodCategoryWithFoods } from "./page";
import { Food } from "@/src/generated/prisma/client";
import { Trash } from "lucide-react";

export const FoodEditDialog = ({
  open,
  onClose,
  categories,
  food,
}: {
  open: boolean;
  onClose: () => void;
  categories: FoodCategoryWithFoods[];
  food: Food | null;
}) => {
  const [foodName, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (food) {
      setName(food.foodName);
      setPrice(food.price);
      setIngredients(food.ingredients);
      setImage(food.image);
      setCategoryId(food.categoryId);
    }
  }, [food, open]);

  const handleDelete = (id: string) => {
    if (!confirm("Энэ хоолыг устгахдаа итгэлтэй байна уу?")) return;
    setLoading(true);
    axios
      .delete("/api/foods", { data: { id } })
      .then(() => {
        alert("Амжилттай устгагдлаа");
        onClose();
        window.location.reload();
      })
      .catch(() => alert("Устгахад алдаа гарлаа."))
      .finally(() => setLoading(false));
  };

  const handleOnSubmit = () => {
    if (!food) return;

    // Шаардлагатай талбарууд бөглөгдсөн эсэхийг шалгах validation
    if (!foodName.trim() || !categoryId) {
      alert("Хоолны нэр болон категорийг заавал сонгоно уу.");
      return;
    }

    setLoading(true);

    // 💡 ЧУХАЛ ЗАСВАР: Хэрэв чиний бэкэнд /api/foods дотор PUT хүсэлтийг авдаг бол
    // ID-г нь body дотор ингээд дамжуулна. Бэкэнд нь [id]/route.ts бүтэцтэй бол
    // хаягийг `/api/foods/${food.id}` хэвээр үлдээж болно.
    axios
      .put("/api/foods", {
        id: food.id, // ID-г body дотор хамт шидлээ
        foodName,
        image,
        price: parseFloat(price.toString()) || 0, // 🌟 Тоо руу найдвартай хөрвүүлэв
        ingredients,
        categoryId,
      })
      .then(() => {
        alert("Хоолны мэдээлэл шинэчлэгдлээ 🎉");
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        console.error("PUT Error:", err);
        alert(err.response?.data?.error || "Засахад алдаа гарлаа");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit food</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              placeholder="Pizza..."
              value={foodName}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="category-1">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category-1" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem value={cat.id} key={cat.id}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="price-1">Price</Label>
            <Input
              id="price-1"
              name="price"
              placeholder="12.99"
              type="number"
              value={price || ""} // 0 үед хоосон харагдуулах эсвэл хэвийн харуулна
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Field>
          <Field>
            <Label htmlFor="ingredients-1">Ingredients</Label>
            <Textarea
              id="ingredients-1"
              name="ingredients"
              placeholder="Tomato, Cabbage, Cheese...."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="image-1">Image</Label>
            <input
              type="file"
              className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const form = new FormData();
                  form.append("file", e.target.files[0]);
                  axios.put("/api/upload", form).then((res) => {
                    setImage(res.data.url);
                  });
                }
              }}
            />
            {image && (
              <img
                src={image}
                alt={foodName}
                className="max-w-full h-32 object-cover mt-2 rounded-xl border border-zinc-800"
              />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter className="flex items-center justify-between gap-2 pt-4">
          <Button
            onClick={() => food && handleDelete(food.id)}
            variant="destructive"
            disabled={loading}
            size="icon"
          >
            <Trash className="w-4 h-4" />
          </Button>
          <div className="flex gap-2 ml-auto">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={loading} onClick={handleOnSubmit}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
