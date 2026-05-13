import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  qtyOf: (id: string) => number;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const ShopCtx = createContext<ShopState | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>("laurore_cart", []));
    setWishlist(readLS<string[]>("laurore_wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("laurore_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("laurore_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (p: Product) =>
    setCart((c) => {
      const existing = c.find((i) => i.product.id === p.id);
      if (existing) return c.map((i) => (i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...c, { product: p, quantity: 1 }];
    });

  const removeFromCart = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));

  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.product.id !== id) : c.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i))));

  const qtyOf = (id: string) => cart.find((i) => i.product.id === id)?.quantity ?? 0;

  const toggleWishlist = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const inWishlist = (id: string) => wishlist.includes(id);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <ShopCtx.Provider
      value={{ cart, wishlist, cartOpen, setCartOpen, addToCart, removeFromCart, setQty, qtyOf, toggleWishlist, inWishlist, cartTotal, cartCount }}
    >
      {children}
    </ShopCtx.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
