"use client";
import { parseCSV } from "@/lib/csv";
import { useCatalog } from "@/store/useCatalog";

export default function ImportPage() {
  const { catalog, setCatalog, clear } = useCatalog();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Импорт каталога (CSV)</h1>

      <div className="card p-6 space-y-4">
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const rows = await parseCSV(file);
            setCatalog(rows);
          }}
        />
        <div className="text-sm text-slate-600">
          Ожидаемые колонки: <code>sku, name, category, unit, supplier</code> (+ необязательные <code>pack_size, comment</code>).
        </div>
        <div className="flex gap-3">
          <button className="btn" onClick={clear}>Очистить каталог</button>
          <a className="btn btn-primary" href="/order">Перейти к оформлению</a>
        </div>
      </div>

      <div className="card p-6">
        <div className="font-medium mb-2">Текущий каталог:</div>
        <div className="text-sm text-slate-500 mb-3">{catalog.length} позиций</div>
        <div className="max-h-[400px] overflow-auto text-sm">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="p-2">SKU</th>
                <th className="p-2">Название</th>
                <th className="p-2">Категория</th>
                <th className="p-2">Ед.</th>
                <th className="p-2">Поставщик</th>
              </tr>
            </thead>
            <tbody>
              {catalog.slice(0, 200).map((p) => (
                <tr key={p.sku} className="border-t">
                  <td className="p-2">{p.sku}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.unit}</td>
                  <td className="p-2">{p.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
