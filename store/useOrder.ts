import { create } from "zustand";
import type { OrderItem } from "@/types";

type OrderState = {
  items: OrderItem[];
  setQty: (sku: string, qty: number) => void;
  reset: () => void;
};

const STORAGE_KEY = "orderDraft";

export const useOrder = create<OrderState>((set, get) => ({
  items: typeof window !== "undefined" ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") : [],
  setQty: (sku, qty) => {
    const items = [...get().items];
    const idx = items.findIndex(i => i.sku === sku);
    if (qty <= 0) {
      if (idx >= 0) items.splice(idx, 1);
    } else {
      if (idx >= 0) items[idx].qty = qty;
      else items.push({ sku, qty });
    }
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    set({ items });
  },
  reset: () => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
}));
