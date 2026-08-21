"use client";

import Link from "next/link";
import Image from "next/image";
import { CircleUser, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:h-24">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Image
            src="/images/logo.svg"
            alt="UVA Pickleball Logo"
            width={240}
            height={120}
            priority
            className="h-11 w-auto object-contain sm:h-14 lg:h-16"
          />

          {/* Divider */}
          <div className="hidden h-10 w-px bg-gray-300 sm:block lg:h-12" />

          {/* Club Name */}
          <span className="hidden text-sm font-bold leading-tight tracking-wide text-black sm:block lg:text-xl">
            UVA PICKLEBALL CLUB
            <br />
            Fall 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-8">
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

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Account */}
          <Link
            href="/login"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
          >
            <CircleUser className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-slate-100 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b border-slate-100 px-2 py-3 text-base font-medium transition-colors last:border-b-0 ${
                    isActive
                      ? "text-[#e57200]"
                      : "text-black hover:text-[#e57200]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}