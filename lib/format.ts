import type { GroupedBySupplier } from "@/types";

export function formatSupplierBlock(
  supplier: string,
  items: { product: { name: string; unit: string; pack_size?: string | null; comment?: string | null }; qty: number }[],
  opts?: { venue?: string; date?: string; footerNote?: string }
): string {
  const venue = opts?.venue ?? "Ресторан";
  const date = opts?.date ?? new Date().toLocaleDateString("ru-RU");
  const lines: string[] = [];
  lines.push(`Заказ от ${venue}, дата: ${date}`);
  lines.push(`Поставщик: ${supplier}`);
  lines.push("");
  items.forEach((it, i) => {
    const parts = [`${i + 1}) ${it.product.name} — ${it.qty} ${it.product.unit}`];
    if (it.product.pack_size) parts.push(`(${it.product.pack_size})`);
    if (it.product.comment) parts.push(`[${it.product.comment}]`);
    lines.push(parts.join(" "));
  });
  if (opts?.footerNote) {
    lines.push("");
    lines.push(`Комментарий: ${opts.footerNote}`);
  }
  return lines.join("\n");
}

export function formatAll(bySupplier: GroupedBySupplier, opts?: { venue?: string; date?: string; footerNote?: string }): string {
  const blocks: string[] = [];
  for (const [sup, items] of Object.entries(bySupplier)) {
    blocks.push(formatSupplierBlock(sup, items, opts));
  }
  return blocks.join("\n\n— — —\n\n");
}

export function toWhatsAppURL(text: string, phone?: string): string {
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  const q = new URLSearchParams({ text }).toString();
  return `${base}?${q}`;
}
