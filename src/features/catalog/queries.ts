import { connection } from "next/server";
import { db } from "@/lib/db";
import { resolvePrice, type PromotionRule } from "@/lib/pricing";
import type {
  CatalogCategory,
  CatalogItem,
  ComboDetail,
  ProductDetail,
} from "@/types/catalog";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  categoryId: string;
};

type ComboRow = Omit<ProductRow, "categoryId">;

async function getActivePromotions(): Promise<PromotionRule[]> {
  await connection();
  const now = new Date();

  return db.promotion.findMany({
    where: {
      isActive: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
      ],
    },
  });
}

function toProductItem(
  product: ProductRow,
  rules: PromotionRule[],
): CatalogItem {
  const resolved = resolvePrice(
    product.price,
    { productId: product.id, categoryId: product.categoryId },
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
}

function toComboItem(combo: ComboRow, rules: PromotionRule[]): CatalogItem {
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
}

export async function getHomeData() {
  await connection();

  const [categories, combos, rules] = await Promise.all([
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
    getActivePromotions(),
  ]);

  const pricedCategories: CatalogCategory[] = categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      products: category.products.map((product) =>
        toProductItem(product, rules),
      ),
    }))
    .filter((category) => category.products.length > 0);

  const pricedCombos = combos.map((combo) => toComboItem(combo, rules));

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

export async function getProductDetail(
  slug: string,
): Promise<ProductDetail | null> {
  await connection();

  const product = await db.product.findFirst({
    where: { slug, isAvailable: true, category: { isActive: true } },
    include: { category: true },
  });

  if (!product) {
    return null;
  }

  const [rules, relatedProducts] = await Promise.all([
    getActivePromotions(),
    db.product.findMany({
      where: {
        categoryId: product.categoryId,
        isAvailable: true,
        id: { not: product.id },
      },
      orderBy: { name: "asc" },
      take: 4,
    }),
  ]);

  return {
    ...toProductItem(product, rules),
    categoryName: product.category.name,
    categorySlug: product.category.slug,
    related: relatedProducts.map((related) => toProductItem(related, rules)),
  };
}

export async function getComboDetail(
  slug: string,
): Promise<ComboDetail | null> {
  await connection();

  const combo = await db.combo.findFirst({
    where: { slug, isAvailable: true },
    include: {
      items: {
        include: { product: true },
        orderBy: { product: { name: "asc" } },
      },
    },
  });

  if (!combo) {
    return null;
  }

  const rules = await getActivePromotions();
  const separatePrice = combo.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return {
    ...toComboItem(combo, rules),
    items: combo.items.map((item) => ({
      slug: item.product.slug,
      name: item.product.name,
      quantity: item.quantity,
    })),
    separatePrice,
  };
}