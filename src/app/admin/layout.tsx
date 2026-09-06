import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (
    profile?.role !== "officer" &&
    profile?.role !== "admin"
  ) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#fbf7f4]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 bg-[#07192d] px-6 py-8 text-white lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E57200]">
            UVA Pickleball
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Officer Portal
          </h2>

          <nav className="mt-10 space-y-2">
            <Link
              href="/admin"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-white/10"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/groups"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-white/10"
            >
              Groups
            </Link>

            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/10"
            >
              Back to Website
            </Link>
          </nav>
        </aside>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}