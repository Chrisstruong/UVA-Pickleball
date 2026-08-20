import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Full-screen background */}
            <Image
                src="/images/hero-player.jpg"
                alt="UVA Pickleball Club"
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-cover object-[65%_center] brightness-110 contrast-105 saturate-110"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/15" />

            {/* Darker gradient behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center px-7 md:px-12 lg:px-16">
                <div className="max-w-[620px] text-white">
                    <h1 className="text-3xl font-black uppercase italic leading-[0.88] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                        <span className="block">
                            Fall 2026
                        </span>

                        <span className="mt-2 block text-orange-500">
                            Let&apos;s play
                        </span>

                        <span className="block text-orange-500">
                            Pickleball
                        </span>
                    </h1>

                    <p className="mt-7 max-w-[560px] text-lg font-medium leading-7 text-white/95 md:text-xl">
                        Fall 2026 membership is open. Whether you&apos;re brand new or tournament-ready, there&apos;s a place for you at UVA Pickleball.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button
                            asChild
                            className="h-12 bg-orange-500 px-9 font-bold uppercase tracking-wide text-white hover:bg-orange-600"
                        >
                            <Link href="/about">
                               Explore the club
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="h-12 border-2 border-white bg-transparent px-9 font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black"
                        >
                            <Link href="/events">
                                View Upcoming Events
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
