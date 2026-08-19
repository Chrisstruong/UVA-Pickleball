"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Clock,
  ShoppingBag,
  Handshake,
} from "lucide-react";

const features = [
  {
    title: "Events",
    description: "Stay updated on tournaments, socials, and mixer events.",
    href: "/events",
    action: "Explore",
    icon: CalendarDays,
  },
  {
    title: "Schedule",
    description: "View weekly social and tournament sessions",
    href: "/schedule",
    action: "Check Times",
    icon: Clock,
  },
  {
    title: "Merch",
    description:
      "Represent UVA Pickleball with club gear and team merchandise.",
    href: "/merch",
    action: "Shop Now",
    icon: ShoppingBag,
  },
  {
    title: "Sponsors",
    description:
      "Support the local businesses and partners that help our club grow.",
    href: "/",
    action: "Our Partners",
    icon: Handshake,
  },
];

export default function FeatureCards() {
  const router = useRouter();

  const handleSponsorClick = () => {
    const sponsors = document.getElementById("sponsors");

    if (sponsors) {
      sponsors.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    router.push("/");
  };

  return (
    <section className="border-y bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          if (feature.title === "Sponsors") {
            return (
              <button
                key={feature.title}
                type="button"
                onClick={handleSponsorClick}
                className="group min-h-[220px] rounded-xl bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition group-hover:scale-110">
                  <Icon size={24} />
                </div>

                <h3 className="font-heading text-lg font-bold tracking-wide">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <p className="font-heading mt-5 text-xs uppercase tracking-widest text-orange-600">
                  {feature.action}
                </p>
              </button>
            );
          }

          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="group min-h-[220px] rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition group-hover:scale-110">
                <Icon size={24} />
              </div>

              <h3 className="font-heading text-lg font-bold tracking-wide">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>

              <p className="font-heading mt-5 text-xs uppercase tracking-widest text-orange-600">
                {feature.action}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}