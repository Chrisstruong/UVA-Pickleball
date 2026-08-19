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
  slug?: string;
};

const events: ClubEvent[] = [
  {
    title: "Fall 2026 Tryout - Day 1",
    type: "Tryout",
    date: "Tuesday, Aug 25, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "Snyder Tennis Center",
    attendees: ["Ava Chen", "Marcus Lee", "Sofia Patel", "Ethan Brooks"],
    capacity: 32,
    image: "/images/events/Gengar.png",
    status: "open",
  },
  {
    title: "Fall 2026 Tryout - Day 2",
    type: "Tryout",
    date: "Wednesday, Aug 26, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "Snyder Tennis Center",
    attendees: ["Maya Johnson", "Daniel Kim", "Priya Shah", "Noah Williams", "Lena Ortiz","Minh Dang Truong", "Chris Struong","Alexis Rivera", "Jordan Lee", "Sophia Martinez", "Liam Thompson", "Isabella Garcia", "Ethan Nguyen", "Avery Brown", "Lucas Wilson", "Mia Davis", "Elijah Anderson", "Charlotte Taylor", "James Thomas", "Amelia White"],
    capacity: 32,
    image: "/images/events/Butterfree.png",
    status: "open",
  },
  {
    title: "Fall 2026 Tryout - Day 3",
    type: "Tryout",
    date: "Thursday, Aug 27, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "Snyder Tennis Center",
    attendees: ["Grace Nguyen", "Owen Miller", "Nina Thompson", "Caleb Davis", "Hannah Park", "Leo Garcia"],
    capacity: 32,
    image: "/images/events/Pikachu.png",
    status: "open",
  },
  {
    title: "Fall 2026 Tryout - Day 4",
    type: "Tryout",
    date: "Friday, Aug 28, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "Snyder Tennis Center",
    attendees: ["Emma Wilson", "Jason Liu", "Isabella Martinez", "Ryan Carter", "Aaliyah Brown"],
    capacity: 32,
    image: "/images/events/Snorlax.png",
    status: "open",
  },
  {
    title: "Fall 2026 Tryout - Day 5",
    type: "Tryout",
    date: "Saturday, Aug 29, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Snyder Tennis Center",
    attendees: ["Olivia Taylor", "Ben Robinson", "Chloe Anderson", "Samir Gupta", "Natalie Moore", "Tyler Evans", "Mei Lin"],
    capacity: 32,
    image: "/images/events/Jigglypuff.png",
    status: "open",
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
                Ready to compete, improve, and meet Hoos? Join one of our Fall
                2026 tryout sessions and earn your spot on the UVA Pickleball Club.
                Players of all skill levels are welcome.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ScrollToUpcomingEventsButton />

                <Button
                  variant="secondary"
                  className="h-10 rounded-md px-6 font-heading text-[11px] uppercase tracking-wide md:h-11 md:px-7"
                >
                  View Tryout Schedule
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
              Join the UVA Pickleball community on the courts. From daily drills
              to high-stakes tournaments, find your match here.
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
                    <Button
                      className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
                      disabled={event.status === "full"}
                    >
                      {event.status === "full" ? "Event Full" : "Sign Up"}
                    </Button>

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
