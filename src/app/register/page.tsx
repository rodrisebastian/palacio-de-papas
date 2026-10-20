import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { getSafeRedirect } from "@/lib/redirect";

type SearchParams = Promise<{ next?: string }>;

async function RegisterContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;

  return <RegisterForm next={getSafeRedirect(next)} />;
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <h1 className="font-display text-3xl">Creá tu cuenta</h1>
      <p className="mt-2 text-muted-foreground">
        Con tu cuenta podés hacer pedidos y seguirlos en tiempo real.
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <div
              aria-busy="true"
              className="h-96 animate-pulse rounded-2xl bg-muted"
            />
          }
        >
          <RegisterContent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}