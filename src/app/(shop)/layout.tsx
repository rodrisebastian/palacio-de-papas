import { Suspense } from "react";
import { CartHydrator } from "@/components/shop/cart-hydrator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CartHydrator />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="min-h-[60vh]">
        {children}
      </main>
      <Suspense
        fallback={<div className="mt-16 h-48 bg-ink" aria-hidden="true" />}
      >
        <SiteFooter />
      </Suspense>
    </>
  );
}