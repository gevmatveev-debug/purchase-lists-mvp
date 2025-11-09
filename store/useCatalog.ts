import { create } from "zustand";
import type { Catalog } from "@/types";

type CatalogState = {
  catalog: Catalog;
  setCatalog: (c: Catalog) => void;
  clear: () => void;
};

const STORAGE_KEY = "catalog";

export const useCatalog = create<CatalogState>((set) => ({
  catalog: typeof window !== "undefined" ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") : [],
  setCatalog: (c) => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    set({ catalog: c });
  },
  clear: () => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    set({ catalog: [] });
  },
}));
