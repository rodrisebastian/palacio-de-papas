"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";

export function CartLink() {
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const label =
    count === 0
      ? "Carrito vacío"
      : `Carrito, ${count} ${count === 1 ? "producto" : "productos"}`;

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 hover:bg-gold hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6" />
      </svg>
      {count > 0 && (
        <span className="min-w-6 rounded-full bg-ruby px-2 py-0.5 text-center text-sm font-extrabold text-cream">
          {count}
        </span>
      )}
    </Link>
  );
}