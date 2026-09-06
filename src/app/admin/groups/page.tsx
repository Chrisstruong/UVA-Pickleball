import { createClient } from "@/lib/supabase/server";
import GroupsClient from "@/components/admin/GroupClient";

export default async function GroupsPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      club_group,
      membership_status,
      tryout_result,
      email_verified
      `
    )
    .order("full_name");

  if (error) {
    console.error("Error loading members:", error);
  }

  return (
    <GroupsClient members={members ?? []} />
  );
}