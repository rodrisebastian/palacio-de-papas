"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export function AccountMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return <div className="size-11" aria-hidden="true" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex min-h-11 items-center rounded-full border-2 border-gold px-4 font-bold text-gold hover:bg-gold hover:text-ink"
      >
        Ingresar
      </Link>
    );
  }

  const firstName = session.user.name.split(" ")[0];

  return (
    <div className="flex items-center gap-1">
      <span className="hidden max-w-32 truncate font-bold md:inline">
        Hola, {firstName}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        className="inline-flex min-h-11 items-center rounded-full px-4 font-bold hover:bg-gold hover:text-ink"
      >
        Salir
      </button>
    </div>
  );
}