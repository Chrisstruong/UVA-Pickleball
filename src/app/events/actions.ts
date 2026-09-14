"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
  registrationStatus?: "registered" | "waitlisted";
  eventIsFull?: boolean;
};

export async function cancelEventRegistration(
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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      status: "error",
      message: "You must be signed in to cancel a registration.",
    };
  }

  const { data: registration, error: registrationError } =
    await supabaseAdmin
      .from("event_registrations")
      .select("id, status")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .maybeSingle();

  if (registrationError) {
    console.error("Registration lookup failed:", registrationError);
    return {
      status: "error",
      message: "Unable to find your registration. Please try again.",
    };
  }

  if (!registration) {
    return {
      status: "error",
      message: "You do not have a registration for this event.",
    };
  }

  if (
    registration.status !== "registered" &&
    registration.status !== "waitlisted"
  ) {
    return {
      status: "error",
      message: "This registration cannot be cancelled.",
    };
  }

  const { data: event, error: eventError } = await supabaseAdmin
    .from("events")
    .select("capacity")
    .eq("id", eventId)
    .single();

  if (eventError || !event) {
    console.error("Event capacity lookup failed:", eventError);
    return {
      status: "error",
      message: "Unable to find this event. Please try again.",
    };
  }

  const { data: deletedRegistration, error: deleteError } =
    await supabaseAdmin
      .from("event_registrations")
      .delete()
      .eq("id", registration.id)
      .eq("user_id", user.id)
      .select("id")
      .maybeSingle();

  if (deleteError || !deletedRegistration) {
    console.error("Registration cancellation failed:", deleteError);
    return {
      status: "error",
      message: "Unable to cancel your registration. Please try again.",
    };
  }

  const { count, error: countError } = await supabaseAdmin
    .from("event_registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("status", "registered");

  if (countError) {
    console.error("Registered attendee count failed:", countError);
    revalidatePath("/events");
    return {
      status: "error",
      message:
        "Your registration was cancelled, but the waitlist could not be updated.",
    };
  }

  let registeredCount = count ?? 0;

  if (
    registration.status === "registered" &&
    registeredCount < event.capacity
  ) {
    const { data: nextWaitlisted, error: waitlistError } =
      await supabaseAdmin
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("status", "waitlisted")
        .order("registered_at", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (waitlistError) {
      console.error("Waitlist lookup failed:", waitlistError);
      revalidatePath("/events");
      return {
        status: "error",
        message:
          "Your registration was cancelled, but the waitlist could not be updated.",
      };
    }

    if (nextWaitlisted) {
      const { data: promotedRegistration, error: promotionError } =
        await supabaseAdmin
          .from("event_registrations")
          .update({ status: "registered" })
          .eq("id", nextWaitlisted.id)
          .eq("status", "waitlisted")
          .select("id")
          .maybeSingle();

      if (promotionError) {
        console.error("Waitlist promotion failed:", promotionError);
        revalidatePath("/events");
        return {
          status: "error",
          message:
            "Your registration was cancelled, but the waitlist could not be updated.",
        };
      }

      if (promotedRegistration) {
        registeredCount += 1;
      }
    }
  }

  revalidatePath("/events");

  return {
    status: "success",
    message:
      registration.status === "registered"
        ? "Your registration was cancelled."
        : "You have left the waitlist.",
    eventIsFull: registeredCount >= event.capacity,
  };
}

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
