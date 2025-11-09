"use client";
import { useMemo, useState } from "react";
import type { Catalog } from "@/types";
import QuantityInput from "./QuantityInput";
import { useOrder } from "@/store/useOrder";
import { ChevronDown } from "lucide-react";

export default function CategoryList({ catalog }: { catalog: Catalog }) {
  const { items, setQty } = useOrder();
  const [query, setQuery] = useState("");

  const qtyBySku = useMemo(() => Object.fromEntries(items.map(i => [i.sku, i.qty])), [items]);

  const cats = useMemo(() => {
    const filtered = query
      ? catalog.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      : catalog;
    const byCat = new Map<string, typeof filtered>();
    for (const p of filtered) {
      if (!byCat.has(p.category)) byCat.set(p.category, [] as any);
      (byCat.get(p.category) as any).push(p);
    }
    return Array.from(byCat.entries()).sort((a,b)=>a[0].localeCompare(b[0]));
  }, [catalog, query]);

  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-center">
        <input
          className="input w-full"
          placeholder="Поиск по названию…"
          value={query}
          onChange={e=>setQuery(e.target.value)}
        />
        <button className="btn" onClick={()=>setQuery("")}>Сброс</button>
      </div>

      {cats.map(([cat, items]) => (
        <details key={cat} className="card open:shadow-md">
          <summary className="flex cursor-pointer list-none items-center justify-between p-4">
            <div className="font-semibold">{cat}</div>
            <ChevronDown className="size-5" />
          </summary>
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((p) => (
                <div key={p.sku} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-slate-500">
                      {p.unit} • {p.supplier}
                      {p.pack_size ? ` • упак: ${p.pack_size}` : ""}
                    </div>
                  </div>
                  <QuantityInput
                    value={qtyBySku[p.sku] ?? 0}
                    onChange={(v) => setQty(p.sku, v)}
                  />
                </div>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
