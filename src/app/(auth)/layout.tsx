import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="on-dark bg-black text-cream">
        <div className="page-container flex items-center justify-between gap-4 py-2">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="El Palacio de las Papas, inicio"
          >
            <Image
              src="/brand/logo.png"
              alt=""
              width={56}
              height={56}
              priority
              className="size-14"
            />
            <span className="hidden font-display text-xl text-gold sm:block">
              El Palacio de las Papas
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full px-4 font-bold hover:bg-gold hover:text-ink"
          >
            Volver al menú
          </Link>
        </div>
      </header>
      <main id="contenido" className="mx-auto w-full max-w-md flex-1 px-4 py-10">
        {children}
      </main>
    </div>
  );
}