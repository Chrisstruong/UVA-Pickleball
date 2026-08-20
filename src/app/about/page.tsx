import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Check,
    UserRound,
    UsersRound,
} from "lucide-react";
import ScrollToSectionButton from "@/components/ScrollToSectionButton";

const activities = [
    {
        title: "Open Play",
        description:
            "Regular opportunities to get on court, meet other players, and play recreational games.",
        image: "/images/club/open-play.jpg",
    },
    {
        title: "Leagues",
        description:
            "Competitive and recreational leagues throughout the semester.",
        image: "/images/club/leagues.jpg",
    },
    {
        title: "Social Events",
        description:
            "Mixers, Dinks & Drinks, semi-formals, and other events that bring members together.",
        image: "/images/club/social-events.jpg",
    },
    {
        title: "Club Events",
        description:
            "Special events, Parents Weekend tournaments, and collaborations with other organizations.",
        image: "/images/club/Club-events.jpg",
    },
    {
        title: "Merch & Perks",
        description:
            "Club merchandise, giveaways, sponsor benefits, and exclusive brand discounts.",
        image: "/images/club/merch.jpg",
    },
    {
        title: "Community",
        description:
            "Meet other UVA students, build friendships, and become part of the club community.",
        image: "/images/club/community.jpg",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-white text-[#111827]">



            {/* ====================================================== */}
            {/* HERO */}
            {/* ====================================================== */}

            <section className="relative min-h-[720px] overflow-hidden bg-[#07192d] lg:min-h-[780px]">
                <Image
                    src="/images/club/hero.jpg"
                    alt="UVA Pickleball Club"
                    fill
                    priority
                    className="object-cover object-center"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06172a]/95 via-[#06172a]/65 to-[#06172a]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/80 via-transparent to-black/15" />
                <div className="absolute right-40 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="relative h-[560px] w-[380px] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                        <Image
                            src="/images/club/earning.jpg"
                            alt="UVA Pickleball Fall 2026 Practice Schedule"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1450px] items-center px-6 py-20 md:px-10 lg:min-h-[780px] lg:px-16">
                    <div className="max-w-4xl">

                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#E57200]">
                            University of Virginia
                        </p>

                        <h1 className="font-bebas max-w-4xl text-7xl uppercase leading-[0.82] tracking-wide text-white sm:text-8xl lg:text-[132px]">
                            UVA
                            <span className="block text-[#E57200]">
                                Pickleball
                            </span>
                            Club
                        </h1>

                        <p className="mt-8 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                            Founded in 2020, UVA Pickleball has grown into one of
                            the largest student sports communities at the University
                            of Virginia. Whether you&apos;re picking up a paddle for
                            the first time or competing at the collegiate level,
                            there&apos;s a place to play.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <ScrollToSectionButton
                                targetId="how-to-join"
                                className="inline-flex items-center gap-2 bg-[#E57200] px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c95f00]"
                            >
                                How to Join
                            </ScrollToSectionButton>

                            <ScrollToSectionButton
                                targetId="groups"
                                className="inline-flex items-center border border-white/60 px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#111827]"
                            >
                                Explore The Groups
                            </ScrollToSectionButton>
                        </div>

                    </div>
                </div>
            </section>


            {/* ====================================================== */}
            {/* STATS */}
            {/* ====================================================== */}

            <section className="bg-[#07192d] text-white">
                <div className="mx-auto grid max-w-[1450px] grid-cols-2 px-6 py-8 md:grid-cols-4 md:px-10 lg:px-16">

                    <Stat number="700+" label="Members" />

                    <Stat number="3" label="Playing Groups" />

                    <Stat number="2020" label="Founded" />

                    <Stat number="1" label="UVA Pickleball Community" />

                </div>
            </section>

            {/* ====================================================== */}
            {/* HOW TO JOIN */}
            {/* ====================================================== */}

            <section id="how-to-join" className="overflow-hidden bg-[#f7f7f5]">
                <div className="mx-auto max-w-[1450px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

                    {/* Heading */}
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E57200]">
                            Join The Club
                        </p>

                        <h2 className="font-bebas mt-3 text-5xl uppercase leading-none tracking-wide text-[#07192d] md:text-7xl">
                            How To Join
                        </h2>

                        <div className="mx-auto mt-5 h-[3px] w-14 bg-[#E57200]" />

                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                            Getting started is simple. Register for a tryout, show us your
                            game, and find your place in UVA Pickleball.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative mt-16 grid gap-8 lg:grid-cols-3 lg:gap-10">

                        {/* Connecting line — desktop only */}
                        <div className="absolute left-[16%] right-[16%] top-[82px] hidden h-px bg-slate-300 lg:block" />

                        {/* STEP 01 */}
                        <div className="relative z-10">
                            <div className="flex h-full flex-col bg-white px-7 py-8 shadow-sm md:px-8 md:py-10">

                                <div className="flex items-start justify-between gap-5">
                                    <span className="font-bebas text-7xl leading-none text-[#E57200]">
                                        01
                                    </span>

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#f7f7f5] text-[#07192d]">
                                        <CalendarDays className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-sm font-extrabold uppercase leading-5 tracking-wide text-[#07192d]">
                                        Register For A
                                        <span className="block text-[#E57200]">
                                            Tryout Session
                                        </span>
                                    </h3>

                                    <p className="mt-4 text-md leading-5 text-slate-600">
                                        Register for ONE tryout session only between 08/31 and 09/05. Spots are limited, so sign up early to secure your preferred session.
                                    </p>
                                </div>

                                <div className="mt-auto pt-10">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#E57200] px-5 py-3 text-[15px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#c95f00]"
                                    >
                                        Sign Up
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* STEP 02 */}
                        <div className="relative z-10 lg:mt-8">
                            <div className="flex h-full flex-col bg-white px-7 py-8 shadow-sm md:px-8 md:py-10">

                                <div className="flex items-start justify-between gap-5 ">
                                    <span className="font-bebas text-7xl leading-none text-[#E57200]" >
                                        02
                                    </span>

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#f7f7f5] text-[#07192d]">
                                        <UsersRound className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-sm font-extrabold uppercase leading-5 tracking-wide text-[#07192d]">
                                        Attend Your
                                        <span className="block">
                                            Tryout
                                        </span>
                                    </h3>

                                    <p className="mt-4 text-md leading-5 text-slate-600">
                                        Must come to your selected session and play. Our officers
                                        will evaluate players and determine group placement
                                        after tryouts.
                                    </p>
                                </div>

                                <div className="mt-auto pt-10">
                                    <div className="inline-flex items-center gap-2 bg-[#f7f7f5] px-4 py-2.5 text-[15px] font-bold uppercase tracking-[0.08em] text-slate-600">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        Aug 31 – Sep 5
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 03 */}
                        <div className="relative z-10 lg:mt-16">
                            <div className="flex h-full flex-col bg-gradient-to-br from-white via-white to-[#e8f4ff] px-7 py-8 shadow-sm md:px-8 md:py-10">

                                <div className="flex items-start justify-between gap-5">
                                    <span className="font-bebas text-7xl leading-none text-[#E57200]">
                                        03
                                    </span>

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#0B67A3]/15 bg-white text-[#0B67A3]">
                                        <UserRound className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-sm font-extrabold uppercase leading-5 tracking-wide text-[#07192d]">
                                        Create Your
                                        <span className="block text-[#E57200]">
                                            Account
                                        </span>
                                    </h3>

                                    <p className="mt-4 text-md leading-5 text-slate-600">
                                        After tryouts, create your account to view your results and register for upcoming club events and social open-play sessions.
                                    </p>
                                </div>

                                <div className="mt-auto pt-10">
                                    <Link
                                        href="/signup"
                                        className="inline-flex items-center gap-2 bg-[#E57200] px-5 py-3 text-[15px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#c95f00]"
                                    >
                                        Create Account
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* ====================================================== */}
            {/* CLUB LIFE */}
            {/* ====================================================== */}

            <section className="bg-[#f7f7f5]">
                <div className="mx-auto max-w-[1450px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

                    <div className="grid gap-12 lg:grid-cols-[0.75fr_2fr]">

                        {/* Heading */}
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E57200]">
                                Club Life
                            </p>

                            <h2 className="font-bebas mt-3 text-5xl uppercase leading-[0.9] tracking-wide md:text-6xl">
                                Play Compete
                                <br />
                                Connect.
                            </h2>

                            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">
                                There&apos;s always something happening at UVA
                                Pickleball. From open play to tournaments and social
                                events, we bring the UVA community together on and
                                off the court.
                            </p>
                        </div>


                        {/* Activity Cards */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {activities.map((activity) => (
                                <ActivityCard
                                    key={activity.title}
                                    {...activity}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>


            {/* ====================================================== */}
            {/* MORE THAN PICKLEBALL */}
            {/* ====================================================== */}

            <section className="bg-[#07192d] text-white">
                <div className="mx-auto grid max-w-[1450px] lg:grid-cols-[0.8fr_1.4fr_0.7fr]">

                    {/* Copy */}
                    <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-16">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E57200]">
                            The Community
                        </p>

                        <h2 className="font-bebas mt-4 text-5xl uppercase leading-[0.92] tracking-wide md:text-6xl">
                            More Than
                            <br />
                            Pickleball.
                        </h2>

                        <p className="mt-6 text-sm leading-6 text-white/70">
                            UVA Pickleball is a place to grow, connect, and make
                            memories. Through open play, tournaments, mixers, and
                            club activities, we build a community that lasts far
                            beyond the court.
                        </p>

                        <p className="mt-8 text-lg font-bold uppercase leading-tight text-[#E57200]">
                            This is where
                            <br />
                            friendships are made.
                        </p>
                    </div>


                    {/* Main image */}
                    <div className="relative min-h-[420px] lg:min-h-[560px]">
                        <Image
                            src="/images/club/community-main.jpg"
                            alt="UVA Pickleball community"
                            fill
                            className="object-cover"
                        />
                    </div>


                    {/* Side images */}
                    <div className="grid grid-cols-3 lg:grid-cols-1">
                        <CommunityImage src="/images/club/community-1.jpg" />
                        <CommunityImage src="/images/club/community-2.jpg" />
                        <CommunityImage src="/images/club/community-3.jpg" />
                    </div>

                </div>
            </section>


            {/* ====================================================== */}
            {/* THREE WAYS TO PLAY */}
            {/* ====================================================== */}

            <section id="groups" className="bg-white">
                <div className="mx-auto max-w-[1450px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

                    <div className="grid gap-10 lg:grid-cols-[0.75fr_2.1fr]">

                        {/* Intro */}
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E57200]">
                                Find Your Level
                            </p>

                            <h2 className="font-bebas mt-3 text-5xl uppercase leading-[0.9] md:text-6xl">
                                Three Ways
                                <br />
                                To Play.
                            </h2>

                            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">
                                Whether you&apos;re brand new or nationally competitive, there&apos;s place on the court for you.
                            </p>
                        </div>


                        {/* Groups */}
                        <div className="grid gap-6 md:grid-cols-3">

                            <GroupCard
                                accent="orange"
                                title="General"
                                subtitle="Open To Everyone"
                                image="/images/club/general.jpg"
                                items={[
                                    "Tailored for beginners",
                                    "Welcoming environment",
                                    "Courts Friday 3:30-5:30",
                                    "Equipment Provided",
                                    "Tournament opportunities"
                                ]}
                                footer="No Tryout Required"
                            />

                            <GroupCard
                                accent="navy"
                                title="Social"
                                subtitle="250 Players"
                                image="/images/club/social-team.jpg"
                                items={[
                                    "Social tournaments",
                                    "Social events(mixers, parties, dinks & drinks)",
                                    "Focus on improvement",
                                    "Prime practice times",
                                    "Tryouts required",
                                ]}
                                footer="Tryout Required"
                            />

                            <GroupCard
                                accent="orange"
                                title="Tournament"
                                subtitle="24 Players · Most Competitive"
                                image="/images/club/tournament-team.jpg"
                                items={[
                                    "Tournaments/Paid Travel",
                                    "2023 National Champions",
                                    "Sponsorship opportunities",
                                    "Prime practice times",
                                    "Tryouts required",
                                ]}
                                footer="Tryout Required"
                            />

                        </div>

                    </div>

                </div>
            </section>


            {/* ====================================================== */}
            {/* COMPETE FOR VIRGINIA */}
            {/* ====================================================== */}

            <section className="relative overflow-hidden bg-[#07192d] text-white">

                <Image
                    src="/images/club/championship.jpg"
                    alt="UVA Pickleball Tournament Team"
                    fill
                    className="object-cover object-center opacity-35"
                />

                <div className="absolute inset-0 bg-[#07192d]/65" />

                <div className="relative z-10 mx-auto grid min-h-[430px] max-w-[1450px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1fr_1fr_0.6fr] lg:px-16">

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E57200]">
                            Tournament Team
                        </p>

                        <h2 className="font-bebas mt-4 text-6xl uppercase leading-[0.86] tracking-wide md:text-7xl">
                            Compete For
                            <br />
                            Virginia.
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
                            Our Tournament Team represents UVA in collegiate
                            pickleball competition across the country. We train,
                            travel, and compete at the highest level.
                        </p>
                    </div>


                    <div className="relative hidden min-h-[350px] lg:block">
                        <Image
                            src="/images/club/team-huddle.jpg"
                            alt="UVA Tournament Team"
                            fill
                            className="object-contain object-bottom"
                        />
                    </div>


                    <div className="text-center">
                        <p className="font-bebas text-4xl uppercase leading-none md:text-5xl">
                            2023
                            <br />
                            National
                            <br />
                            Champions
                        </p>

                        <div className="mx-auto mt-5 h-[3px] w-16 bg-[#E57200]" />
                    </div>

                </div>
            </section>


            {/* ====================================================== */}
            {/* FINAL CTA */}
            {/* ====================================================== */}

            <section className="bg-[#0b2038] text-white">
                <div className="mx-auto grid max-w-[1450px] items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1fr_auto] lg:px-16">

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E57200]">
                            UVA Pickleball
                        </p>

                        <h2 className="font-bebas mt-3 text-5xl uppercase leading-none md:text-6xl">
                            Ready To Play?
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
                            Whether you&apos;re brand new to pickleball, looking for
                            a consistent group to play with, or hoping to compete
                            for UVA, there&apos;s a place for you in UVA Pickleball.
                        </p>
                    </div>


                    <div className="flex flex-wrap gap-3">

                        <ScrollToSectionButton
                            targetId="how-to-join"
                            className="inline-flex items-center gap-2 bg-[#E57200] px-8 py-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c95f00]"
                        >
                            Join UVA Pickleball
                        </ScrollToSectionButton>

                        <Link
                            href="/announcements/tryoutdetails"
                            className="inline-flex items-center border border-white/70 px-8 py-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#07192d]"
                        >
                            View Tryout Details
                        </Link>

                    </div>

                </div>
            </section>

        </main>
    );
}


