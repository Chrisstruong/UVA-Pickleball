import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from 'lucide-react';

const announcements = [
  {
    title: "Annual Fall Classic Registration",
    category: "Tournament",
    description:
      "Registration is now open for our flagship tournament. All skill levels are welcome.",
    date: "Oct 24, 2024",
    image: "/images/announcements/fall-classic.jpeg",
    href: "/announcements/fall-classic",
  },
  {
    title: "Limited Edition Hoos Gear",
    category: "Merch Drop",
    description:
      "Our new exclusive hoodie collection is here. Get your club gear before it sells out.",
    date: "Oct 15, 2024",
    image: "/images/announcements/merch.png",
    href: "/announcements/merch-drop",
  },
  {
    title: "Welcome Week Mixer Recap",
    category: "Social",
    description:
      "Over 100 new members joined us for pizza and casual play. Check out the photos.",
    date: "Oct 12, 2024",
    image: "/images/announcements/mixer.jpg",
    href: "/announcements/welcome-week",
  },
];

export default function AnnoucementsSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
                            Latest News
                        </p>

                        <h2 className="font-heading mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                            Club Updates
                        </h2>
                    </div>

                    <Link 
                        href="/annoucements"
                        className="font-heading hidden text-sm tracking-wide text-orange-600 hover:text-orange-700 md:block">
                            View All Updates
                        </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {announcements.map((item) => (
                        <Link key={item.title} href={item.href} className="group block transition-transform duration-300 hover:-translate-y-1">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="mt-4">
                                <p className="font-heading inline-block rounded bg-orange-50 px-2 py-1 text-[10px] uppercase tracking-widest text-orange-600">
                                    {item.category}
                                </p>

                                <h3 className="font-heading mt-3 text-xl font-bold group-hover:text-orange-600">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarDays size={14} />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}