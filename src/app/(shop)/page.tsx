import { Suspense } from "react";
import { CatalogSkeleton } from "@/components/shop/catalog-skeleton";
import { HomeCatalog } from "@/components/shop/home-catalog";
import { HomeHero } from "@/components/shop/home-hero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<CatalogSkeleton />}>
        <HomeCatalog />
      </Suspense>
    </>
  );
}