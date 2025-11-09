import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purchase Lists MVP",
  description: "Списки закупки по поставщикам — MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b bg-white">
          <nav className="container flex items-center justify-between py-4">
            <div className="font-semibold">Purchase Lists</div>
            <div className="flex gap-3">
              <a className="btn" href="/import">Импорт каталога</a>
              <a className="btn" href="/order">Оформить заказ</a>
              <a className="btn" href="/review">Списки по поставщикам</a>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
