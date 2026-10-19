"use client";

import { Button } from "@/components/ui/button";

export default function ShopError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl">Se nos quemaron las papas</h1>
      <p className="mt-3 text-muted-foreground">
        No pudimos cargar el menú. Probá de nuevo en un momento.
      </p>
      <Button size="lg" className="mt-6" onClick={reset}>
        Reintentar
      </Button>
    </div>
  );
}