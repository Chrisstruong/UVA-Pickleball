import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

const upcoming = [
    {
        title: "Fall 2026 Tryouts",
        category: "Tryouts",
        description:
            "Interested in joining the UVA Pickleball Club? Sign up for our Fall 2026 tryouts to become a member of the club.",
        image: "/images/announcements/fall-classic.jpeg",
        publishedAt: "August 19, 2026",
        href: "/announcements/tryoutdetails",
    },
    {
        title: "Get to know UVA Pickleball",
        category: "GET STARTED",
        description:
            "New to the club? Learn how we play, compete, and connect, and find the best way to get involved.",
        image: "/images/announcements/mixer.jpg",
        publishedAt: "August 19, 2026",
        href: "/about",
    },
];

export default function AnnouncementsSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20">

                {/* Header */}
                <div className="mb-10">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
                        Fall 2026
                    </p>

                    <h2 className="font-heading mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                        What&apos;s Ahead
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {upcoming.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group block transition-transform duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-4">
                                <p className="font-heading inline-block rounded bg-orange-50 px-2 py-1 text-[10px] uppercase tracking-widest text-orange-600">
                                    {item.category}
                                </p>

                                <h3 className="font-heading mt-3 text-xl font-bold transition group-hover:text-orange-600">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>

                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4 text-[#E57200]" />

                                    <p>
                                        Posted on {item.publishedAt}
                                    </p>
                                </div>

                                <p className="font-heading mt-4 text-xs font-semibold uppercase tracking-wider text-orange-600">
                                    Learn More →
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
