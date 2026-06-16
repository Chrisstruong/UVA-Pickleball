import Link from "next/link";
import Image from "next/image";
import { CircleUser } from "lucide-react";

const links = [
   { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Merch", href: "/merch" },
  { name: "Announcements", href: "/announcements" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6">
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
        </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="md:hidden text-sm font-medium">
          Menu
        </button>
        <Link
  href="/login"
  className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100"
>
  <CircleUser className="h-5 w-5" />
</Link>
      </div>
    </header>
  );
}