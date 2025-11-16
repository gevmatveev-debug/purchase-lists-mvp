"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/store/useOrder";
import { useCatalog } from "@/store/useCatalog";
import { useSuppliers } from "@/store/useSuppliers";

function groupBySupplier(rows: { supplier: string; line: string }[]) {
  const m = new Map<string, string[]>();
  for (const r of rows) {
    if (!m.has(r.supplier)) m.set(r.supplier, []);
    m.get(r.supplier)!.push(r.line);
  }
  return Array.from(m.entries()).map(([supplier, lines]) => ({ supplier, lines }));
}

function buildText(supplier: string, lines: string[], comment: string) {
  const header = `Заказ для: ${supplier}`;
  const body = lines.join("\n");
  const tail = comment ? `\nКомментарий: ${comment}` : "";
  return `${header}\n\n${body}${tail}`;
}

function waLink(phone: string, text: string) {
  const t = encodeURIComponent(text);
  const p = (phone || "").replace(/[^\d]/g, "");
  return p ? `https://wa.me/${p}?text=${t}` : `https://wa.me/?text=${t}`;
}

export default function ReviewPage() {
  const router = useRouter();
  const { items, clear } = useOrder();
  const { catalog } = useCatalog();
  const { phones } = useSuppliers();

  // строки вида "• Мука — 2 кг"
  const rows = useMemo(() => {
    const out: { supplier: string; line: string }[] = [];
    for (const it of items) {
      if (!it.qty || it.qty <= 0) continue;
      const p = catalog.find((c) => c.sku === it.sku);
      if (!p) continue;
      out.push({
        supplier: p.supplier,
        line: `• ${p.name} — ${it.qty} ${p.unit}`,
      });
    }
    return out;
  }, [items, catalog]);

  const groups = useMemo(() => groupBySupplier(rows), [rows]);

  // комментарии по каждому поставщику
  const [comments, setComments] = useState<Record<string, string>>({});
  const setComment = (s: string, v: string) =>
    setComments((prev) => ({ ...prev, [s]: v }));

  const handleEdit = () => {
    // вернуться к редактированию заказа, НЕ очищая данные
    router.push("/order");
  };

  const handleFinish = () => {
    // закончить: очистить заказ и перейти на главную
    clear();
    if (typeof window !== "undefined") {
      // на всякий случай чистим наш ключ в localStorage
      try {
        window.localStorage.removeItem("purchase-lists-order");
      } catch (e) {
        // игнорируем
      }
      window.location.href = "/";
    }
  };

  if (groups.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="h1">Списки по поставщикам</h1>
        <div className="card p-4">
          Нет позиций. Заполните количества на странице «Оформить заказ».
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="h1">Списки по поставщикам</h1>

      <div className="flex flex-wrap gap-2">
        <button className="btn" onClick={handleEdit}>
          Редактировать
        </button>
        <button className="btn" onClick={handleFinish}>
          Закончить
        </button>
      </div>

      {groups.map(({ supplier, lines }) => {
        const phone = phones[supplier] || "";
        const comment = comments[supplier] || "";
        const text = buildText(supplier, lines, comment);

        return (
          <div key={supplier} className="card p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold text-lg">{supplier}</div>
              {phone ? (
                <div className="text-sm text-slate-500">WhatsApp: +{phone}</div>
              ) : (
                <div className="text-sm text-slate-400">Телефон не указан</div>
              )}
            </div>

            <textarea
              className="textarea w-full h-28"
              placeholder="Комментарий для этого поставщика (например: завтра до 11:00, вход со двора)…"
              value={comment}
              onChange={(e) => setComment(supplier, e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              <button
                className="btn"
                onClick={async () => {
                  await navigator.clipboard.writeText(text);
                }}
              >
                Скопировать текст
              </button>
              <a
                className="btn btn-primary"
                href={waLink(phone, text)}
                target="_blank"
              >
                Открыть WhatsApp
              </a>
            </div>

            <pre className="bg-slate-50 p-3 rounded-md overflow-auto text-sm whitespace-pre-wrap">
{ text }
            </pre>
          </div>
        );
      })}
    </div>
  );
}
