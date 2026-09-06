import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import GroupsClient from "@/components/admin/GroupsClient";

export default async function GroupsPage() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabaseAdmin
    .from("profiles")
    .select(
      "id, full_name, club_group, membership_status, tryout_result, email_verified"
    )
    .order("full_name");

  if (error) {
    console.error("Error loading profiles:", error);
  }

  const {
    data: { users },
    error: usersError,
  } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (usersError) {
    console.error("Error loading auth users:", usersError);
  }

  const emailById = new Map(
    users.map((user) => [user.id, user.email ?? ""])
  );

  const members =
    profiles?.map((profile) => ({
      ...profile,
      email: emailById.get(profile.id) ?? "",
    })) ?? [];

  return <GroupsClient members={members} />;
}