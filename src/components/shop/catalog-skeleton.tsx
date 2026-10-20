export function CatalogSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando el menú"
      className="page-container py-10"
    >
      <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}