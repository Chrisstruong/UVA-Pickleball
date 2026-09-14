"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  cancelEventRegistration,
  registerForEvent,
} from "@/app/events/actions";
import type { RegistrationState } from "@/app/events/actions";

const initialRegistrationState: RegistrationState = {
  status: "idle",
  message: "",
};

type EventRegistrationButtonProps = {
  eventId: string;
  isSignedIn: boolean;
  currentRegistrationStatus: "registered" | "waitlisted" | "none";
  isFull: boolean;
  userGroup: string | null;
  requiredGroup: string | null;
  registrationOpen: boolean;
};

export default function EventRegistrationButton({
  eventId,
  isSignedIn,
  currentRegistrationStatus,
  isFull,
  userGroup,
  requiredGroup,
  registrationOpen,
}: EventRegistrationButtonProps) {
  const [state, formAction, isPending] = useActionState(
    registerForEvent,
    initialRegistrationState
  );
  const [cancellationState, cancellationAction, isCancelling] = useActionState(
    cancelEventRegistration,
    initialRegistrationState
  );

  const registeredAfterSubmit =
    state.status === "success" && state.registrationStatus === "registered";
  const waitlistedAfterSubmit =
    state.status === "success" && state.registrationStatus === "waitlisted";
  const cancellationSucceeded = cancellationState.status === "success";
  const currentlyRegistered =
    (currentRegistrationStatus === "registered" || registeredAfterSubmit) &&
    !cancellationSucceeded;
  const currentlyWaitlisted =
    (currentRegistrationStatus === "waitlisted" || waitlistedAfterSubmit) &&
    !cancellationSucceeded;
  const eventIsFull = cancellationSucceeded
    ? cancellationState.eventIsFull ?? isFull
    : isFull;

  if (currentlyRegistered || currentlyWaitlisted) {
    return (
      <form action={cancellationAction}>
        <input type="hidden" name="eventId" value={eventId} />
        <Button
          type="submit"
          variant="outline"
          disabled={isCancelling}
          className="w-full border-red-200 font-heading uppercase tracking-wide text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          {isCancelling
            ? "Cancelling..."
            : currentlyRegistered
              ? "Cancel Registration"
              : "Leave Waitlist"}
        </Button>

        {cancellationState.status === "error" && (
          <p
            className="mt-2 text-sm font-medium text-red-700"
            aria-live="polite"
          >
            {cancellationState.message}
          </p>
        )}
      </form>
    );
  }

  if (!registrationOpen) {
    return (
      <Button className="w-full" disabled>
        Registration Closed
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
        {isPending
          ? eventIsFull
            ? "Joining Waitlist..."
            : "Registering..."
          : eventIsFull
            ? "Join Waitlist"
            : "Register"}
      </Button>

      {cancellationSucceeded && (
        <p
          className="mt-2 text-sm font-medium text-emerald-700"
          aria-live="polite"
        >
          {cancellationState.message}
        </p>
      )}

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
