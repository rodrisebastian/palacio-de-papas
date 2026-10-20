import Link from "next/link";

export default function ShopNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl">Este plato no está en el menú</h1>
      <p className="mt-3 text-muted-foreground">
        Puede que ya no esté disponible o que el link esté mal.
      </p>
      <Link
        href="/#menu"
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ruby px-8 text-lg font-extrabold text-cream hover:bg-ink"
      >
        Volver al menú
      </Link>
    </div>
  );
}