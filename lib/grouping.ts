import type { Catalog, GroupedBySupplier, OrderItem, Product } from "@/types";

export function indexBySku(catalog: Catalog): Record<string, Product> {
  return Object.fromEntries(catalog.map(p => [p.sku, p]));
}

export function groupBySupplier(catalog: Catalog, items: OrderItem[]): GroupedBySupplier {
  const idx = indexBySku(catalog);
  const bySup: GroupedBySupplier = {};
  for (const it of items) {
    if (!it.qty || it.qty <= 0) continue;
    const p = idx[it.sku];
    if (!p) continue;
    const key = p.supplier || "—";
    if (!bySup[key]) bySup[key] = [];
    bySup[key].push({ product: p, qty: it.qty });
  }
  return bySup;
}

export function categories(catalog: Catalog): string[] {
  return Array.from(new Set(catalog.map(p => p.category))).sort((a,b)=>a.localeCompare(b));
}
