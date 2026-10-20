import Image from "next/image";
import Link from "next/link";
import { CartLink } from "@/components/layout/cart-link";

const links = [
  { href: "/#menu", label: "Menú" },
  { href: "/#combos", label: "Combos" },
  { href: "/#ofertas", label: "Ofertas" },
];

export function SiteHeader() {
  return (
    <header className="on-dark sticky top-0 z-40 bg-black text-cream">
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
          <span className="hidden font-display text-xl text-gold md:block">
            El Palacio de las Papas
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label="Principal" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-base font-bold hover:bg-gold hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <CartLink />
        </div>
      </div>
    </header>
  );
}