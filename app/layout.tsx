import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Purchase Lists",
  description: "Списки закупок по поставщикам",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          {/* Шапка */}
          <header className="border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <Link href="/order" className="font-semibold text-lg">
                Purchase Lists
              </Link>

              <nav className="flex gap-3 flex-wrap text-sm items-center">
                {/* Оформить заказ + маленькая иконка импорта */}
                <div className="flex items-center gap-1">
                  <Link href="/order" className="btn btn-ghost">
                    Оформить заказ
                  </Link>
                  <Link
                    href="/import"
                    aria-label="Импорт каталога"
                    className="text-slate-400 hover:text-slate-700 text-lg"
                    title="Импорт каталога"
                  >
                    ⚙️
                  </Link>
                </div>

                <Link href="/review" className="btn btn-ghost">
                  Списки по поставщикам
                </Link>
              </nav>
            </div>
          </header>

          {/* Контент */}
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
