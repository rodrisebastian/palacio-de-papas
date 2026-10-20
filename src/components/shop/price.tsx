import { formatArs } from "@/lib/format";

type PriceProps = {
  original: number;
  final: number;
  size?: "md" | "lg";
};

export function Price({ original, final, size = "md" }: PriceProps) {
  const hasDiscount = final < original;

  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span
        className={`font-extrabold text-ink ${size === "lg" ? "text-4xl" : "text-2xl"}`}
      >
        {formatArs(final)}
      </span>
      {hasDiscount && (
        <s
          className={`font-semibold text-muted-foreground ${size === "lg" ? "text-xl" : "text-base"}`}
        >
          <span className="sr-only">Precio original </span>
          {formatArs(original)}
        </s>
      )}
    </p>
  );
}