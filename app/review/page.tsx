"use client";
import { useCatalog } from "@/store/useCatalog";
import { useOrder } from "@/store/useOrder";
import { groupBySupplier } from "@/lib/grouping";
import SupplierBlocks from "@/components/SupplierBlocks";
import { useState } from "react";
import { formatAll } from "@/lib/format";

export default function ReviewPage() {
  const { catalog } = useCatalog();
  const { items } = useOrder();

  const [venue, setVenue] = useState("СРЕДА");
  const [note, setNote] = useState("Доставить завтра к 11:00, черный ход.");

  if (catalog.length === 0) {
    return (
      <div className="card p-6">
        <div>Каталог пуст. Импортируйте CSV на странице <a className="underline" href="/import">Импорт</a>.</div>
      </div>
    );
  }

  const grouped = groupBySupplier(catalog, items);
  const allText = formatAll(grouped, { venue, footerNote: note });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Списки по поставщикам</h1>

      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-600">Название заведения</span>
            <input className="input" value={venue} onChange={e=>setVenue(e.target.value)} />
          </label>
          <label className="md:col-span-2 flex flex-col gap-1">
            <span className="text-sm text-slate-600">Комментарий (доставка/окно)</span>
            <input className="input" value={note} onChange={e=>setNote(e.target.value)} />
          </label>
        </div>
        <div className="flex gap-3">
          <button className="btn" onClick={async () => {
            await navigator.clipboard.writeText(allText);
            alert("Все списки скопированы в буфер обмена");
          }}>Скопировать всё</button>
        </div>
      </div>

      <SupplierBlocks grouped={grouped} venue={venue} footerNote={note} />
    </div>
  );
}
