"use client";

import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";
import CategoryList from "@/components/CategoryList";
import SearchInput from "@/components/SearchInput";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();

  return (
    <div className="space-y-6">
      {/* Заголовок + шестерёнка */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          Оформить заказ
          <a
            href="/import"
            title="Импорт каталога"
            className="text-slate-400 hover:text-slate-600 text-lg"
          >
            ⚙️
          </a>
        </h1>

        {Object.keys(items).length > 0 && (
