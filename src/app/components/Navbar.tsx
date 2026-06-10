import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold">
            UVA Pickleball Club
            </Link>

                <div className="flex gap-6 text-sm font-medium">
                    <Link href="/about">About</Link>
                    <Link href="/schedule">Schedule</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/sponsors">Sponsors</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </nav>
            </header>
    );
}