import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import ScrollToUpcomingEventsButton from "@/components/events/ScrollToUpcomingEventsButton";
import ViewAttendeesButton from "@/components/events/ViewAttendeesButton";
import EventRegistrationButton, {
  type CurrentRegistrationStatus,
} from "@/components/events/EventRegistrationButton";
import EventsRealtimeListener from "@/components/events/EventsRealtimeListener";
import EventsPresence from "@/components/events/EventsPresence";

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

type EventRegistration = {
  event_id: string;
  user_id: string;
  status: string;
  registered_at: string;
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

  const [authResult, eventsResult] = await Promise.all([
    supabase.auth.getUser(),
    supabase
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
      .order("start_time", { ascending: true }),
  ]);

  const user = authResult.data.user;

  if (authResult.error) {
    console.error("Failed to authenticate Events page user:", authResult.error);
  }

  if (eventsResult.error) {
    console.error("Failed to fetch events:", eventsResult.error);
  }

  const eventList: ClubEvent[] = eventsResult.data ?? [];
  const registrationCounts = new Map<string, number>();
  const waitlistCounts = new Map<string, number>();
  const profilePromise = user
    ? supabase
      .from("profiles")
      .select("id, full_name, avatar_url, club_group")
      .eq("id", user.id)
      .single()
    : Promise.resolve({ data: null, error: null });
  const registrationsPromise =
    eventList.length > 0
      ? supabaseAdmin
        .from("event_registrations")
        .select("event_id, user_id, status, registered_at")
        .in(
          "event_id",
          eventList.map((event) => event.id)
        )
        .in("status", ["registered", "waitlisted"])
        .order("registered_at", { ascending: true })
      : Promise.resolve({
        data: [] as EventRegistration[],
        error: null,
      });

  const [profileResult, registrationsResult] = await Promise.all([
    profilePromise,
    registrationsPromise,
  ]);
  const profile = profileResult.data;
  const eventRegistrations: EventRegistration[] =
    registrationsResult.data ?? [];

  if (profileResult.error) {
    console.error("Failed to fetch Events page profile:", profileResult.error);
  }

  if (registrationsResult.error) {
    console.error(
      "Failed to fetch registration counts:",
      registrationsResult.error
    );
  }

  eventRegistrations.forEach((registration) => {
    if (registration.status === "registered") {
      registrationCounts.set(
        registration.event_id,
        (registrationCounts.get(registration.event_id) ?? 0) + 1
      );
    } else if (registration.status === "waitlisted") {
      waitlistCounts.set(
        registration.event_id,
        (waitlistCounts.get(registration.event_id) ?? 0) + 1
      );
    }
  });

  if (user) {
    registeredEventIds = new Set(
      eventRegistrations
        .filter(
          (registration) =>
            registration.user_id === user.id &&
            registration.status === "registered"
        )
        .map((registration) => registration.event_id)
    );

    waitlistedEventIds = new Set(
      eventRegistrations
        .filter(
          (registration) =>
            registration.user_id === user.id &&
            registration.status === "waitlisted"
        )
        .map((registration) => registration.event_id)
    );
  }

  return (
    <main className="bg-slate-50">
      <EventsRealtimeListener />

      <section className="mx-auto max-w-7xl px-5 py-6 md:px-6 md:py-8">
        <div className="relative mx-auto min-h-[560px] w-full overflow-hidden rounded-2xl sm:min-h-[500px] md:h-[450px] md:min-h-0">
          <Image
            src="/images/events/SocialPlays.jpg"
            alt="UVA Pickleball Fall 2026 Social Plays"
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
                Let&apos;s play
                <br />
                PICKLEBALL.
              </h1>

              <h2 className="mt-3 font-heading text-xl font-bold uppercase leading-tight tracking-wide text-orange-600 sm:text-2xl md:text-3xl">
                Fall 2026 Events
              </h2>

              <p className="mt-4 max-w-[500px] text-sm leading-6 text-white/90 md:text-base">
                Grab your paddle and come hang out with the Hoos! Join us for social play, friendly games, and plenty of fun on the court. Upcoming social and tournament events are listed below. Check back often for new events and updates.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ScrollToUpcomingEventsButton />


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Fall 2026 events */}
      {/* <MoreEventsComing /> */}

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

          <EventsPresence
            userId={user?.id ?? null}
            fullName={profile?.full_name ?? null}
            avatarUrl={profile?.avatar_url ?? null}
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {eventList.map((event) => {
              const registrationCount = registrationCounts.get(event.id) ?? 0;
              const waitlistCount = waitlistCounts.get(event.id) ?? 0;
              const isFull = registrationCount >= event.capacity;
              const currentUserRegistrationStatus: CurrentRegistrationStatus =
                registeredEventIds.has(event.id)
                  ? "registered"
                  : waitlistedEventIds.has(event.id)
                    ? "waitlisted"
                    : "none";

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
                    <ViewAttendeesButton
                      eventId={event.id}
                      eventTitle={event.title}
                      capacity={event.capacity}
                      registrationCount={registrationCount}
                      waitlistCount={waitlistCount}
                      canViewAttendees={!!user}
                      triggerVariant="countBadge"
                    />
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
                        key={`${event.id}-${currentUserRegistrationStatus}`}
                        eventId={event.id}
                        isSignedIn={!!user}
                        currentRegistrationStatus={currentUserRegistrationStatus}
                        isFull={isFull}
                        userGroup={profile?.club_group ?? null}
                        requiredGroup={event.required_group}
                        registrationOpen={event.registration_open}
                      />

                      <ViewAttendeesButton
                        eventId={event.id}
                        eventTitle={event.title}
                        capacity={event.capacity}
                        registrationCount={registrationCount}
                        waitlistCount={waitlistCount}
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
