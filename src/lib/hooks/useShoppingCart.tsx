'use client';
import { useEffect, useState } from "react";
import { CartItem } from "../products"; // Ensure you have a type definition for CartItem

export function useShoppingCart() {
  const [storedCart, setStoredCart] = useState<string>(localStorage.getItem("shopping-cart") || "[]");

  const parseStoredCart = (storedCart: string): CartItem[] => {
    try {
      return JSON.parse(storedCart);
    } catch {
      return [];
    }
  };

  const [cart, setCart] = useState<CartItem[]>(parseStoredCart(storedCart));

  useEffect(() => {
    setStoredCart(JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopping-cart", storedCart);
  }, [storedCart]);

  const total = () => cart.reduce((tot, cur) => tot + (cur.price * cur.count), 0);

  const empty = () => setCart([]);

  const setProduct = (productId: number, count: { add?: number; set?: number }, price?: number) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === productId);

      if (productIndex !== -1) {
        const updatedCart = [...prevCart];
        let newCount = count.set !== undefined ? count.set : updatedCart[productIndex].count + (count.add ?? 0);

        if (newCount <= 0) {
          updatedCart.splice(productIndex, 1);
        } else {
          updatedCart[productIndex] = { ...updatedCart[productIndex], count: newCount, price: price ?? updatedCart[productIndex].price };
        }

        return updatedCart;
      } else if (count.add ?? count.set ?? 0 > 0) {
        return [...prevCart, { id: productId, count: (count.add ?? 0) + (count.set ?? 0), price: price ?? 0 }];
      }

      return prevCart;
    });
  };

  return { cart, setCart, total, empty, setProduct };
}