"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function registerForEvent(formData: FormData) {
  const eventId = formData.get("eventId");

  if (typeof eventId !== "string") {
    throw new Error("Invalid event ID.");
  }

  const supabase = await createClient();

  // 1. Get signed-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to register.");
  }

  // 2. Get user's club group
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("club_group")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Unable to find your member profile.");
  }

  // 3. Get event requirements
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select(`
      id,
      required_group,
      registration_open
    `)
    .eq("id", eventId)
    .single();

  if (eventError || !event) {
    throw new Error("Event not found.");
  }

  // 4. Registration must be open
  if (!event.registration_open) {
    throw new Error("Registration for this event is closed.");
  }

  // 5. Check group eligibility
  if (
    event.required_group &&
    profile.club_group !== event.required_group
  ) {
    throw new Error(
      `This event is only available to ${event.required_group} members.`
    );
  }

  // 6. Prevent duplicate registration
  const { data: existingRegistration } = await supabase
    .from("event_registrations")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingRegistration) {
    throw new Error("You are already registered for this event.");
  }

  // 7. Register
  const { error: registrationError } = await supabase
    .from("event_registrations")
    .insert({
      event_id: eventId,
      user_id: user.id,
      status: "registered",
    });

  if (registrationError) {
    console.error("Registration error:", registrationError);
    throw new Error("Unable to register for this event.");
  }

  revalidatePath("/events");
}