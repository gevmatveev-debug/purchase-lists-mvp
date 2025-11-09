"use client";
import { formatSupplierBlock, toWhatsAppURL } from "@/lib/format";
import type { GroupedBySupplier } from "@/types";

export default function SupplierBlocks({
  grouped,
  venue,
  footerNote,
}: {
  grouped: GroupedBySupplier;
  venue?: string;
  footerNote?: string;
}) {
  const entries = Object.entries(grouped);
  if (entries.length === 0) {
    return <div className="text-slate-500">Нет позиций в заказе.</div>;
  }
  return (
    <div className="space-y-6">
      {entries.map(([sup, items]) => {
        const text = formatSupplierBlock(sup, items, { venue, footerNote });
        return (
          <div key={sup} className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold">{sup}</div>
              <div className="flex gap-2">
                <button
                  className="btn"
                  onClick={async () => {
                    await navigator.clipboard.writeText(text);
                    alert("Скопировано в буфер обмена");
                  }}
                >
                  Скопировать
                </button>
                <a className="btn btn-primary" href={toWhatsAppURL(text)} target="_blank">
                  Открыть WhatsApp
                </a>
              </div>
            </div>
            <pre className="whitespace-pre-wrap break-words pt-3 text-sm">{text}</pre>
          </div>
        );
      })}
    </div>
  );
}
