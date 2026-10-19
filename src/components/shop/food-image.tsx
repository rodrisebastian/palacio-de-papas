import Image from "next/image";

type FoodImageProps = {
  src: string | null;
  alt: string;
};

export function FoodImage({ src, alt }: FoodImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex h-full w-full items-center justify-center bg-gold"
    >
      <svg
        viewBox="0 0 64 48"
        className="h-14 w-14 text-ink/70"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 40 L8 12 L22 26 L32 6 L42 26 L56 12 L60 40 Z" />
        <rect x="4" y="42" width="56" height="4" rx="2" />
      </svg>
    </div>
  );
}