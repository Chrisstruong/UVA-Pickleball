import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { SiGroupme } from "react-icons/si";

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Team",
    href: "/team",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Schedule",
    href: "/schedule",
  },
  {
    label: "Merch",
    href: "/merch",
  },
  {
    label: "Announcements",
    href: "/announcements",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const connectLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pickleballclubatuva",
    icon: FaInstagram,
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=pickleatuva@gmail.com",
    icon: Mail,
  },
  {
    label: "GroupMe",
    href: "https://web.groupme.com/join_group/116766680/noCsdGoz",
    icon: SiGroupme,
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:py-14">
        {/* Main Footer Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.4fr] lg:gap-12">
          {/* Club Info */}
          <div>
            <h2 className="font-heading text-xl font-bold tracking-wide sm:text-2xl">
              UVA Pickleball Club
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Building the largest pickleball community at the University of
              Virginia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
              Quick Links
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/60 transition hover:text-orange-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
              Connect
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {connectLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
              Location
            </h3>

            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

              <p className="text-sm leading-6 text-white/60">
                Snyder Tennis Center
                <br />
                Pickleball Courts 4, 5, 9 & 10
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <iframe
                src="https://www.google.com/maps?q=Snyder%20Tennis%20Center%20Charlottesville%20VA&output=embed"
                title="Snyder Tennis Center location"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
          <p className="text-center text-xs leading-5 text-white/50 sm:text-left sm:text-sm">
            © 2026 UVA Pickleball Club. University of Virginia.
          </p>
        </div>
      </div>
    </footer>
  );
}