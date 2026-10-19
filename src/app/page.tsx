import { Suspense } from "react";
import { db } from "@/lib/db";

async function DatabaseStatus() {
  const rows = await db.$queryRaw<{ now: Date }[]>`SELECT NOW() AS now`;

  return (
    <p className="text-xl">Base conectada: {rows[0].now.toISOString()}</p>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<p className="text-xl">Conectando a la base...</p>}>
        <DatabaseStatus />
      </Suspense>
    </main>
  );
}