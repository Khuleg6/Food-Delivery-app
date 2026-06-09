"use client";

import { Food } from "@/src/generated/prisma/client";

import { useEffect, useState } from "react";
import { createContext } from "vm";

export interface CartItem extends Food {
  quantity: number;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCard: (food: Food) => void;
  removeFromCart: (foodId: string) => void;
  deleteItem: (foodId: string) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("food-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveToLocalStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("food-cart", JSON.stringify(items));
  };
  const addToCard = (food: Food) => {
    const exist = cartItems.find((item) => item.id === food.id);
    if (exist) {
      const updated = cartItems.map((item) =>
        item.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : item,
      );
    }
  };
};
