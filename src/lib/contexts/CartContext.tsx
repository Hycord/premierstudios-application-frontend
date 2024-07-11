'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../products'; // Ensure you have a type definition for CartItem

interface CartContextType {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    total: () => number;
    empty: () => void;
    setProduct: (productId: number, count: { add?: number; set?: number }, price?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    'use client';

    const [storedCart, setStoredCart] = useState<string>(typeof window == "undefined" ? "[]" : window.localStorage.getItem("shopping-cart") ?? "[]");

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
        if(typeof window !== "undefined") window.localStorage.setItem("shopping-cart", storedCart);
    }, [storedCart]);

    const total = () => cart.reduce((tot, cur) => tot + (cur.price * cur.count), 0);

    const empty = () => setCart([]);

    const setProduct = (productId: number, count: { add?: number; set?: number }, price?: number, discount?: number) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item.id === productId);

            if (productIndex !== -1) {
                const updatedCart = [...prevCart];
                let newCount = count.set !== undefined ? count.set : updatedCart[productIndex].count + (count.add ?? 0);

                if (newCount <= 0) {
                    updatedCart.splice(productIndex, 1);
                } else {
                    updatedCart[productIndex] = { ...updatedCart[productIndex],count: newCount, price: price ?? updatedCart[productIndex].price };
                }

                return updatedCart;
            } else if (count.add ?? count.set ?? 0 > 0) {
                return [...prevCart, { discount: discount ?? 0, id: productId, count: (count.add ?? 0) + (count.set ?? 0), price: price ?? 0 }];
            }

            return prevCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, setCart, total, empty, setProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    'use client';

    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};