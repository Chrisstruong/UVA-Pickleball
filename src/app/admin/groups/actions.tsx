"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ClubGroup =
  | "Tournament"
  | "Social"
  | "General"
  | null;

export async function updateMemberGroup(
  memberId: string,
  group: ClubGroup
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: officerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (
    officerProfile?.role !== "officer" &&
    officerProfile?.role !== "admin"
  ) {
    throw new Error("Forbidden");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      club_group: group,
    })
    .eq("id", memberId);

  if (error) {
    console.error("Error updating member group:", error);
    throw new Error("Unable to update member group");
  }

  revalidatePath("/admin/groups");
}