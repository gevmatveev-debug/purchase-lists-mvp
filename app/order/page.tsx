"use client";
import { useCatalog } from "@/store/useCatalog";
import CategoryList from "@/components/CategoryList";
import { useOrder } from "@/store/useOrder";

export default function OrderPage() {
  const { catalog } = useCatalog();
  const { items, reset } = useOrder();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Оформить заказ</h1>

      {catalog.length === 0 ? (
        <div className="card p-6">
          <div>Каталог пуст. Импортируйте CSV на странице <a className="underline" href="/import">Импорт</a>.</div>
        </div>
      ) : (
        <>
          <CategoryList catalog={catalog} />
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Выбрано позиций: {items.length}</div>
            <div className="flex gap-3">
              <button className="btn" onClick={reset}>Очистить заказ</button>
              <a className="btn btn-primary" href="/review">Сформировать списки</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
