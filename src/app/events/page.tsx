import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import ScrollToUpcomingEventsButton from "@/components/events/ScrollToUpcomingEventsButton";
import ViewAttendeesButton from "@/components/events/ViewAttendeesButton";
import MoreEventsComing from "@/components/events/MoreEventsComing";
import EventRegistrationButton from "@/components/events/EventRegistrationButton";

type ClubEvent = {
  id: string;
  title: string;
  description: string | null;
  event_type: string | null;
  location: string | null;
  image_url: string | null;

  start_time: string;
  end_time: string | null;

  capacity: number;
  required_group: string | null;
  registration_open: boolean;
};

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "long",
  month: "short",
  day: "numeric",
});

const eventTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

function formatEventDate(startTime: string) {
  return eventDateFormatter.format(new Date(startTime));
}

function formatEventTime(startTime: string, endTime: string | null) {
  const start = eventTimeFormatter.format(new Date(startTime));

  if (!endTime) {
    return start;
  }

  return `${start}–${eventTimeFormatter.format(new Date(endTime))}`;
}



export default async function EventsPage() {
  const supabase = await createClient();
  let registeredEventIds: Set<string> = new Set();
  let waitlistedEventIds: Set<string> = new Set();

  // 1. Get signed-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Get profile if signed in
  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, club_group")
      .eq("id", user.id)
      .single();

    profile = data;
  }

  // 3. Get events
  const { data: events, error } = await supabase
    .from("events")
    .select(`
    id,
    title,
    description,
    event_type,
    location,
    image_url,
    start_time,
    end_time,
    capacity,
    required_group,
    registration_open
  `)
    .order("start_time", { ascending: true });
  if (error) {
    console.error("Failed to fetch events:", error);
  }

  const eventList: ClubEvent[] = events ?? [];
  const registrationCounts = new Map<string, number>();
  const attendeeNamesByEvent = new Map<string, string[]>();

  if (eventList.length > 0) {
    const { data: activeRegistrations, error: registrationsError } =
      await supabaseAdmin
        .from("event_registrations")
        .select("event_id, user_id")
        .in(
          "event_id",
          eventList.map((event) => event.id)
        )
        .eq("status", "registered");

    if (registrationsError) {
      console.error("Failed to fetch registration counts:", registrationsError);
    }

    activeRegistrations?.forEach((registration) => {
      registrationCounts.set(
        registration.event_id,
        (registrationCounts.get(registration.event_id) ?? 0) + 1
      );
    });

    if (user && activeRegistrations && activeRegistrations.length > 0) {
      const attendeeIds = [
        ...new Set(
          activeRegistrations.map((registration) => registration.user_id)
        ),
      ];

      const { data: attendeeProfiles, error: attendeeProfilesError } =
        await supabaseAdmin
          .from("profiles")
          .select("id, full_name")
          .in("id", attendeeIds);

      if (attendeeProfilesError) {
        console.error(
          "Failed to fetch attendee profiles:",
          attendeeProfilesError
        );
      }

      const attendeeNameById = new Map(
        attendeeProfiles?.map((attendee) => [
          attendee.id,
          attendee.full_name || "Club Member",
        ]) ?? []
      );

      activeRegistrations.forEach((registration) => {
        const existingNames =
          attendeeNamesByEvent.get(registration.event_id) ?? [];

        attendeeNamesByEvent.set(registration.event_id, [
          ...existingNames,
          attendeeNameById.get(registration.user_id) ?? "Club Member",
        ]);
      });

      attendeeNamesByEvent.forEach((names) => {
        names.sort((first, second) => first.localeCompare(second));
      });
    }
  }

  if (user) {
    const { data: registrations } = await supabase
      .from("event_registrations")
      .select("event_id, status")
      .eq("user_id", user.id)
      .in("status", ["registered", "waitlisted"]);

    registeredEventIds = new Set(
      registrations
        ?.filter((registration) => registration.status === "registered")
        .map((registration) => registration.event_id) ?? []
    );

    waitlistedEventIds = new Set(
      registrations
        ?.filter((registration) => registration.status === "waitlisted")
        .map((registration) => registration.event_id) ?? []
    );
  }
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-6 md:py-8">
        <div className="relative mx-auto min-h-[560px] w-full overflow-hidden rounded-2xl sm:min-h-[500px] md:h-[450px] md:min-h-0">
          <Image
            src="/images/events/TryOut2026.jpg"
            alt="UVA Pickleball Fall 2026 Tryouts"
            fill
            priority
            className="object-cover object-[60%_center]"
          />

          {/* Dark overlay only on the left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="absolute inset-0 flex items-center px-5 py-10 sm:px-8 md:px-12 md:py-14">
            <div className="w-full max-w-[520px]">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                  Now Open
                </span>

                <span className="rounded-full bg-neutral-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                  Fall 2026
                </span>
              </div>

              <h1 className="font-hero text-5xl leading-[0.9] tracking-wide text-white min-[380px]:text-6xl md:text-7xl lg:text-8xl">
                WELCOME BACK,
                <br />
                HOOS.
              </h1>

              <h2 className="mt-3 font-heading text-xl font-bold uppercase leading-tight tracking-wide text-orange-600 sm:text-2xl md:text-3xl">
                Fall 2026 Tryouts
              </h2>

              <p className="mt-4 max-w-[500px] text-sm leading-6 text-white/90 md:text-base">
                Ready to compete, improve, and meet Hoos? Join our Fall
                2026 tryout session and earn your spot on the UVA Pickleball Club.
                Players of all skill levels are welcome.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ScrollToUpcomingEventsButton />

                <Button
                  asChild
                  variant="secondary"
                  className="h-10 w-full rounded-md px-6 font-heading text-[11px] uppercase tracking-wide sm:w-auto md:h-11 md:px-7"
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

      {/* More Fall 2026 events */}
      <MoreEventsComing />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:px-6 md:py-10 lg:grid-cols-[260px_1fr]">
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
          <div className="mb-7 text-center md:mb-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Upcoming Events
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Join the UVA Pickleball community on the courts. Find your match here.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {eventList.map((event) => {
              const registrationCount = registrationCounts.get(event.id) ?? 0;
              const attendees = attendeeNamesByEvent.get(event.id) ?? [];
              const isFull = registrationCount >= event.capacity;

              return (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 sm:h-52">
                    <Image
                      src={event.image_url ?? "/images/events/Pikachu.png"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded bg-orange-600 px-2 py-1 font-heading text-[10px] uppercase tracking-widest text-white sm:left-4 sm:top-4">
                      {event.event_type ?? "Club Event"}
                    </span>
                    <span className="absolute right-3 top-3 rounded bg-white px-2 py-1 text-xs font-bold text-slate-700 sm:right-4 sm:top-4">
                      <Users className="mr-1 inline h-3 w-3" />
                      {registrationCount}/{event.capacity}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                      {event.title}
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex items-start gap-2">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        {formatEventDate(event.start_time)}
                      </p>
                      <p className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        {formatEventTime(event.start_time, event.end_time)}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        {event.location ?? "Location to be announced"}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 lg:grid-cols-2">
                      <EventRegistrationButton
                        eventId={event.id}
                        isSignedIn={!!user}
                        isRegistered={registeredEventIds.has(event.id)}
                        isWaitlisted={waitlistedEventIds.has(event.id)}
                        isFull={isFull}
                        userGroup={profile?.club_group ?? null}
                        requiredGroup={event.required_group}
                        registrationOpen={event.registration_open}
                      />

                      <ViewAttendeesButton
                        eventTitle={event.title}
                        attendees={attendees}
                        capacity={event.capacity}
                        registrationCount={registrationCount}
                        canViewAttendees={!!user}
                      />
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
