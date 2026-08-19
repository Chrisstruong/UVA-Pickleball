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
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-orange-600">
              Club Moments
            </p>

            <h2 className="font-heading mt-3 text-4xl font-bold tracking-tight md:text-5xl">
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

        {/* Gallery */}
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Large main image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right side */}
          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                fill
                className="object-cover object-center transition duration-500 hover:scale-105"
              />
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
              <Image
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                fill
                className="object-cover object-center transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
            <Image
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              fill
              className="object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
            <Image
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              fill
              className="object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}