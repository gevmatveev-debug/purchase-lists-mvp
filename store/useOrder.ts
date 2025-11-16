"use client";

import { create } from "zustand";

export type OrderItem = {
  sku: string;
  name: string;
  category: string;
  unit: string;
  supplier: string;
  quantity: number;
};

type State = {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  reset: () => void; // ← добавили!
};

export const useOrder = create<State>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (sku) =>
    set((state) => ({
      items: state.items.filter((i) => i.sku !== sku),
    })),

  updateQuantity: (sku, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.sku === sku ? { ...i, quantity } : i
      ),
    })),

  reset: () =>
    set({
      items: [],
    }),
}));
