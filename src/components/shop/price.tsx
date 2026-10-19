import { formatArs } from "@/lib/format";

type PriceProps = {
  original: number;
  final: number;
};

export function Price({ original, final }: PriceProps) {
  const hasDiscount = final < original;

  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-2xl font-extrabold text-ink">
        {formatArs(final)}
      </span>
      {hasDiscount && (
        <s className="text-base font-semibold text-muted-foreground">
          <span className="sr-only">Precio original </span>
          {formatArs(original)}
        </s>
      )}
    </p>
  );
}