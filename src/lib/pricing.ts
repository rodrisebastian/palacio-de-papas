export type PromotionRule = {
  title: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  productId: string | null;
  categoryId: string | null;
  comboId: string | null;
};

export type PriceTarget = {
  productId?: string;
  categoryId?: string;
  comboId?: string;
};

function discountFor(price: number, promotion: PromotionRule) {
  const raw =
    promotion.type === "PERCENTAGE"
      ? Math.round((price * promotion.value) / 100)
      : promotion.value;
  return Math.min(Math.max(raw, 0), price);
}

export function resolvePrice(
  price: number,
  target: PriceTarget,
  promotions: PromotionRule[],
) {
  let bestDiscount = 0;
  let bestPromotion: PromotionRule | null = null;

  for (const promotion of promotions) {
    const matches =
      (promotion.productId !== null &&
        promotion.productId === target.productId) ||
      (promotion.categoryId !== null &&
        promotion.categoryId === target.categoryId) ||
      (promotion.comboId !== null && promotion.comboId === target.comboId);

    if (!matches) {
      continue;
    }

    const discount = discountFor(price, promotion);
    if (discount > bestDiscount) {
      bestDiscount = discount;
      bestPromotion = promotion;
    }
  }

  return {
    originalPrice: price,
    finalPrice: price - bestDiscount,
    promotion: bestPromotion,
  };
}