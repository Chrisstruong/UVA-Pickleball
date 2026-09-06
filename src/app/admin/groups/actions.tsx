"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type ClubGroup =
  | "Tournament"
  | "Social"
  | "General"
  | null;

export async function updateMemberGroup(
  memberId: string,
  group: ClubGroup
) {
  // 1. Normal authenticated client
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  // 2. Confirm current user is officer/admin
  const { data: officerProfile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (profileError) {
    console.error(
      "Unable to verify officer:",
      profileError
    );

    throw new Error(
      "Unable to verify officer permissions."
    );
  }

  if (
    officerProfile?.role !== "officer" &&
    officerProfile?.role !== "admin"
  ) {
    throw new Error("Forbidden");
  }

  // 3. Perform privileged update server-side
  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({
      club_group: group,
    })
    .eq("id", memberId);

  if (updateError) {
    console.error(
      "Error updating member group:",
      updateError
    );

    throw new Error(
      "Unable to update member group."
    );
  }

  // 4. Refresh page data
  revalidatePath("/admin/groups");

  return {
    success: true,
  };
}