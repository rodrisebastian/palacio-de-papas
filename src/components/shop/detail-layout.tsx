import Link from "next/link";
import { FoodImage } from "@/components/shop/food-image";
import { Price } from "@/components/shop/price";
import type { CatalogItem } from "@/types/catalog";

type DetailLayoutProps = {
  item: CatalogItem;
  eyebrow: string;
  backHref: string;
  backLabel: string;
  children?: React.ReactNode;
};

export function DetailLayout({
  item,
  eyebrow,
  backHref,
  backLabel,
  children,
}: DetailLayoutProps) {
  const hasDiscount = item.finalPrice < item.originalPrice;
  const discountPercent = Math.round(
    (1 - item.finalPrice / item.originalPrice) * 100,
  );

  return (
    <div className="page-container py-8">
      <Link
        href={backHref}
        className="inline-flex min-h-11 items-center gap-2 font-bold text-ruby hover:underline"
      >
        <span aria-hidden="true">←</span>
        {backLabel}
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-gold">
          <FoodImage src={item.imageUrl} alt={item.name} />
          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-ruby px-4 py-1.5 text-base font-extrabold text-cream">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <div className="space-y-5">
          <p className="font-bold uppercase tracking-wide text-ruby">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-tight">{item.name}</h1>
          <Price size="lg" original={item.originalPrice} final={item.finalPrice} />
          {item.promotionTitle && (
            <p className="inline-block rounded-full bg-gold px-4 py-1 font-bold text-ink">
              {item.promotionTitle}
            </p>
          )}
          <p className="text-lg text-muted-foreground">{item.description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}