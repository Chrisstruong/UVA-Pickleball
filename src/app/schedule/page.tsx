import { MapPin } from "lucide-react";

const schedule = [
  {
    day: "MON",
    time: "4:00 PM - 5:45 PM",
    type: "Tournament",
    title: "Snyder courts 4, 5, 9, & 10",
    category: "tournament",
  },
  {
    day: "MON",
    time: "6:00 PM - 8:00 PM",
    type: "Social",
    title: "Perry Fishburne courts 3-8",
    category: "social",
  },
  {
    day: "THU",
    time: "4:00 PM - 5:45 PM",
    type: "Tournament",
    title: "Snyder courts 9 & 10",
    category: "tournament",
  },
  {
    day: "THU",
    time: "6:00 PM - 8:00 PM",
    type: "Social",
    title: "Perry Fishburne courts 3-8",
    category: "social",
  },
  {
    day: "FRI",
    time: "3:30 PM - 5:30 PM",
    type: "General",
    title: "Snyder courts 4, 5, 9, & 10",
    category: "general",
  },
  {
    day: "SUN",
    time: "3:00 PM - 5:00 PM",
    type: "Tournament",
    title: "Snyder courts 4, 5, 9, & 10",
    category: "tournament",
  },
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const timeSlots = [
  "3:00 PM - 5:00 PM",
  "3:30 PM - 5:30 PM",
  "4:00 PM - 5:45 PM",
  "6:00 PM - 8:00 PM",
];

const categoryStyles = {
  tournament: "bg-[#f97316] text-white",
  social: "bg-[#30218c] text-white",
  general: "border border-[#f97316] bg-white text-[#30218c]",
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
              Check your group, time, and court location
              before heading out.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <VenueCard name="Snyder" courts="Courts 4, 5, 9, & 10" />
            <VenueCard name="Perry Fishburne" courts="Courts 3-8" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-9 flex flex-wrap gap-3">
          <LegendDot color="bg-[#f97316]" label="Tournament" />
          <LegendDot color="bg-[#30218c]" label="Social" />
          <LegendDot color="bg-white border border-[#f97316]" label="General" />
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
                          className={`rounded-md p-3 ${categoryStyles[
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
          <div className="relative overflow-hidden rounded-xl bg-[#e57200] p-8 text-white">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold">
                Tournament Practice
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/80">
                Monday through Thursday from 4:00 PM to 5:45 PM, plus Friday
                from 3:30 PM to 5:30 PM at Snyder.
              </p>

              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-white/90">
                Thursday uses courts 9 & 10 only
              </p>
            </div>
          </div>

          {/* Social and General */}
          <div className="rounded-xl bg-[#30218c] p-8 text-white">
            <h2 className="text-3xl font-bold">
              Social & General Play
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">
              Social meets Monday through Thursday from 6:00 PM to 8:00 PM at
              Perry Fishburne. <br />General meets Sunday from 3:00 PM to 5:00 PM at
              Snyder.
            </p>

            <div className="mt-7 flex items-center gap-3">

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

function VenueCard({
  name,
  courts,
}: {
  name: string;
  courts: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-5 py-4">
      <MapPin className="h-5 w-5 shrink-0 text-[#0076b8]" />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {name}
        </p>

        <p className="text-sm font-medium">
          {courts}
        </p>
      </div>
    </div>
  );
}
