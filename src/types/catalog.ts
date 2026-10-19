export type CatalogItem = {
  id: string;
  kind: "product" | "combo";
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
  originalPrice: number;
  finalPrice: number;
  promotionTitle: string | null;
};

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  products: CatalogItem[];
};