export default function EventsLoading() {
  return (
    <main className="min-h-screen bg-slate-50" aria-label="Loading events">
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-6 md:py-8">
        <div className="h-[450px] animate-pulse rounded-2xl bg-slate-300 motion-reduce:animate-none" />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
        <div className="mx-auto h-11 w-64 animate-pulse rounded-lg bg-slate-300 motion-reduce:animate-none" />
        <div className="mx-auto mt-3 h-5 w-full max-w-lg animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />

        <div className="mt-8 h-24 animate-pulse rounded-3xl bg-[#0a2a40] motion-reduce:animate-none" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="h-52 animate-pulse bg-slate-300 motion-reduce:animate-none" />
              <div className="space-y-4 p-6">
                <div className="h-7 w-2/3 animate-pulse rounded bg-slate-300 motion-reduce:animate-none" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                <div className="h-10 animate-pulse rounded-lg bg-slate-200 motion-reduce:animate-none" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
