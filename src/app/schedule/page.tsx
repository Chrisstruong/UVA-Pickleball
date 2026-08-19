import { MapPin } from "lucide-react";

const schedule = [
  {
    day: "MON",
    time: "15:00 - 18:00",
    type: "OPEN REC",
    title: "All-Levels Play",
    category: "rec",
  },
  {
    day: "MON",
    time: "18:00 - 22:00",
    type: "TEAM",
    title: "Travel Squad",
    category: "team",
  },
  {
    day: "TUE",
    time: "12:00 - 15:00",
    type: "CLINIC",
    title: "Intro to Dinking",
    category: "clinic",
  },
  {
    day: "TUE",
    time: "18:00 - 22:00",
    type: "OPEN REC",
    title: "Night Lights Social",
    category: "rec",
  },
  {
    day: "WED",
    time: "15:00 - 18:00",
    type: "OPEN REC",
    title: "All-Levels Play",
    category: "rec",
  },
  {
    day: "WED",
    time: "18:00 - 22:00",
    type: "TEAM",
    title: "Varsity Practice",
    category: "team",
  },
  {
    day: "THU",
    time: "12:00 - 15:00",
    type: "CLINIC",
    title: "Net Strategy",
    category: "clinic",
  },
  {
    day: "THU",
    time: "18:00 - 22:00",
    type: "OPEN REC",
    title: "Community Night",
    category: "rec",
  },
  {
    day: "FRI",
    time: "15:00 - 18:00",
    type: "TEAM",
    title: "Varsity Practice",
    category: "team",
  },
  {
    day: "FRI",
    time: "18:00 - 22:00",
    type: "TEAM",
    title: "Match Prep",
    category: "team",
  },
  {
    day: "SAT",
    time: "06:00 - 09:00",
    type: "DRILLS",
    title: "Advanced Ladder",
    category: "team",
  },
  {
    day: "SAT",
    time: "09:00 - 12:00",
    type: "OPEN REC",
    title: "Club Social Play",
    category: "rec",
  },
  {
    day: "SUN",
    time: "09:00 - 12:00",
    type: "OPEN REC",
    title: "Morning Mixers",
    category: "rec",
  },
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const timeSlots = [
  "06:00 - 09:00",
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 22:00",
];

const categoryStyles = {
  team: "bg-[#d75f00] text-white",
  rec: "bg-[#5c668c] text-white",
  clinic: "bg-[#0076b8] text-white",
};

export default function SchedulePage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto max-w-[1450px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        {/* Intro */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b54b00]">
              Court Availability
            </p>

            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              Practice{" "}
              <span className="bg-yellow-300 px-1">
                Schedule
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Join us at the Snyder Tennis Courts for our weekly practice
              sessions. Whether you&apos;re a beginner or a competitive player,
              we have dedicated time slots for everyone.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-5 py-4">
            <MapPin className="h-5 w-5 text-[#0076b8]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Primary Venue
              </p>

              <p className="text-sm font-medium">
                Snyder Tennis Courts
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-9 flex flex-wrap gap-3">
          <LegendDot color="bg-[#d75f00]" label="Competitive Team" />
          <LegendDot color="bg-[#5c668c]" label="Open Rec Play" />
          <LegendDot color="bg-[#0076b8]" label="Beginner Clinics" />
        </div>

        {/* Schedule */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[120px_repeat(7,1fr)] bg-slate-100">
              <div />

              {days.map((day) => (
                <div
                  key={day}
                  className="flex h-16 items-center justify-center text-xs font-bold tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {timeSlots.map((time) => (
              <div
                key={time}
                className="grid min-h-[82px] grid-cols-[120px_repeat(7,1fr)] border-t border-slate-200"
              >
                <div className="flex items-start justify-center bg-slate-50 pt-5 text-[10px] italic text-slate-600">
                  {time}
                </div>

                {days.map((day) => {
                  const item = schedule.find(
                    (entry) =>
                      entry.day === day &&
                      entry.time === time
                  );

                  return (
                    <div
                      key={`${day}-${time}`}
                      className="border-l border-slate-100 p-2"
                    >
                      {item && (
                        <div
                          className={`rounded-md p-3 ${
                            categoryStyles[
                              item.category as keyof typeof categoryStyles
                            ]
                          }`}
                        >
                          <p className="text-[8px] font-bold uppercase tracking-wide opacity-90">
                            {item.type}
                          </p>

                          <p className="mt-1 text-[11px] font-semibold leading-tight">
                            {item.title}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Competitive CTA */}
          <div className="relative overflow-hidden rounded-xl bg-[#7f3f12] p-8 text-white">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold">
                Want to compete?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/80">
                Auditions for our competitive travel squad are held every semester.
              </p>

              <button className="mt-6 rounded-lg bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9a4300] transition hover:bg-slate-100">
                Learn More
              </button>
            </div>
          </div>

          {/* Beginner CTA */}
          <div className="rounded-xl bg-[#0076b8] p-8 text-white">
            <h2 className="text-3xl font-bold">
              First time on the courts?
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">
              Our Beginner Clinics are free for members. We provide paddles and
              balls — just show up in athletic gear.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full border-2 border-white bg-slate-300" />
                <div className="h-9 w-9 rounded-full border-2 border-white bg-slate-400" />
                <div className="h-9 w-9 rounded-full border-2 border-white bg-slate-500" />
              </div>

              <p className="text-xs font-semibold">
                Join 200+ active members
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2">
      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
        {label}
      </span>
    </div>
  );
}
