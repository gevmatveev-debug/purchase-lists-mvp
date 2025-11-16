"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderItem = {
  sku: string;
  qty: number;
};

type State = {
  items: OrderItem[];
  setQty: (sku: string, qty: number) => void;
  setItems: (items: OrderItem[]) => void;
  clear: () => void;
};

export const useOrder = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      // установить количество для конкретного SKU
      setQty: (sku, qty) =>
        set((state) => {
          const without = state.items.filter((i) => i.sku !== sku);
          if (qty <= 0) {
            return { items: without };
          }
          return { items: [...without, { sku, qty }] };
        }),
      // полностью заменить заказ (при повторении из истории)
      setItems: (items) => set({ items }),
      // очистить заказ
      clear: () => set({ items: [] }),
    }),
    {
      name: "purchase-lists-order", // ключ в localStorage
    }
  )
);
