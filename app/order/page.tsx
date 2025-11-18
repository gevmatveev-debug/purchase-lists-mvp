"use client";

import Link from "next/link";

import CategoryList from "@/components/CategoryList";
import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();

  const hasCatalog = catalog.length > 0;

  return (
    <div className="space-y-6">
      {/* Заголовок + иконка импорта */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          Оформить заказ
          <Link
            href="/import"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            title="Импорт каталога"
          >
            <span className="sr-only">Импорт каталога</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
              <path
                d="M4.93 6.21a1 1 0 0 1 1.37-.37l1.2.7a6.96 6.96 0 0 1 1.9-1.1l.26-1.38A1 1 0 0 1 10.64 3h2.72a1 1 0 0 1 .98.8l.26 1.38a6.96 6.96 0 0 1 1.9 1.1l1.2-.7a1 1 0 0 1 1.37.37l1.36 2.36a1 1 0 0 1-.23 1.26l-1.15.96c.08.37.12.76.12 1.15 0 .39-.04.78-.12 1.15l1.15.96a1 1 0 0 1 .23 1.26l-1.36 2.36a1 1 0 0 1-1.37.37l-1.2-.7a6.96 6.96 0 0 1-1.9 1.1l-.26 1.38a1 1 0 0 1-.98.8h-2.72a1 1 0 0 1-.98-.8l-.26-1.38a6.96 6.96 0 0 1-1.9-1.1l-1.2.7a1 1 0 0 1-1.37-.37L3.57 15.1a1 1 0 0 1 .23-1.26l1.15-.96A7.3 7.3 0 0 1 5 12c0-.39.04-.78.12-1.15L3.99 9.9a1 1 0 0 1-.23-1.26l1.17-2.43Z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          </Link>
        </h1>

        {/* Кнопка перехода к спискам по поставщикам */}
        <Link
          href="/suppliers"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Списки по поставщикам
        </Link>
      </div>

      {/* Подсказка по дробным количествам */}
      <p className="text-sm text-slate-500">
        Дробные количества вводите через точку или запятую (например, 0.3 кг мяты).
      </p>

      {!hasCatalog ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          Каталог не загружен. Нажми на значок шестерёнки рядом с заголовком и
          загрузите CSV-файл с продуктами.
        </div>
      ) : (
        <CategoryList catalog={catalog} />
      )}
    </div>
  );
}