/* ========================================================== */
/* COMPONENTS */
/* ========================================================== */

function Stat({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center border-white/20 px-4 py-5 text-center md:border-r md:last:border-r-0">
            <p className="font-bebas text-4xl text-[#E57200] md:text-5xl">
                {number}
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                {label}
            </p>
        </div>
    );
}


function ActivityCard({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) {
    return (
        <article className="overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="relative aspect-[4/2.8]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#07192d]">
                    {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                    {description}
                </p>
            </div>

        </article>
    );
}


function CommunityImage({
    src,
}: {
    src: string;
}) {
    return (
        <div className="relative min-h-[160px] border-l border-t border-white/10 lg:min-h-0">
            <Image
                src={src}
                alt="UVA Pickleball community"
                fill
                className="object-cover"
            />
        </div>
    );
}


function GroupCard({
    title,
    subtitle,
    image,
    items,
    footer,
    accent,
}: {
    title: string;
    subtitle: string;
    image: string;
    items: string[];
    footer: string;
    accent: "orange" | "navy";
}) {
    const accentClass =
        accent === "orange"
            ? "bg-[#E57200]"
            : "bg-[#07192d]";

    const textClass =
        accent === "orange"
            ? "text-[#E57200]"
            : "text-[#07192d]";

    return (
        <article className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm">

            {/* Accent */}
            <div className={`h-[5px] ${accentClass}`} />

            {/* Heading */}
            <div className="px-5 py-5 text-center">
                <h3 className="font-bebas text-3xl uppercase tracking-wide">
                    {title}
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">
                    {subtitle}
                </p>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/2.7]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Features */}
            <div className="flex flex-1 flex-col p-5">

                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-2"
                        >
                            <div
                                className={`mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white ${accentClass}`}
                            >
                                <Check className="h-2.5 w-2.5" />
                            </div>

                            <p className="text-xs leading-5 text-slate-600">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-6 border px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] ${textClass}`}
                >
                    {footer}
                </div>

            </div>

        </article>
    );
}
