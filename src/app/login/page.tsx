import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="mx-auto flex min-h-[60vh] max-w-[900px] items-center px-6 py-20 md:px-10">
        <div className="relative w-full rounded-xl border border-slate-200 bg-[#f7f7f5] px-8 py-12 text-center shadow-sm md:px-12">
          <Image
            src="/images/logo.svg"
            alt="UVA Pickleball Club logo"
            width={170}
            height={85}
            priority
            className="absolute right-8 top-8 hidden h-30 w-auto object-contain sm:block"
          />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E57200]">
              Account Access
            </p>
          </div>

          <h1 className="font-bebas mt-4 text-5xl uppercase leading-none tracking-wide text-[#07192d] md:text-6xl">
            Coming Soon
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-700 md:text-lg">
            You can create your account after your tryout to view your results. Good luck!
          </p>
        </div>
      </section>
    </main>
  );
}
