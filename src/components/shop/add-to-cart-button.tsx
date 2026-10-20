"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItemKind } from "@/stores/cart-store";

type AddToCartButtonProps = {
  kind: CartItemKind;
  id: string;
  name: string;
  className?: string;
};

export function AddToCartButton({
  kind,
  id,
  name,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  function handleClick() {
    addItem(kind, id);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <Button
        type="button"
        size="lg"
        onClick={handleClick}
        aria-label={`Agregar ${name} al carrito`}
        className={`relative z-10 h-12 w-full text-base font-extrabold ${className ?? ""}`}
      >
        {added ? "¡Agregado!" : "Agregar"}
      </Button>
      <span role="status" className="sr-only">
        {added ? `${name} agregado al carrito` : ""}
      </span>
    </>
  );
}