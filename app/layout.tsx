import "@/css/style.css";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sortedCategories } from "@/lib/categories";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="site-wrapper">
          <SessionProvider>
            <Header categories={sortedCategories} />
            <div className="site-content">{children}</div>
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
