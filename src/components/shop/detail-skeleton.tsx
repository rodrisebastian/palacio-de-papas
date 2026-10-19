export function DetailSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando el detalle"
      className="page-container py-8"
    >
      <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="aspect-4/3 animate-pulse rounded-3xl bg-muted" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-1/3 animate-pulse rounded-lg bg-muted" />
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}