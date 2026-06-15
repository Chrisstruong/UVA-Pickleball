import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="font-hero mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-12 md:grid-cols-2">
            <div>
                <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                    Elevate Your {" "}
                    <span className="text-orange-600">Game.</span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                    Join the official UVA Pickleball Club. From casual rallies to
                    competitive tournament play, experience the fastest-growing sport on
                    Grounds.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Button asChild className="bg-orange-600 px-8 py-6 font-heading uppercase tracking-wide hover:bg-orange-700">
                        <Link href="/contact">Join Club</Link>
                    </Button>

                    <Button asChild variant="outline" className="font-heading px-8 py-6 font-bold uppercase tracking-wide">
                        <Link href="/events">View Events</Link>
                    </Button>


                    <Button asChild variant="ghost" className="px-8 py-6 font-bold uppercase hover:text-orange-600">
                        <Link href="/merch">Shop Merch</Link>
                    </Button>
                       
                </div>
            </div>

            <div className="relative">
                <Image
                    src="/images/hero-player.jpeg"
                    alt="UVA Pickleball Club"
                    width={760}
                    height={480}
                    className="aspect-[16/9 rounded-lg object-cover shadow-2xl"
                    priority
                />
            </div>
        </section>
    )
}