"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "@/data/products";

const STORAGE_KEY = "anime-card-cart";

function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.quantity === "number" &&
        line.quantity > 0
    );
  } catch {
    return [];
  }
}

function saveCart(lines) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(lines);
  }, [lines, hydrated]);

  const addToCart = useCallback((productId, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === productId);
      if (existing) {
        return prev.map((l) =>
          l.id === productId
            ? { ...l, quantity: l.quantity + qty }
            : l
        );
      }
      return [...prev, { id: productId, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    const next = Math.max(0, Math.floor(Number(quantity)) || 0);
    setLines((prev) => {
      if (next === 0) return prev.filter((l) => l.id !== productId);
      return prev.map((l) =>
        l.id === productId ? { ...l, quantity: next } : l
      );
    });
  }, []);

  const removeLine = useCallback((productId) => {
    setLines((prev) => prev.filter((l) => l.id !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        if (!product) return null;
        return { ...product, quantity: line.quantity };
      })
      .filter(Boolean);
  }, [lines]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const count = useMemo(() => {
    return lines.reduce((sum, l) => sum + l.quantity, 0);
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      items,
      total,
      count,
      addToCart,
      setQuantity,
      removeLine,
      clearCart,
      hydrated,
    }),
    [
      lines,
      items,
      total,
      count,
      addToCart,
      setQuantity,
      removeLine,
      clearCart,
      hydrated,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
