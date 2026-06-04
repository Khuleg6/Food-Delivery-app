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

// Засах гэж буй хоолны Type-ийг тодорхойлно
interface FoodType {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId: string;
}

export const FoodEditDialog = ({
  open,
  onClose,
  categories,
  food, // Засах гэж буй хоолны объект орж ирнэ
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
  const [categoryId, setCategoryId] = useState(""); // Категорийн id-г state болгов
  const [loading, setLoading] = useState(false);

  // Dialog нээгдэх үед хуучин датаг оноож өгнө
  useEffect(() => {
    if (food) {
      setName(food.foodName);
      setPrice(food.price);
      setIngredients(food.ingredients);
      setImage(food.image);
      setCategoryId(food.categoryId);
    }
  }, [food, open]); // food эсвэл open өөрчлөгдөх бүрт ажиллана

  const handleOnSubmit = () => {
    if (!food) return;

    setLoading(true);
    // PUT хүсэлтээр тухайн хоолны ID-г хаяг дээр эсвэл дата дотор явуулна
    axios
      .put(`/api/foods/${food.id}`, {
        foodName,
        image,
        price,
        ingredients,
        categoryId,
      })
      .then((res) => {
        alert("Хоолны мэдээлэл шинэчлэгдлээ");
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch(({ response }) => {
        alert("Алдаа гарлаа");
        setLoading(false);
      });
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
            {/* onValueChange-ээр сонгосон категорийг хадгална */}
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category-1" className="w-full max-w-48">
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
              value={price}
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
                className="max-w-full h-auto mt-2 rounded"
              />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading} onClick={handleOnSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
