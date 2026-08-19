"use client";

import Link from "next/link";
import Image from "next/image";
import { CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Merch", href: "/merch" },
  { name: "Announcements", href: "/announcements" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-6">
          <Image
            src="/images/logo.svg"
            alt="UVA Pickleball Logo"
            width={240}
            height={120}
            priority
            className="h-16 w-auto object-contain"
          />

          <div className="h-12 w-px bg-gray-300" />

          <span className="text-xl font-bold tracking-wide text-black">
            UVA PICKLEBALL CLUB
            <br />
            Fall 2026
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 transition-colors ${
                  isActive
                    ? "text-[#e57200]"
                    : "text-black hover:text-[#e57200]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile */}
        <button className="text-sm font-medium md:hidden">
          Menu
        </button>

        {/* Account */}
        <Link
          href="/login"
          className="flex items-center justify-center rounded-full p-2 transition hover:bg-slate-100"
        >
          <CircleUser className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}