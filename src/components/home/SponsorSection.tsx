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
    }
]

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
    }

];

export default function SponsorSection() {
    return (
        <section className="bg-black px-6 py-24 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.45em] text-orange-500">
                        Our Sponsors
                    </p>
                    <h2 className="mt-4 text-4xl font-black uppercase tracking-wide md:text-6xl">
                        Thank You To Our Partners
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-2 gap-px bg-white/20 md:grid-cols-3 lg:grid-cols-4">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.name}
                            className="flex min-h-44 items-center justify-center bg-black px-6">
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={320}
                                height={160}
                                className="max-h-32 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.45em] text-orange-500">
                        Teams We Compete Against
                    </p>
                    <h3 className="mt-4 text-4xl font-black uppercase tracking-wide md:text-5xl">
                        Great Competition. Stronger Together.
                    </h3>
                </div>

                <div className="mt-14 grid grid-cols-2 gap-px bg-white/20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {teams.map((team) => (
                        <div
                            key={team.name}
                            className="flex min-h-32 flex-col items-center justify-center bg-black px-4 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                                <Image
                                    src={team.logo}
                                    alt={team.name}
                                    width={80}
                                    height={80}
                                    className="h-16 w-auto object-contain"
                                />
                                </div>

                                 <p className="text-sm font-semibold leading-5 text-white">
                                {team.name}
                            </p>
                            </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
