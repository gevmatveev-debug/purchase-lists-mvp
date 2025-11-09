"use client";
import { create } from "zustand";

type SupplierPhones = Record<string, string>;

type State = {
  phones: SupplierPhones;
  setPhones: (map: SupplierPhones) => void;
};

export const useSuppliers = create<State>((set) => ({
  phones: {},
  setPhones: (map) => set({ phones: map }),
}));

