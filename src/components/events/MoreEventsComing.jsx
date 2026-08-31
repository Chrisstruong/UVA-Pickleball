import {
  CalendarDays,
  Clock3,
  Handshake,
  Trophy,
  Users,
} from "lucide-react";

const upcomingTypes = [
  {
    label: "OPEN PLAY",
    icon: Users,
  },
  {
    label: "PRACTICES",
    icon: CalendarDays,
  },
  {
    label: "TOURNAMENTS",
    icon: Trophy,
  },
  {
    label: "SOCIAL EVENTS",
    icon: Handshake,
  },
];

export default function MoreEventsComing() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-5 md:px-6 md:py-6">
      <div className="rounded-2xl bg-[#07192D] px-6 py-6 text-white md:px-8 md:py-7">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10">
            <CalendarDays className="h-5 w-5 text-orange-500" />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl md:text-4xl">
              More Events Are Coming!
            </h2>

            <p className="mt-1 text-sm text-white/70 md:text-base">
              The season is just getting started. Check back after tryouts for:
            </p>
          </div>
        </div>

        {/* Event Types */}
        <div className="mt-6 grid grid-cols-2 gap-y-6 md:grid-cols-4">
          {upcomingTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center px-3 text-center ${
                  index !== 0 ? "md:border-l md:border-white/15" : ""
                }`}
              >
                <Icon
                  className="mb-2 h-7 w-7 text-orange-500"
                  strokeWidth={1.8}
                />

                <span className="font-heading text-xs font-bold tracking-wide sm:text-sm">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-6 border-t border-orange-500/40 pt-4">
          <div className="flex items-start gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

            <p className="text-xs leading-5 text-white/70 sm:text-sm">
              More Fall 2026 events will be announced after tryouts.{" "}
              <span className="font-semibold text-orange-500">
                Check back after September 5!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}