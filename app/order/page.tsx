"use client";

import { useCatalog } from "@/store/catalogStore";
import { useOrder } from "@/store/orderStore";
import CategoryList from "@/components/CategoryList";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();

  const [search, setSearch] = useState("");

  const filteredCatalog = catalog.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="space-y-6">

      {/* Заголовок */}
      <h1 className="text-2xl font-semibold">Оформить заказ</h1>

      {/* Поиск */}
      <div className="flex gap-2">
        <SearchInput
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSearch("")}
          className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
        >
          Сброс
        </button>
      </div>

      <p className="text-sm text-slate-500">
        Дробные количества вводите через точку или запятую (например, 0.3 кг мяты).
      </p>

      {/* Категории */}
      <div className="space-y-4">
        {filteredCatalog.map((category) => (
          <CategoryList
            key={category.name}
            category={category.name}
            products={category.products}
          />
        ))}
      </div>

      {/* Завершение заказа */}
      {items.length > 0 && (
        <button
          onClick={() => reset()}
          className="w-full mt-6 py-3 bg-slate-800 text-white rounded-lg text-center"
        >
          Завершить и очистить заказ
        </button>
      )}
    </div>
  );
}
