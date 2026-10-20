import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { getSafeRedirect } from "@/lib/redirect";

type SearchParams = Promise<{ next?: string }>;

async function LoginContent({ searchParams }: { searchParams: SearchParams }) {
  const { next } = await searchParams;

  return <LoginForm next={getSafeRedirect(next)} />;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <h1 className="font-display text-3xl">Ingresá a tu cuenta</h1>
      <p className="mt-2 text-muted-foreground">
        Seguí tu pedido y mirá tu historial.
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <div
              aria-busy="true"
              className="h-72 animate-pulse rounded-2xl bg-muted"
            />
          }
        >
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}