import Image from "next/image";

const sponsors = [
  {
    name: "HEAD",
    logo: "/images/logos/sponsors/head.jpg",
  },
  {
    name: "CVILLE SMASH",
    logo: "/images/logos/sponsors/cvillesmash.png",
  },
  {
    name: "REIGN STORM",
    logo: "/images/logos/sponsors/ReignStorm.png",
  },
  {
    name: "Sergio Tachinni",
    logo: "/images/logos/sponsors/st.png",
  },
];

const teams = [
  {
    name: "Virginia Tech",
    logo: "/images/logos/schools/vt.svg",
  },
  {
    name: "University of IOWA",
    logo: "/images/logos/schools/iowa.png",
  },
  {
    name: "Drury University",
    logo: "/images/logos/schools/drury.png",
  },
  {
    name: "George Mason University",
    logo: "/images/logos/schools/gm.png",
  },
  {
    name: "James Madison University",
    logo: "/images/logos/schools/jmu.png",
  },
  {
    name: "University of Connecticut",
    logo: "/images/logos/schools/uconn.png",
  },
  {
    name: "University of South Florida",
    logo: "/images/logos/schools/usf.png",
  },
];

export default function SponsorSection() {
  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div
          className="scroll-mt-24 bg-black text-center"
          id="sponsors"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-sm sm:tracking-[0.45em]">
            Our Sponsors
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
            Thank You To Our Partners
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px bg-white/20 sm:mt-14 md:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex min-h-32 items-center justify-center bg-black px-4 sm:min-h-40 sm:px-6 lg:min-h-44"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={320}
                height={160}
                className="max-h-20 w-auto max-w-full object-contain sm:max-h-28 lg:max-h-32"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center sm:mt-20 lg:mt-24">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-sm sm:tracking-[0.45em]">
            Teams We Compete Against
          </p>

          <h3 className="mt-4 text-3xl font-black uppercase tracking-wide sm:text-4xl md:text-5xl">
            Great Competition. Stronger Together.
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:mt-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
  {teams.map((team) => (
    <div
      key={team.name}
      className="flex min-h-32 flex-col items-center justify-center border-b border-r border-white/20 bg-black px-3 py-5 text-center sm:px-4"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center sm:mb-4 sm:h-16 sm:w-16">
        <Image
          src={team.logo}
          alt={team.name}
          width={80}
          height={80}
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>

      <p className="text-xs font-semibold leading-5 text-white sm:text-sm">
        {team.name}
      </p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}