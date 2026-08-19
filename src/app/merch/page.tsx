export default function MerchPage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto max-w-[1450px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        {/* Header */}
        <div>
          <h1 className="font-bebas text-5xl uppercase leading-none tracking-wide sm:text-6xl lg:text-[64px]">
            Official Gear
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-700 md:text-base">
            Rep the club on and off the court. Our performance collection is
            designed for the kinetic energy of Charlottesville pickleball.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 flex min-h-[360px] items-center justify-center rounded-xl bg-[#f7f7f5] px-6 py-16 text-center">
          <div className="w-full max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e57200]">
              UVA Pickleball Merch
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1f2328] md:text-4xl">
              Official Gear: Available Soon
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600 md:text-base">
              We&apos;re currently updating our inventory. Check back soon for
              the latest UVA Pickleball collection.
            </p>

            {/* Email notify */}
            <form className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#e57200] focus:ring-1 focus:ring-[#e57200]"
              />

              <button
                type="submit"
                className="h-12 rounded-md bg-[#e57200] px-6 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c95f00]"
              >
                Notify Me
              </button>
            </form>

            <p className="mt-3 text-[11px] text-slate-500">
              Be the first to know when the shop goes live.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}