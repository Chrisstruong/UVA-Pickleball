import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/");
  }

  const allowed =
    profile.role === "officer" ||
    profile.role === "admin";

  if (!allowed) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#fbf7f4] px-6 py-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E57200]">
          Officer Portal
        </p>

        <h1 className="font-bebas mt-3 text-5xl uppercase text-[#07192d] md:text-6xl">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-slate-600">
          Welcome, {profile.full_name || "Officer"}.
        </p>
      </div>
    </main>
  );
}