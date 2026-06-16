import Image from "next/image";
import Link from "next/link";

const galleryImages = [
    {
        src: "/images/gallery/pickleball-1.jpg",
        alt: "Gabe Tardio"
    },
    {
        src: "/images/gallery/pickleball-2.jpg",
        alt: "Ben Johns"
    },
    {
        src: "/images/gallery/pickleball-3.jpg",
        alt: "ALW"
    },
    {
        src: "/images/gallery/pickleball-4.jpg",
        alt: "Jack Mundro"
    },
    {
        src: "/images/gallery/pickleball-5.jpg",
        alt: "Anna Bright"
    },
];

export default function Gallery() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <p className="font-heading text-xs uppercase tracking-[0.3em] text-orange-600">
                            Club Moments
                        </p>

                        <h2 className="font-heading mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                            Gallery
                        </h2>
                    </div>

                    <Link
                        href="/gallery"
                        className="font-heading hidden text-sm uppercase tracking-wide text-orange-600 hover:text-orange-700 md:block">
                        View Full Gallery
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.src}
                            className={`relative overflow-hidden rounded-xl bg-slate-200 shadow-sm ${index === 0 ? "col-span-2 row-span-2 aspect-[16/10]" : "aspect-square"}`}>
                            <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-500 hover:scale-110" />
                    </div>
                    ))}
                        
            </div>
            </div>
        </section>
    )
}