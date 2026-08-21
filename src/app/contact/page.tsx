import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import {
  Trophy,
  Users,
  TrendingUp,
  Flag,
  Mail
} from "lucide-react";

const officers = [
  {
    name: "Viviane Nguyen",
    role: "Co-President",
    year: "Class of 2027",
    school: "Politics, Philosophy",
    image: "/images/officers/Viviane2.png",
  },
  {
    name: "Aiden Elstun",
    role: "Co-President",
    year: "Class of 2027",
    school: "Mechanical Engineering",
    image: "/images/officers/Aiden2.png",
  },
  {
    name: "Amelie Yan",
    role: "Head of Sponsorships",
    year: "Class of 2029",
    school: "TBD",
    image: "/images/officers/Amelie.png",
  },
  {
    name: "Griffin Zara",
    role: "Treasurer",
    year: "Class of 2028",
    school: "Economics",
    image: "/images/officers/Griffin.png",
  },

];

const values = [
  {
    title: "PLAY & COMPETE",
    description: "From casual open play to tournaments, everyone is welcome to join",
    icon: Trophy,
  },
  {
    title: "MEET YOUR PEOPLE",
    description:
      "Pickleball brings together students from across UVA. Come for the games, meet new friends.",
    icon: Users,
  },
  {
    title: "GET BETTER TOGETHER",
    description:
      "Learn from other members, find practice partners, and keep improving your game",
    icon: TrendingUp,
  },
  {
    title: "REPRESENT UVA",
    description:
      "Our competitive players travel, compete, and represent Virginia against other universities",
    icon: Flag,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <div className="h-[2px] w-10 bg-[#e57200]" />
      <span className="text-xs font-bold uppercase tracking-wide text-[#e57200]">
        {children}
      </span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto max-w-[1450px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h1 className="font-bebas text-5xl uppercase leading-[1.05] tracking-wide sm:text-6xl lg:text-[72px]">
              Built by students.
              <br />
              For the{" "}
              <span className="text-[#e57200]">
                community.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-700 md:text-lg">
              Founded at the University of Virginia, UVA Pickleball brings students together through recreational play, friendly competition, and a shared passion for pickleball.
            </p>
          </div>

          <div className="relative h-[640px] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/about/team-photo.jpg"
              alt="UVA Pickleball Club members"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* Left side */}
          <div>
            {/* Mission */}
            <SectionLabel>Our Mission</SectionLabel>

            <div className="relative overflow-hidden rounded-xl bg-[#f7f7f5] px-8 py-12 md:px-12 md:py-14">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#1f2328] md:text-4xl">
                  Growing Community Through
                  <br />
                  Competition
                </h2>

                <p className="mt-7 text-lg leading-8 text-[#5f4b3f] md:text-xl">
                  The UVA Pickleball Club is a student-run organization
                  passionate about growing the game and building a strong,
                  welcoming community for players of all levels at UVA.
                </p>
              </div>

            </div>

            {/* Values */}
            <div className="mt-10 space-y-8">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="grid gap-4 sm:grid-cols-[52px_1fr]"
                  >
                    <div className="flex justify-center sm:justify-start">
                      <Icon
                        strokeWidth={1.8}
                        className="h-9 w-9 text-[#e57200]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-[#1f2328]">
                        {value.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-700">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Officers */}
            <div className="mt-14">
              <SectionLabel>Club Officers</SectionLabel>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {officers.map((officer) => (
                  <article key={officer.name}>
                    <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={officer.image}
                        alt={officer.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-12">
                        <span className="inline-block rounded-sm bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#111827]">
                          {officer.role}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-[#111827]">
                      {officer.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {officer.year} · {officer.school}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>


          {/* Right contact card */}
          <aside className="rounded-xl border border-slate-100 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <h2 className="font-bebas text-4xl uppercase tracking-wide">
              Get in touch
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700">
              {/* Have questions about tryouts, access to the club, or
              sponsorships? Drop us a message. */}
              This feature will be available soon! Contact us directly at pickleatuva@gmail.com
            </p>

            <form className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-wider"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="h-12 w-full rounded-sm border border-slate-300 px-4 text-sm outline-none transition focus:border-[#e57200] focus:ring-1 focus:ring-[#e57200]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-wider"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@virginia.edu"
                  className="h-12 w-full rounded-sm border border-slate-300 px-4 text-sm outline-none transition focus:border-[#e57200] focus:ring-1 focus:ring-[#e57200]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-wider"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-sm border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#e57200] focus:ring-1 focus:ring-[#e57200]"
                />
              </div>

              <button
                type="submit"
                disabled
                className="h-12 w-full cursor-not-allowed rounded-sm bg-slate-300 text-sm font-bold uppercase tracking-wide text-slate-500"
              >
                Send Message
              </button>

              <div className="border-t border-slate-200 pt-6">
                <div className="space-y-6">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/pickleballclubatuva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit gap-4"
                  >
                    <FaInstagram className="mt-0.5 h-6 w-6 shrink-0 text-[#e57200] transition group-hover:text-[#c95f00]" />

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider">
                        Instagram
                      </p>

                      <span className="mt-1 block text-sm text-slate-700 transition group-hover:text-[#e57200]">
                        @pickleballclubatuva
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=pickleatuva@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit gap-4"
                  >
                    <Mail className="mt-0.5 h-6 w-6 shrink-0 text-[#e57200] transition group-hover:text-[#c95f00]" />

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider">
                        Email
                      </p>

                      <span className="mt-1 block text-sm text-slate-700 transition group-hover:text-[#e57200]">
                        pickleatuva@gmail.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
