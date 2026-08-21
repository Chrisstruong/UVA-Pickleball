import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden lg:min-h-[calc(100vh-6rem)]">
      <Image
        src="/images/hero-player.jpg"
        alt="UVA Pickleball Club"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[68%_center] brightness-110 contrast-105 saturate-110 sm:object-[65%_center]"
      />

      <div className="absolute inset-0 bg-black/25 sm:bg-black/15" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10 sm:from-black/55 sm:via-black/15 sm:to-transparent" />

      <div className="relative z-10 flex min-h-[calc(100svh-5rem)] items-center px-4 py-12 sm:px-6 md:px-12 lg:min-h-[calc(100vh-6rem)] lg:px-16">
        <div className="max-w-[620px] text-white">
          <h1 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Fall 2026</span>

            <span className="mt-2 block text-orange-500">
              Let&apos;s play
            </span>

            <span className="block text-orange-500">
              Pickleball
            </span>
          </h1>

          <p className="mt-5 max-w-[560px] text-base font-medium leading-7 text-white/95 sm:mt-7 sm:text-lg md:text-xl">
            Fall 2026 membership is open. Whether you&apos;re brand new or
            tournament-ready, there&apos;s a place for you at UVA Pickleball.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              asChild
              className="h-12 w-full bg-orange-500 px-6 font-bold uppercase tracking-wide text-white hover:bg-orange-600 sm:w-auto sm:px-9"
            >
              <Link href="/about">Explore the Club</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 w-full border-2 border-white bg-transparent px-6 font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black sm:w-auto sm:px-9"
            >
              <Link href="/events">View Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}