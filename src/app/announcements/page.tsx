import AnnouncementsSection from "@/components/home/AnnoucementsSection";

export default function AnnouncementsPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b bg-[#07192d] text-white">
        <div className="mx-auto max-w-[1450px] px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E57200] sm:text-[11px] sm:tracking-[0.24em]">
            UVA Pickleball
          </p>

          <h1 className="font-hero mt-3 text-4xl uppercase leading-[0.92] tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
            All Announcements
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:mt-5 md:text-base">
            Latest club updates, tryout details, and upcoming opportunities.
          </p>
        </div>
      </section>

      {/* Announcements */}
      <AnnouncementsSection />
    </main>
  );
}