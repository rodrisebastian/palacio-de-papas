import { getActivePromotions } from "@/features/catalog/queries";
import { db } from "@/lib/db";
import { resolvePrice } from "@/lib/pricing";
import type { CartLineInput } from "@/schemas/cart";
import type { CartKind, PricedCart, PricedCartLine } from "@/types/cart";

type PriceSource = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
};

function toLine(
  kind: CartKind,
  source: PriceSource,
  quantity: number,
  resolved: { originalPrice: number; finalPrice: number },
): PricedCartLine {
  return {
    kind,
    id: source.id,
    slug: source.slug,
    name: source.name,
    imageUrl: source.imageUrl,
    quantity,
    unitOriginalPrice: resolved.originalPrice,
    unitPrice: resolved.finalPrice,
    lineTotal: resolved.finalPrice * quantity,
  };
}

export async function priceCart(items: CartLineInput[]): Promise<PricedCart> {
  const productIds = items
    .filter((item) => item.kind === "product")
    .map((item) => item.id);
  const comboIds = items
    .filter((item) => item.kind === "combo")
    .map((item) => item.id);

  const [products, combos, rules] = await Promise.all([
    db.product.findMany({
      where: {
        id: { in: productIds },
        isAvailable: true,
        category: { isActive: true },
      },
    }),
    db.combo.findMany({ where: { id: { in: comboIds }, isAvailable: true } }),
    getActivePromotions(),
  ]);

  const productsById = new Map(products.map((product) => [product.id, product]));
  const combosById = new Map(combos.map((combo) => [combo.id, combo]));

  const lines: PricedCartLine[] = [];
  const unavailable: PricedCart["unavailable"] = [];

  for (const item of items) {
    if (item.kind === "product") {
      const product = productsById.get(item.id);

      if (!product) {
        unavailable.push({ kind: "product", id: item.id });
        continue;
      }

      const resolved = resolvePrice(
        product.price,
        { productId: product.id, categoryId: product.categoryId },
        rules,
      );
      lines.push(toLine("product", product, item.quantity, resolved));
      continue;
    }

    const combo = combosById.get(item.id);

    if (!combo) {
      unavailable.push({ kind: "combo", id: item.id });
      continue;
    }

    const resolved = resolvePrice(combo.price, { comboId: combo.id }, rules);
    lines.push(toLine("combo", combo, item.quantity, resolved));
  }

  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitOriginalPrice * line.quantity,
    0,
  );
  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  return { lines, unavailable, subtotal, discountTotal: subtotal - total, total };
}