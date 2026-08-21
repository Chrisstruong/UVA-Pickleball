import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollToUpcomingEventsButton from "@/components/events/ScrollToUpcomingEventsButton";
import ViewAttendeesButton from "@/components/events/ViewAttendeesButton";

type ClubEvent = {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  capacity: number;
  image: string;
  status: string;
  signupUrl?: string;
  slug?: string;
};

const events: ClubEvent[] = [
  {
    title: "Fall 2026 Tryout Day 1",
    type: "Tryout",
    date: "Monday 08/31",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Gengar.png",
    status: "open",
    signupUrl: "https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=315280905#gid=315280905"
  },
  {
    title: "Fall 2026 Tryout Day 2",
    type: "Tryout",
    date: "Tuesday 09/01",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Gengar.png",
    status: "open",
    signupUrl: "https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=1509728370#gid=1509728370"
  },
  {
    title: "Fall 2026 Tryout Day 3",
    type: "Tryout",
    date: "Wednesday 09/02",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Snorlax.png",
    status: "open",
    signupUrl: "https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=1228192920#gid=1228192920",
  },
  {
    title: "Fall 2026 Tryout Day 4",
    type: "Tryout",
    date: "Thursday 09/03",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Snorlax.png",
    status: "open",
    signupUrl:"https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=677840540#gid=677840540"
  },
  {
    title: "Fall 2026 Tryout Day 5",
    type: "Tryout",
    date: "Friday 09/04",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Pikachu.png",
    status: "open",
    signupUrl: "https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=1648291452#gid=1648291452"
  },
  {
    title: "Fall 2026 Tryout Day 6",
    type: "Tryout",
    date: "Saturday 09/05",
    time: "Your preference",
    location: "Snyder Tennis Center, Court 9 ",
    attendees: ["Sample", "Sample", "Sample", "Sample"],
    capacity: 504,
    image: "/images/events/Pikachu.png",
    status: "open",
    signupUrl: "https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=2067550300#gid=2067550300"
  },
  
];


export default function EventsPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="relative mx-auto h-[390px] w-full overflow-hidden rounded-2xl md:h-[450px]">
          <Image
            src="/images/events/TryOut2026.jpg"
            alt="UVA Pickleball Fall 2026 Tryouts"
            fill
            priority
            className="object-cover object-[60%_center]"
          />

          {/* Dark overlay only on the left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="absolute inset-0 flex items-center px-8 py-10 md:px-12 md:py-14">
            <div className="w-full max-w-[520px]">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                  Now Open
                </span>

                <span className="rounded-full bg-neutral-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                  Fall 2026
                </span>
              </div>

              <h1 className="font-hero text-6xl leading-[0.9] tracking-wide text-white md:text-7xl lg:text-8xl">
                WELCOME BACK,
                <br />
                HOOS.
              </h1>

              <h2 className="mt-3 font-heading text-2xl font-bold uppercase leading-none tracking-wide text-orange-600 md:text-3xl">
                Fall 2026 Tryouts
              </h2>

              <p className="mt-4 max-w-[500px] text-sm leading-6 text-white/90 md:text-base">
                Ready to compete, improve, and meet Hoos? Join our Fall
                2026 tryout session and earn your spot on the UVA Pickleball Club.
                Players of all skill levels are welcome.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ScrollToUpcomingEventsButton />

                <Button
                  asChild
                  variant="secondary"
                  className="h-10 rounded-md px-6 font-heading text-[11px] uppercase tracking-wide md:h-11 md:px-7"
                >
                  <Link href="/announcements/tryoutdetails">
                    View Tryout Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <h2 className="font-heading text-lg font-bold">Filter Events</h2>

          <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
            <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
              Event Type
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Practice
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Tournament
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Social
              </label>
            </div>

            <p className="font-heading mt-6 text-xs uppercase tracking-widest text-muted-foreground">
              Date Filter
            </p>

            <input
              type="date"
              className="mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm"
            />

            <Button variant="outline" className="mt-5 w-full">
              Reset Filters
            </Button>
          </div>
        </aside>

        <div id="upcoming-events" className="scroll-mt-8">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Upcoming Events
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Join the UVA Pickleball community on the courts. Find your match here.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <article
                key={event.title}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded bg-orange-600 px-2 py-1 font-heading text-[10px] uppercase tracking-widest text-white">
                    {event.type}
                  </span>
                  <span className="absolute right-4 top-4 rounded bg-white px-2 py-1 text-xs font-bold text-slate-700">
                    <Users className="mr-1 inline h-3 w-3" />
                    {event.attendees.length}/{event.capacity}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold tracking-tight">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-orange-600" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-600" />
                      {event.location}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {event.status === "full" ? (
                      <Button
                        className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
                        disabled
                      >
                        Event Full
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
                      >
                        <a
                          href={event.signupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Sign Up
                        </a>
                      </Button>
                    )}

                    <ViewAttendeesButton
                      eventTitle={event.title}
                      attendees={event.attendees}
                      capacity={event.capacity}
                    />
                  </div>

                  {event.type === "Tournament" && event.slug && (
                    <Button asChild variant="secondary" className="mt-3 w-full">
                      <Link href={`/events/${event.slug}`}>
                        View Event Details
                      </Link>
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
