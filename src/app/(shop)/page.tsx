import Image from "next/image";

export default function HomePage() {
  return (
    <section aria-label="Bienvenida" className="bg-black">
      <Image
        src="/brand/banner.png"
        alt="El Palacio de las Papas: hamburguesas, papas gigantes, bebidas y sabor real"
        width={1983}
        height={793}
        priority
        sizes="100vw"
        className="mx-auto h-auto w-full max-w-6xl"
      />
    </section>
  );
}