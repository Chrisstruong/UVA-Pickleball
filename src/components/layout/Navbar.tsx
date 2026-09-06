"use client";

import Link from "next/link";
import Image from "next/image";
import { CircleUser, LogOut, Menu, X, Shield,LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";



const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  {
    name: "Merch",
    href: "https://pickleball-club-at-uva.square.site/",
    external: true,
  },
  { name: "Announcements", href: "/announcements" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOfficer, setIsOfficer] = useState(false);
  const supabase = useMemo(() => createClient(), []);


  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsLoggedIn(false);
    setIsMenuOpen(false);

    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);

      if (!user) {
        setIsOfficer(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setIsOfficer(
        profile?.role === "officer" ||
        profile?.role === "admin"
      );
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;

      setIsLoggedIn(!!user);

      if (!user) {
        setIsOfficer(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setIsOfficer(
        profile?.role === "officer" ||
        profile?.role === "admin"
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:h-24">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-5">
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
          <span className="hidden text-sm font-bold leading-tight tracking-wide text-black sm:block xl:text-xl">
            UVA PICKLEBALL CLUB
            <br />
            Fall 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mx-5 hidden min-w-0 flex-1 items-center justify-center gap-3 text-xs font-medium lg:flex xl:gap-6 xl:text-sm">
          {links.map((link) => {
            const isActive =
              link.external
                ? false
                : link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

            const className = `relative py-2 transition-colors ${isActive
              ? "text-[#e57200]"
              : "text-black hover:text-[#e57200]"
              }`;

            return link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {link.name}
              </a>
            ) : (
              <Link key={link.name} href={link.href} className={className}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Account */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1">
              {isOfficer && (
                <Link
                  href="/admin"
                  aria-label="Admin Dashboard"
                  title="Admin Dashboard"
                  className="flex h-10 items-center gap-2 rounded-full bg-[#07192d] px-4 text-sm font-semibold text-white transition hover:bg-[#E57200]"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="hidden xl:inline">
                    Admin Dashboard
                  </span>
                </Link>
              )}
              <Link
                href="/profile"
                aria-label="My Profile"
                title="My Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
              >
                <CircleUser className="h-5 w-5" />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log Out"
                title="Log Out"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#07192d] transition hover:bg-slate-100 hover:text-[#E57200]"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Log In"
              title="Log In"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
            >
              <CircleUser className="h-5 w-5" />
            </Link>
          )}

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
                link.external
                  ? false
                  : link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

              const className = `border-b border-slate-100 px-2 py-3 text-base font-medium transition-colors last:border-b-0 ${isActive
                ? "text-[#e57200]"
                : "text-black hover:text-[#e57200]"
                }`;

              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className={className}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={className}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-slate-100 pt-3">
              {isLoggedIn ? (
                <div className="flex flex-col">
                  {isOfficer && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-md px-2 py-3 text-base font-medium text-[#07192d] transition hover:bg-slate-50 hover:text-[#E57200]"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-2 py-3 text-base font-medium text-[#07192d] transition hover:bg-slate-50 hover:text-[#E57200]"
                  >
                    <CircleUser className="h-5 w-5" />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-3 text-left text-base font-medium text-[#07192d] transition hover:bg-slate-50 hover:text-[#E57200]"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-md px-2 py-3 text-base font-medium text-[#07192d] transition hover:bg-slate-50 hover:text-[#E57200]"
                >
                  <CircleUser className="h-5 w-5" />
                  Log In
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
