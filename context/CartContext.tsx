"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Food } from "@/src/generated/prisma/client";

export interface CartItem extends Food {
  quantity: number;
}

// Контекстын төрөлд isOpen болон түүнийг өөрчлөх функцуудыг нэмлээ
interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean; // САГС НЭЭЛТТЭЙ ЭСЭХ (ШИНЭ)
  setIsOpen: (open: boolean) => void; // САГСЫГ НЭЭЖ ХААХ ФУНКЦ (ШИНЭ)
  addToCart: (food: Food, count?: number) => void;
  removeFromCart: (foodId: string) => void;
  deleteItem: (foodId: string) => void;
  clearCart: () => void;
  address: string;
  setAddress: (address: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Анх сагс хаалттай байна
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const savedCart = localStorage.getItem("food-cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const saveToLocalStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("food-cart", JSON.stringify(items));
  };

  // Хэрэглэгч хоол нэмэх үед сагсыг хажуунаас нь автоматаар гулсаад нээгддэг болгоё
  const addToCart = (food: Food, count: number = 1) => {
    setIsOpen(true); // Хоол нэмэгдэнгүүт сагсыг НЭЭНЭ!

    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === food.id);
      let newItems: CartItem[];
      if (exist) {
        newItems = prevItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + count }
            : item,
        );
      } else {
        newItems = [...prevItems, { ...food, quantity: count }];
      }
      localStorage.setItem("food-cart", JSON.stringify(newItems));
      return newItems;
    });

    // const exist = cartItems.find((item) => item.id === food.id);
    // if (exist) {
    //   const updated = cartItems.map((item) =>
    //     item.id === food.id
    //       ? { ...exist, quantity: exist.quantity + count }
    //       : item,
    //   );
    //   saveToLocalStorage(updated);
    // } else {
    //   saveToLocalStorage([...cartItems, { ...food, quantity: count }]);
    // }
  };

  const removeFromCart = (foodId: string) => {
    const exist = cartItems.find((item) => item.id === foodId);
    if (!exist) return;
    if (exist.quantity === 1) {
      const updated = cartItems.filter((item) => item.id !== foodId);
      saveToLocalStorage(updated);
    } else {
      const updated = cartItems.map((item) =>
        item.id === foodId ? { ...exist, quantity: exist.quantity - 1 } : item,
      );
      saveToLocalStorage(updated);
    }
  };

  const deleteItem = (foodId: string) => {
    const updated = cartItems.filter((item) => item.id !== foodId);
    saveToLocalStorage(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("food-cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        deleteItem,
        clearCart,
        address,
        setAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart error");
  return context;
};
