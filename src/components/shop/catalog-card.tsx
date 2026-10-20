import Link from "next/link";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { FoodImage } from "@/components/shop/food-image";
import { Price } from "@/components/shop/price";
import type { CatalogItem } from "@/types/catalog";

type CatalogCardProps = {
  item: CatalogItem;
};

export function CatalogCard({ item }: CatalogCardProps) {
  const hasDiscount = item.finalPrice < item.originalPrice;
  const discountPercent = Math.round(
    (1 - item.finalPrice / item.originalPrice) * 100,
  );
  const href =
    item.kind === "product" ? `/product/${item.slug}` : `/combo/${item.slug}`;

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md has-focus-visible:ring-4 has-focus-visible:ring-ruby">
      <div className="relative aspect-4/3 bg-gold">
        <FoodImage src={item.imageUrl} alt={item.name} />
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-ruby px-3 py-1 text-sm font-extrabold text-cream">
            {discountPercent}% OFF
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="font-display text-lg leading-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {item.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-auto space-y-3 pt-2">
          <Price original={item.originalPrice} final={item.finalPrice} />
          <AddToCartButton kind={item.kind} id={item.id} name={item.name} />
        </div>
      </div>
    </article>
  );
}