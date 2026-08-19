import AnnouncementsSection from "@/components/home/AnnoucementsSection";

export default function AnnouncementsPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b bg-[#07192d] text-white">
        <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E57200]">
            UVA Pickleball
          </p>

          <h1 className="font-hero mt-3 text-6xl uppercase leading-[0.9] tracking-wide md:text-7xl">
            All Announcements
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 md:text-base">
            Latest club updates, tryout details, and upcoming opportunities.
          </p>
          
        </div>
      </section>

      {/* Announcements */}
      <AnnouncementsSection />
    </main>
  );
}