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
  reset: () => void; // ← добавили reset, чтобы не ругался /order
};

export const useOrder = create<State>()(
  persist(
    (set, get) => ({
      items: [],

      // установить количество для SKU
      setQty: (sku, qty) =>
        set((state) => {
          const without = state.items.filter((i) => i.sku !== sku);
          if (qty <= 0) {
            return { items: without };
          }
          return { items: [...without, { sku, qty }] };
        }),

      // полностью заменить список (при повторе заказа и т.п.)
      setItems: (items) => set({ items }),

      // очистить заказ
      clear: () => set({ items: [] }),

      // старое API, которое ждёт страница /order
      // делаем то же самое, что clear
      reset: () => set({ items: [] }),
    }),
    {
      name: "purchase-lists-order", // ключ в localStorage
    }
  )
);
