import Image from "next/image";
import { Users } from "lucide-react";

const players = [
  {
    name: "Viviane Ngo",
    year: "4th Year",
    major: "Politics & Psychology",
    dupr: "4.61",
    team: "Tournament Team",
    hometown: "Mclean, VA",
    image: "/images/team/Viviane2.png",
  },
  {
    name: "Aiden Elsten",
    year: "4th Year",
    major: "Mechanical Engineering",
    dupr: "4.58",
    team: "Tournament Team",
    hometown: "Moseley, VA",
    image: "/images/team/Aiden2.png",
  },
  {
    name: "Amelie Yan",
    year: "2nd Year",
    major: "TBD",
    dupr: "4.34",
    team: "Tournament Team",
    hometown: "Charlottesvile, VA",
    image: "/images/team/Amelie.png",
  },
  {
    name: "Nate Kim",
    year: "4th Year",
    major: "Computer Science",
    dupr: "4.16",
    team: "Tournament Team",
    hometown: "Ashburn, VA",
    image: "/images/team/Nate.png",
  },
  {
    name: "Mia Kim",
    year: "4th Year",
    major: "Nursing",
    dupr: "4.90",
    team: "Tournament Team",
    hometown: "Fairfax, VA",
    image: "/images/team/Mia.png",
  },
  {
    name: "Kate Liang",
    year: "4th Year",
    major: "Biology",
    dupr: "3.91",
    team: "Tournament Team",
    hometown: "Fairfax, VA",
    image: "/images/team/Kate.png",
  },


];

export default function TeamPage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto max-w-[1450px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">

        {/* Roster Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e57200]">
              2026–27 Roster
            </p>

            <h1 className="font-bebas mt-2 text-5xl uppercase tracking-wide">
              Meet the Team
            </h1>
          </div>
        </div>

        {/* Tryout / Roster Update */}
        <div className="mb-10 overflow-hidden rounded-xl border border-[#e57200]/20 bg-[#fff8f2]">
          <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e57200]/10">
                <Users className="h-5 w-5 text-[#e57200]" />
              </div>

              {/* Text */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e57200]">
                  Roster Update
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight text-[#111827]">
                  New tournament and social players coming soon
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Our Fall 2026 tournament and social roster will be finalized after tryouts.
                  Check back soon to meet the newest members representing UVA.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-[#e57200]/20 bg-white px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#e57200]">
                Tryouts Pending
              </span>
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((player) => (
            <article key={player.name} className="group">

              {/* Player Photo */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />

                {/* Team Label */}
                <div className="absolute left-4 top-4 bg-[#e57200] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {player.team}
                </div>
              </div>

              {/* Player Info */}
              <div className="border-b border-slate-200 py-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {player.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <span>{player.year}</span>
                  <span className="text-slate-300">•</span>
                  <span>{player.major}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      DUPR
                    </p>

                    <p className="mt-1 font-semibold">
                      {player.dupr}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Hometown
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {player.hometown}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  );
}