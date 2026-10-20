"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CartLineInput } from "@/schemas/cart";
import { useCartStore } from "@/stores/cart-store";
import type { PricedCart } from "@/types/cart";

async function fetchPricedCart(items: CartLineInput[]): Promise<PricedCart> {
  const response = await fetch("/api/cart/price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("No pudimos calcular el carrito");
  }

  return response.json();
}

export function usePricedCart() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const lines: CartLineInput[] = items.map(({ kind, id, quantity }) => ({
    kind,
    id,
    quantity,
  }));

  return useQuery({
    queryKey: ["priced-cart", lines],
    queryFn: () => fetchPricedCart(lines),
    enabled: hasHydrated && lines.length > 0,
    placeholderData: keepPreviousData,
  });
}