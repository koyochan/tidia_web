"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string | number;
  priceId: string; // Stripe Price ID
  name: string;
  basePrice: number;
  modifiersPrice: number;
  totalPrice: number;
  priceString: string;
  color: string;
  material?: string;
  imageSrc: string;
  imageAlt: string;
  quantity: number;
  metadata?: Record<string, any>;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number, color?: string, material?: string) => void;
  updateQuantity: (id: string | number, quantity: number, color?: string, material?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("tidia-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("tidia-cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.material === item.material
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const removeItem = (id: string | number, color?: string, material?: string) => {
    setCart((prevCart) => prevCart.filter((i) => 
      !(i.id === id && i.color === color && i.material === material)
    ));
  };

  const updateQuantity = (id: string | number, quantity: number, color?: string, material?: string) => {
    if (quantity <= 0) {
      removeItem(id, color, material);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) => 
        (i.id === id && i.color === color && i.material === material) ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
