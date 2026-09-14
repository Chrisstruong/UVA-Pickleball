"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
  registrationStatus?: "registered" | "waitlisted";
};

export async function registerForEvent(
  _previousState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const eventId = formData.get("eventId");

  if (!eventId || typeof eventId !== "string") {
    return {
      status: "error",
      message: "This event could not be identified. Please refresh and try again.",
    };
  }

  const supabase = await createClient();

  // 1. Get signed-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      status: "error",
      message: "You must be signed in to register.",
    };
  }

  // 2. Get profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("club_group")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      status: "error",
      message: "Unable to find your member profile.",
    };
  }

  // 3. Get event
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select(`
      id,
      capacity,
      required_group,
      registration_open
    `)
    .eq("id", eventId)
    .single();

  if (eventError || !event) {
    return {
      status: "error",
      message: "This event is no longer available.",
    };
  }

  if (!event.registration_open) {
    return {
      status: "error",
      message: "Registration for this event is closed.",
    };
  }

  // 4. Check eligibility
  if (
    event.required_group &&
    profile.club_group !== event.required_group
  ) {
    return {
      status: "error",
      message: `This event is only available to ${event.required_group} members.`,
    };
  }

  // 5. Check existing registration
  const {
    data: existingRegistration,
    error: existingError,
  } = await supabaseAdmin
    .from("event_registrations")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    return {
      status: "error",
      message: "Unable to check your registration. Please try again.",
    };
  }

  if (existingRegistration) {
    return {
      status: "error",
      message: "You are already registered for this event.",
    };
  }

  const { count, error: countError } = await supabaseAdmin
    .from("event_registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("status", "registered");

  if (countError) {
    return {
      status: "error",
      message: "Unable to check event availability. Please try again.",
    };
  }

  const registrationStatus =
    (count ?? 0) < event.capacity ? "registered" : "waitlisted";

  // 6. Insert registration
  const { error: registrationError } = await supabaseAdmin
    .from("event_registrations")
    .insert({
      event_id: eventId,
      user_id: user.id,
      status: registrationStatus,
    });

  if (registrationError) {
    console.error("Event registration insert failed:", {
      code: registrationError.code,
      message: registrationError.message,
    });

    return {
      status: "error",
      message:
        registrationError.code === "23505"
          ? "You are already registered for this event."
          : "Registration failed. Please try again.",
    };
  }

  revalidatePath("/events");

  return {
    status: "success",
    message:
      registrationStatus === "registered"
        ? "You are registered for this event."
        : "You have joined the waitlist.",
    registrationStatus,
  };
}
