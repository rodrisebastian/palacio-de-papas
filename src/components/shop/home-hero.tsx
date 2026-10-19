import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section aria-label="Bienvenida" className="bg-black text-cream">
      <Image
        src="/brand/banner.png"
        alt="El Palacio de las Papas: hamburguesas, papas gigantes, bebidas y sabor real"
        width={1983}
        height={793}
        sizes="100vw"
        className="hidden h-auto w-full md:block"
      />
      <div className="page-container py-10 text-center md:pb-8 md:pt-6">
        <h1 className="font-display text-4xl leading-tight text-gold md:text-3xl">
          Coma sin vergüenza
        </h1>
        <p className="mt-3 text-lg">
          Las mejores papas de la ciudad, a la mesa de su majestad.
        </p>
        <Link
          href="#menu"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-8 text-lg font-extrabold text-ink hover:bg-cream"
        >
          Ver el menú
        </Link>
        <p className="mt-5 text-sm">Envío a domicilio y retiro por el local</p>
      </div>
    </section>
  );
}