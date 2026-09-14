"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { registerForEvent } from "@/app/events/actions";
import type { RegistrationState } from "@/app/events/actions";

const initialRegistrationState: RegistrationState = {
  status: "idle",
  message: "",
};

type EventRegistrationButtonProps = {
  eventId: string;
  isSignedIn: boolean;
  isRegistered: boolean;
  isFull: boolean;
  userGroup: string | null;
  requiredGroup: string | null;
  registrationOpen: boolean;
};

export default function EventRegistrationButton({
  eventId,
  isSignedIn,
  isRegistered,
  isFull,
  userGroup,
  requiredGroup,
  registrationOpen,
}: EventRegistrationButtonProps) {
  const [state, formAction, isPending] = useActionState(
    registerForEvent,
    initialRegistrationState
  );

  if (isRegistered || state.status === "success") {
    return (
      <div>
        <Button className="w-full" disabled>
          Registered
        </Button>
        <p
          className="mt-2 text-sm font-medium text-emerald-700"
          aria-live="polite"
        >
          {state.message || "You are registered for this event."}
        </p>
      </div>
    );
  }

  if (!registrationOpen) {
    return (
      <Button className="w-full" disabled>
        Registration Closed
      </Button>
    );
  }

  if (isFull) {
    return (
      <Button className="w-full" disabled>
        Event Full
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <Button
        asChild
        className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
      >
        <Link href="/login">Sign In to Register</Link>
      </Button>
    );
  }

  if (requiredGroup && userGroup !== requiredGroup) {
    return (
      <Button className="w-full" disabled>
        {requiredGroup} Members Only
      </Button>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="eventId" value={eventId} />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
      >
        {isPending ? "Registering..." : "Register"}
      </Button>

      {state.status === "error" && (
        <p
          className="mt-2 text-sm font-medium text-red-700"
          aria-live="polite"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
