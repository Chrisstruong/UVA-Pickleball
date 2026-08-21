import Image from "next/image";

const galleryImages = [
  {
    src: "/images/gallery/pickleball-222.jpg",
    alt: "Gabe Tardio",
  },
  {
    src: "/images/gallery/pickleball-22.jpg",
    alt: "Ben Johns",
  },
  {
    src: "/images/gallery/pickleball-33.jpg",
    alt: "ALW",
  },
  {
    src: "/images/gallery/pickleball-444.jpg",
    alt: "Jack Mundro",
  },
  {
    src: "/images/gallery/pickleball-55.jpeg",
    alt: "Anna Bright",
  },
];

export default function Gallery() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mb-8 flex items-end justify-between sm:mb-10">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-orange-600">
              Club Moments
            </p>

            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Gallery
            </h2>
          </div>

          <span
            aria-disabled="true"
            className="font-heading hidden cursor-not-allowed text-sm uppercase tracking-wide text-slate-400 md:block"
          >
            View Full Gallery
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm sm:aspect-[16/10]">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {galleryImages.slice(1, 3).map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {galleryImages.slice(3).map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}