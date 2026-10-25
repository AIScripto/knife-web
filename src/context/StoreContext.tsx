import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type Currency = "USD" | "EUR" | "GBP" | "CAD";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1.0 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.79 },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36 },
};

export interface CartItem {
  product: Product;
  quantity: number;
  selectedEngraving?: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, engraving?: string) => void;
  removeFromCart: (handle: string) => void;
  updateQuantity: (handle: string, qty: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  cartCount: number;
  cartSubtotal: number;
  inspectedProduct: Product | null;
  setInspectedProduct: (p: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, quantity = 1, engraving?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.handle === product.handle);
      if (existing) {
        return prev.map((item) =>
          item.product.handle === product.handle
            ? { ...item, quantity: item.quantity + quantity, selectedEngraving: engraving || item.selectedEngraving }
            : item,
        );
      }
      return [...prev, { product, quantity, selectedEngraving: engraving }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (handle: string) => {
    setCart((prev) => prev.filter((item) => item.product.handle !== handle));
  };

  const updateQuantity = (handle: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(handle);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.handle === handle ? { ...item, quantity: qty } : item)),
    );
  };

  const formatPrice = (priceInUSD: number) => {
    const config = CURRENCIES[currency];
    const converted = priceInUSD * config.rate;
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        currency,
        setCurrency,
        formatPrice,
        cartCount,
        cartSubtotal,
        inspectedProduct,
        setInspectedProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
