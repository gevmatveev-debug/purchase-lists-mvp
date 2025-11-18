"use client";

import Link from "next/link";
import { useState } from "react";

import CategoryList from "@/components/CategoryList";
import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();
  const [search, setSearch] = useState("");

  const hasItems = items.length > 0;

  // Фильтрация по поиску
  const filteredCatalog = catalog.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  // Скрываем категории, в которых после поиска не осталось позиций
  const visibleCatalog = filteredCatalog.filter(
    (category) => category.products.length > 0
  );

  return (
    <div className="space-y-6">
      {/* Заголовок + шестерёнка */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/order">
            <h1 className="text-2xl font-semibold cursor-pointer">
              Оформить заказ
            </h1>
          </Link>

          {/* маленькая иконка импорта каталога справа от заголовка */}
          <Link
            href="/import"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
            aria-label="Импорт каталога"
          >
            ⚙️
          </Link>
        </div>

        {/* Навигация */}
        <nav className="flex flex-wrap gap-2">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Оформить заказ
          </Link>
          <Link
            href="/review"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Списки по поставщикам
          </Link>
        </nav>
      </header>

      {/* Поиск + сброс */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          type="button"
          onClick={() => {
            setSearch("");
            reset();
          }}
          className="mt-2 sm:mt-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Сброс
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Дробные количества вводите через точку или запятую (например, 0,3 кг
        мяты).
      </p>

      {/* Список категорий */}
      {visibleCatalog.map((category) => (
        <CategoryList
          key={category.name}
          category={category.name}
          products={category.products}
        />
      ))}

      {/* Сообщение, если ничего не выбрано */}
      {!hasItems && (
        <p className="text-sm text-slate-500">Пока ничего не выбрано.</p>
      )}
    </div>
  );
}
