import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogCard } from "@/components/shop/catalog-card";
import { DetailLayout } from "@/components/shop/detail-layout";
import { DetailSkeleton } from "@/components/shop/detail-skeleton";
import { getProductDetail } from "@/features/catalog/queries";

type Params = Promise<{ slug: string }>;

async function ProductContent({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <DetailLayout
        item={product}
        eyebrow={product.categoryName}
        backHref={`/#cat-${product.categorySlug}`}
        backLabel={`Volver a ${product.categoryName}`}
      />
      {product.related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="page-container pb-10"
        >
          <h2 id="related-title" className="mb-6 font-display text-2xl">
            Otros de {product.categoryName}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {product.related.map((item) => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function ProductPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}