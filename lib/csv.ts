import Papa from "papaparse";
import type { Catalog, Product } from "@/types";

export function parseCSV(file: File): Promise<Catalog> {
  return new Promise((resolve, reject) => {
    Papa.parse<Product>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = (res.data as any[]).map((raw) => ({
          sku: String(raw.sku ?? raw.SKU ?? raw.id ?? "").trim(),
          name: String(raw.name ?? raw.Название ?? "").trim(),
          category: String(raw.category ?? raw.Категория ?? "").trim(),
          unit: String(raw.unit ?? raw.ЕдИзм ?? raw.unit_name ?? "").trim(),
          supplier: String(raw.supplier ?? raw.Поставщик ?? "").trim(),
          pack_size: raw.pack_size ? String(raw.pack_size).trim() : null,
          comment: raw.comment ? String(raw.comment).trim() : null,
        })).filter(r => r.sku && r.name && r.category && r.unit && r.supplier);
        resolve(rows);
      },
      error: (err) => reject(err),
    });
  });
}
