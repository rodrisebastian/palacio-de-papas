import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/shop/detail-layout";
import { DetailSkeleton } from "@/components/shop/detail-skeleton";
import { getComboDetail } from "@/features/catalog/queries";
import { formatArs } from "@/lib/format";

type Params = Promise<{ slug: string }>;

async function ComboContent({ params }: { params: Params }) {
  const { slug } = await params;
  const combo = await getComboDetail(slug);

  if (!combo) {
    notFound();
  }

  const saving = combo.separatePrice - combo.originalPrice;

  return (
    <DetailLayout
      item={combo}
      eyebrow="Combo del Palacio"
      backHref="/#combos"
      backLabel="Volver a los combos"
    >
      <section aria-labelledby="combo-includes">
        <h2 id="combo-includes" className="font-display text-2xl">
          Qué incluye
        </h2>
        <ul className="mt-3 space-y-2 text-lg">
          {combo.items.map((item) => (
            <li key={item.slug}>
              <span className="font-extrabold">{item.quantity}×</span>{" "}
              <Link
                href={`/product/${item.slug}`}
                className="underline decoration-gold decoration-2 underline-offset-4 hover:text-ruby"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {saving > 0 && (
          <p className="mt-4 rounded-xl bg-muted p-4 font-bold">
            Por separado serían {formatArs(combo.separatePrice)}. Con el combo
            ahorrás {formatArs(saving)}.
          </p>
        )}
      </section>
    </DetailLayout>
  );
}

export default function ComboPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ComboContent params={params} />
    </Suspense>
  );
}