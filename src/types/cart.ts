export type CartKind = "product" | "combo";

export type PricedCartLine = {
  kind: CartKind;
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  quantity: number;
  unitOriginalPrice: number;
  unitPrice: number;
  lineTotal: number;
};

export type PricedCart = {
  lines: PricedCartLine[];
  unavailable: { kind: CartKind; id: string }[];
  subtotal: number;
  discountTotal: number;
  total: number;
};