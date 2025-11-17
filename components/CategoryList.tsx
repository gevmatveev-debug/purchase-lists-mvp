"use client";

import { useMemo, useState } from "react";
import type { Catalog } from "@/types";
import QuantityInput from "./QuantityInput";
import { useOrder } from "@/store/useOrder";
import { ChevronDown } from "lucide-react";

const DECIMAL_UNITS = new Set([
  "кг",
  "кг.",
  "г",
  "гр",
  "гр.",
  "грамм",
  "л",
  "л.",
  "мл",
  "kg",
  "g",
  "l",
  "ml",
]);

function stepForUnit(unit: string) {
  const u = unit.toLowerCase().trim();
  if (DECIMAL_UNITS.has(u)) return 0.1;
  return 1;
}

function allowDecimal(unit: string) {
  const u = unit.toLowerCase().trim();
  return DECIMAL_UNITS.has(u);
}

export default function CategoryList({ catalog }: { catalog: Catalog }) {
  const { items, setQty } = useOrder();
  const [query, setQuery] = useState("");

  const qtyBySku = useMemo(
    () => Object.fromEntries(items.map((i) => [i.sku, i.qty])),
    [items]
  );

  const cats = useMemo(() => {
    const filtered = query
      ? catalog.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : catalog;

    const byCat = new Map<string, typeof filtered>();
    for (const p of filtered) {
      if (!byCat.has(p.category)) byCat.set(p.category, [] as any);
      (byCat.get(p.category) as any).push(p);
    }

    return Array.from(byCat.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [catalog, query]);

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div className="flex gap-3 items-center">
        <input
          className="input w-full"
          placeholder="Поиск по названию…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" onClick={() => setQuery("")}>
          Сброс
        </button>
      </div>

      <div className="text-sm text-slate-500">
        Дробные количества вводите через точку или запятую
        (например, <span className="font-mono">0,3</span> кг мяты).
      </div>

      {cats.map(([cat, products]) => (
        <details key={cat} className="card open:shadow-md">
          <summary className="flex cursor-pointer list-none items-center justify-between p-4">
            <div className="font-semibold">{cat}</div>
            <ChevronDown className="size-5" />
          </summary>

          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {products.map((p) => (
                <div
                  key={p.sku}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="min-w-0">
                    <div className="font-medium">
                      {/* название БЕЗ truncate, в несколько строк */}
                      {p.name}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      ед.: {p.unit} • {p.supplier}
                      {p.pack_size ? ` • упак: ${p.pack_size}` : ""}
                    </div>
                  </div>

                  {/* на телефоне блок с количеством уедет ВНИЗ карточки */}
                  <div className="md:self-end">
                    <QuantityInput
                      value={qtyBySku[p.sku] ?? 0}
                      onChange={(v) => setQty(p.sku, v)}
                      unit={p.unit}
                      allowDecimal={allowDecimal(p.unit)}
                      step={stepForUnit(p.unit)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
