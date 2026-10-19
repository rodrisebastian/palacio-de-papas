import { connection } from "next/server";
import { db } from "@/lib/db";
import { resolvePrice, type PromotionRule } from "@/lib/pricing";
import type { CatalogCategory, CatalogItem } from "@/types/catalog";

export async function getHomeData() {
  await connection();
  const now = new Date();

  const [categories, combos, promotions] = await Promise.all([
    db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        products: { where: { isAvailable: true }, orderBy: { name: "asc" } },
      },
    }),
    db.combo.findMany({
      where: { isAvailable: true },
      orderBy: { price: "asc" },
    }),
    db.promotion.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
          { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
        ],
      },
    }),
  ]);

  const rules: PromotionRule[] = promotions;

  const pricedCategories: CatalogCategory[] = categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      products: category.products.map((product): CatalogItem => {
        const resolved = resolvePrice(
          product.price,
          { productId: product.id, categoryId: category.id },
          rules,
        );
        return {
          id: product.id,
          kind: "product",
          slug: product.slug,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          originalPrice: resolved.originalPrice,
          finalPrice: resolved.finalPrice,
          promotionTitle: resolved.promotion?.title ?? null,
        };
      }),
    }))
    .filter((category) => category.products.length > 0);

  const pricedCombos = combos.map((combo): CatalogItem => {
    const resolved = resolvePrice(combo.price, { comboId: combo.id }, rules);
    return {
      id: combo.id,
      kind: "combo",
      slug: combo.slug,
      name: combo.name,
      description: combo.description,
      imageUrl: combo.imageUrl,
      originalPrice: resolved.originalPrice,
      finalPrice: resolved.finalPrice,
      promotionTitle: resolved.promotion?.title ?? null,
    };
  });

  const deals = [
    ...pricedCategories.flatMap((category) => category.products),
    ...pricedCombos,
  ].filter((item) => item.finalPrice < item.originalPrice);

  return { categories: pricedCategories, combos: pricedCombos, deals };
}

export async function getStoreSettings() {
  await connection();
  return db.storeSettings.findUnique({ where: { id: 1 } });
}