"use client";

import CategoryList from "@/components/CategoryList";
import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { reset } = useOrder();

  return (
    <div className="space-y-6">
      {/* Заголовок + шестерёнка импорта каталога */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          Оформить заказ
          <Link
            href="/import"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            title="Импорт каталога (загрузить CSV)"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </h1>

        <Link
          href="/suppliers"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Списки по поставщикам
        </Link>
      </div>

      {catalog.length === 0 ? (
        <p className="text-slate-500">
          Каталог пуст. Загрузите CSV-файл на странице импорта.
        </p>
      ) : (
        <CategoryList catalog={catalog} />
      )}
    </div>
  );
}
