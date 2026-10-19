import { CatalogCard } from "@/components/shop/catalog-card";
import { getHomeData } from "@/features/catalog/queries";
import type { CatalogItem } from "@/types/catalog";

function CardGrid({ items }: { items: CatalogItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <CatalogCard key={`${item.kind}-${item.id}`} item={item} />
      ))}
    </div>
  );
}

export async function HomeCatalog() {
  const { categories, combos, deals } = await getHomeData();

  if (categories.length === 0 && combos.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl">El menú está en preparación</h2>
        <p className="mt-3 text-muted-foreground">
          Todavía no hay productos disponibles. Volvé en un rato.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container space-y-14 py-10">
      {deals.length > 0 && (
        <section
          id="ofertas"
          aria-labelledby="ofertas-title"
          className="scroll-mt-24"
        >
          <h2
            id="ofertas-title"
            className="mb-6 font-display text-3xl text-ruby"
          >
            Ofertas reales
          </h2>
          <CardGrid items={deals} />
        </section>
      )}

      {combos.length > 0 && (
        <section
          id="combos"
          aria-labelledby="combos-title"
          className="scroll-mt-24"
        >
          <h2 id="combos-title" className="mb-6 font-display text-3xl">
            Combos del Palacio
          </h2>
          <CardGrid items={combos} />
        </section>
      )}

      {categories.length > 0 && (
        <section
          id="menu"
          aria-labelledby="menu-title"
          className="scroll-mt-24"
        >
          <h2 id="menu-title" className="mb-4 font-display text-3xl">
            El menú
          </h2>
          <nav aria-label="Categorías del menú" className="mb-8">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#cat-${category.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 text-base font-bold hover:bg-gold"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10">
            {categories.map((category) => (
              <div
                key={category.id}
                id={`cat-${category.slug}`}
                className="scroll-mt-24"
              >
                <h3 className="mb-4 font-display text-2xl">{category.name}</h3>
                <CardGrid items={category.products} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}