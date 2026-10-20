"use client";

import Link from "next/link";
import { FoodImage } from "@/components/shop/food-image";
import { Button } from "@/components/ui/button";
import { usePricedCart } from "@/features/cart/use-priced-cart";
import { MAX_NOTE_LENGTH, MAX_QUANTITY } from "@/lib/cart-limits";
import { formatArs } from "@/lib/format";
import { useCartStore } from "@/stores/cart-store";
import type { CartKind } from "@/types/cart";

const stepperClass =
  "inline-flex size-11 items-center justify-center rounded-full border-2 border-ink text-xl font-extrabold hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40";

function lineHref(kind: CartKind, slug: string) {
  return kind === "product" ? `/product/${slug}` : `/combo/${slug}`;
}

function CartSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando el carrito"
      className="grid gap-8 lg:grid-cols-[1fr_24rem]"
    >
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </div>
      <div className="h-56 animate-pulse rounded-3xl bg-muted" />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center">
      <p className="font-display text-2xl">Tu carrito está vacío</p>
      <p className="mt-2 text-muted-foreground">Sumá algo rico del menú.</p>
      <Link
        href="/#menu"
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ruby px-8 text-lg font-extrabold text-cream hover:bg-ink"
      >
        Ver el menú
      </Link>
    </div>
  );
}

function CartError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-border bg-card px-6 py-14 text-center"
    >
      <p className="font-display text-2xl">No pudimos calcular tu carrito</p>
      <p className="mt-2 text-muted-foreground">
        Revisá tu conexión y probá de nuevo.
      </p>
      <Button type="button" size="lg" className="mt-6" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}

export function CartView() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const setNote = useCartStore((state) => state.setNote);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const { data, isPending, isError, isFetching, refetch } = usePricedCart();

  if (!hasHydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  if (isError) {
    return <CartError onRetry={() => void refetch()} />;
  }

  if (isPending) {
    return <CartSkeleton />;
  }

  const unavailable = data.unavailable;

  function removeUnavailable() {
    for (const item of unavailable) {
      removeItem(item.kind, item.id);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <div className="space-y-4">
        {data.unavailable.length > 0 && (
          <div
            role="alert"
            className="rounded-2xl border-2 border-ruby bg-card p-4"
          >
            <p className="font-bold">Algunos productos ya no están disponibles.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-3 min-h-11"
              onClick={removeUnavailable}
            >
              Quitarlos del carrito
            </Button>
          </div>
        )}

        <ul className="space-y-4" aria-busy={isFetching}>
          {data.lines.map((line) => {
            const stored = items.find(
              (item) => item.kind === line.kind && item.id === line.id,
            );

            if (!stored) {
              return null;
            }

            const noteId = `note-${line.kind}-${line.id}`;
            const hasDiscount = line.unitPrice < line.unitOriginalPrice;

            return (
              <li
                key={`${line.kind}-${line.id}`}
                className="rounded-2xl border border-border bg-card p-3 sm:p-4"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gold sm:size-24">
                    <FoodImage src={line.imageUrl} alt={line.name} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h2 className="font-display text-lg leading-tight">
                      <Link
                        href={lineHref(line.kind, line.slug)}
                        className="hover:underline"
                      >
                        {line.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {formatArs(line.unitPrice)} c/u
                      {hasDiscount && (
                        <s className="ml-2">
                          <span className="sr-only">Precio original </span>
                          {formatArs(line.unitOriginalPrice)}
                        </s>
                      )}
                    </p>
                  </div>
                  <p className="text-lg font-extrabold">
                    {formatArs(line.lineTotal)}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label={`Cantidad de ${line.name}`}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${line.name}`}
                      onClick={() =>
                        setQuantity(line.kind, line.id, stored.quantity - 1)
                      }
                      className={stepperClass}
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      className="min-w-8 text-center text-lg font-extrabold"
                    >
                      {stored.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Agregar una unidad de ${line.name}`}
                      disabled={stored.quantity >= MAX_QUANTITY}
                      onClick={() =>
                        setQuantity(line.kind, line.id, stored.quantity + 1)
                      }
                      className={stepperClass}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.kind, line.id)}
                    className="min-h-11 px-2 font-bold text-ruby underline underline-offset-4"
                  >
                    Quitar<span className="sr-only"> {line.name}</span>
                  </button>
                </div>

                <div className="mt-3">
                  <label htmlFor={noteId} className="text-sm font-bold">
                    Nota para este producto (opcional)
                  </label>
                  <textarea
                    id={noteId}
                    value={stored.note}
                    maxLength={MAX_NOTE_LENGTH}
                    rows={2}
                    placeholder="Ej: sin sal, salsa aparte"
                    onChange={(event) =>
                      setNote(line.kind, line.id, event.target.value)
                    }
                    className="mt-1 w-full rounded-xl border-2 border-border bg-background p-3 text-base"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={clear}
          className="min-h-11 font-bold text-muted-foreground underline underline-offset-4 hover:text-ruby"
        >
          Vaciar carrito
        </button>
      </div>

      <aside
        aria-labelledby="summary-title"
        className="rounded-3xl border border-border bg-card p-5 lg:sticky lg:top-24"
      >
        <h2 id="summary-title" className="font-display text-2xl">
          Resumen
        </h2>
        <dl className={`mt-4 space-y-2 ${isFetching ? "opacity-60" : ""}`}>
          <div className="flex justify-between gap-4">
            <dt>Subtotal</dt>
            <dd>{formatArs(data.subtotal)}</dd>
          </div>
          {data.discountTotal > 0 && (
            <div className="flex justify-between gap-4 font-bold text-ruby">
              <dt>Descuentos</dt>
              <dd>−{formatArs(data.discountTotal)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 text-muted-foreground">
            <dt>Envío</dt>
            <dd>Se calcula al confirmar</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-3 text-2xl font-extrabold">
            <dt>Total</dt>
            <dd>{formatArs(data.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}