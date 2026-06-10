export default function HomePage(){
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide">
          Welcome to
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          UVA Pickleball Club
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          Join one of the fastest-growing sports in communities at UVA. Find Practices events tournaments, and ways to get involved.
        </p>

        <div className="flex gap-4">
          <a 
            href="/schedule"
            className="rounded-lg bg-black px-5 py-3 text-white"
            >
              View Schedule
            </a>

            <a
              href="/events"
              className="rounded-lg border px-5 py-3"
            >
              See Events
            </a>
        </div>
      </div>
    </section>
  )
}