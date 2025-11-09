"use client";
import { useState } from "react";
import { parseCSV, parseSuppliersCSV } from "@/lib/csv";
import { useCatalog } from "@/store/useCatalog";
import { useSuppliers } from "@/store/useSuppliers";
import Link from "next/link";

export default function ImportPage() {
  const { catalog, setCatalog, clear } = useCatalog();
  const { phones, setPhones } = useSuppliers();
  const [loadingCat, setLoadingCat] = useState(false);
  const [loadingSup, setLoadingSup] = useState(false);

  const onCatalog = async (file?: File) => {
    if (!file) return;
    setLoadingCat(true);
    try {
      const data = await parseCSV(file);
      setCatalog(data);
    } finally {
      setLoadingCat(false);
    }
  };

  const onSuppliers = async (file?: File) => {
    if (!file) return;
    setLoadingSup(true);
    try {
      const map = await parseSuppliersCSV(file);
      setPhones(map);
    } finally {
      setLoadingSup(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="h1">Импорт каталога (CSV)</h1>

      <div className="card p-4 space-y-3">
        <div className="font-medium">Каталог продуктов</div>
        <div className="text-sm text-slate-500">
          Ожидаемые колонки: <code>sku, name, category, unit, supplier</code>
          <span className="text-slate-400"> (+ необязательные <code>pack_size</code>, <code>comment</code>)</span>.
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => onCatalog(e.target.files?.[0] || undefined)}
          disabled={loadingCat}
        />
        <div className="flex gap-2">
          <button className="btn" onClick={clear}>Очистить каталог</button>
          <Link className="btn btn-primary" href="/order">Перейти к оформлению</Link>
        </div>
      </div>

      <div className="card p-4 space-y-3">
        <div className="font-medium">Контакты поставщиков (для WhatsApp)</div>
        <div className="text-sm text-slate-500">
          CSV с колонками: <code>supplier, phone</code>. Телефон можно в любом виде — цифры, +7, пробелы — всё нормализуется.
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => onSuppliers(e.target.files?.[0] || undefined)}
          disabled={loadingSup}
        />
        {Object.keys(phones).length > 0 && (
          <div className="text-sm text-green-700">
            Загружено телефонов: {Object.keys(phones).length}
          </div>
        )}
      </div>
    </div>
  );
}
