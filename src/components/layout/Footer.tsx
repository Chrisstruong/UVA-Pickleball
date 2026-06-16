import Link from "next/link";

const quickLinks = [
    {
        label: "Home", 
        href: "/",
    },
    {
        label: "Events",
        href: "/events",
    },
    {
        label: "Schedule",
        href: "/schedule"
    },
    {
        label: "Merch",
        href: "/merch",
    },
    {
        label: "Sponsors",
        href: "/sponsors",
    },
    {
        label: "Contact",
        href: "/contact",
    }
]

const connectLinks = [
    {
        label: "Instagram",
        href: "https://instagram.com"
    },
    {
        label: "GroupMe",
        href: "https://groupme.com",
    },
    {
        label: "Email",
        href: "mailto: aaa@virginia.edu",
    }
]


export default function Footer() {
    return(
        <footer className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <h2 className="font-heading text-xl font-bold tracking-wide">
                            UVA Pickleball Club
                        </h2>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                        Building the largest pickleball community at the University of Virginia.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm uppercase tracking-widest text-white">
                            Quick Links
                        </h3>
                        
                        <div className="mt-4 flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <Link 
                                key = {link.label}
                                href = {link.href}
                                className="text-sm text-white/60 transition hover:text-orange-500">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm uppercase tracking-widest text-white">
                            Connect
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                            {connectLinks.map((link) => (
                                <Link 
                                key = {link.label}
                                href = {link.href}
                                className="text-sm text-white/60 transition hover:text-orange-500"
                                target={link.label === "Email" ? undefined : "_blank"}
                                rel = {link.label === "Email" ? undefined : "noreferrer"}
                                >
                                {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
  <h3 className="font-heading text-sm uppercase tracking-widest">
    Location
  </h3>

  <p className="mt-4 text-sm text-white/60">
    Snyder Tennis Center
    <br />
    Pickleball Court #8, 9, 10, 11, 12
  </p>

  <iframe
  src="https://www.google.com/maps?q=Snyder%20Tennis%20Center%20Charlottesville%20VA&output=embed"
  width="100%"
  height="160"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
/>
</div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
                            © 2026 UVA Pickleball Club. University of Virginia.
                </div>

                
            </div>
        </footer>
    )
}