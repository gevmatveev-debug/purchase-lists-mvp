"use client";

import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";
import CategoryList from "@/components/CategoryList";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();

  return (
    <div className="space-y-6">
      {/* Заголовок + шестерёнка справа */}
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
          <button
            onClick={reset}
            className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300"
          >
            Сброс
          </button>
        )}
      </div>

      <p className="text-slate-500">
        Дробные количества вводите через точку или запятую (например, 0.3 кг
        мяты).
      </p>

      {/* Категории */}
      <div className="space-y-4">
        {catalog.map((category) => (
          <CategoryList
            key={category.name}
            category={category.name}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
}
