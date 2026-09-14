"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Users, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getEventAttendees } from "@/app/events/actions";

type ViewAttendeesButtonProps = {
  eventId: string;
  eventTitle: string;
  capacity: number;
  registrationCount: number;
  waitlistCount: number;
  canViewAttendees: boolean;
  triggerVariant?: "button" | "countBadge";
};

export default function ViewAttendeesButton({
  eventId,
  eventTitle,
  capacity,
  registrationCount,
  waitlistCount,
  canViewAttendees,
  triggerVariant = "button",
}: ViewAttendeesButtonProps) {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [waitlistedAttendees, setWaitlistedAttendees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loadRequest, setLoadRequest] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !canViewAttendees) {
      return;
    }

    let ignoreResult = false;

    const loadAttendees = async () => {
      setIsLoading(true);
      setLoadError("");

      const result = await getEventAttendees(eventId);

      if (ignoreResult) {
        return;
      }

      if (result.status === "error") {
        setLoadError(result.message);
      } else {
        setAttendees(result.attendees);
        setWaitlistedAttendees(result.waitlistedAttendees);
      }

      setIsLoading(false);
    };

    void loadAttendees();

    return () => {
      ignoreResult = true;
    };
  }, [
    canViewAttendees,
    eventId,
    isOpen,
    loadRequest,
    registrationCount,
    waitlistCount,
  ]);

  if (!canViewAttendees) {
    if (triggerVariant === "countBadge") {
      return (
        <Link
          href="/login"
          className="absolute right-3 top-3 inline-flex cursor-pointer items-center rounded bg-white px-2 py-1 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-orange-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:right-4 sm:top-4"
          aria-label={`Sign in to view attendees for ${eventTitle}`}
          title="Sign in to view attendees"
        >
          <Users className="mr-1 h-3 w-3" aria-hidden="true" />
          {registrationCount}/{capacity}
        </Link>
      );
    }

    return (
      <Button
        asChild
        variant="outline"
        className="w-full font-heading uppercase tracking-wide"
      >
        <Link href="/login">Sign In to View Attendees</Link>
      </Button>
    );
  }

  return (
    <>
      {triggerVariant === "countBadge" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-3 top-3 inline-flex cursor-pointer items-center rounded bg-white px-2 py-1 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-orange-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:right-4 sm:top-4"
          aria-haspopup="dialog"
          aria-label={`View attendees for ${eventTitle}`}
          title="View attendees"
        >
          <Users className="mr-1 h-3 w-3" aria-hidden="true" />
          {registrationCount}/{capacity}
        </button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full font-heading uppercase tracking-wide"
          aria-haspopup="dialog"
        >
          View Attendees
        </Button>
      )}

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-lg bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-orange-600">
                    {registrationCount}/{capacity} Signed Up
                  </p>
                  <h3
                    id={titleId}
                    className="mt-2 font-heading text-2xl font-bold tracking-tight"
                  >
                    {eventTitle}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close attendees list"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 min-h-0 space-y-6 overflow-y-auto pr-1">
                {isLoading ? (
                  <p className="rounded-md border border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                    Loading attendees...
                  </p>
                ) : loadError ? (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-5 text-center">
                    <p className="text-sm text-red-700">{loadError}</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLoadRequest((request) => request + 1)}
                      className="mt-3"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <section>
                      <h4 className="text-sm font-bold text-[#07192d]">
                        Registered ({attendees.length})
                      </h4>
                      <ul className="mt-2 rounded-md border border-slate-200">
                        {attendees.length > 0 ? (
                          attendees.map((attendee, index) => (
                            <li
                              key={`${attendee}-${index}`}
                              className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700 last:border-b-0"
                            >
                              {attendee}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-6 text-center text-sm text-slate-500">
                            No registered attendees yet.
                          </li>
                        )}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-sm font-bold text-[#07192d]">
                        Waitlist ({waitlistedAttendees.length})
                      </h4>
                      <ul className="mt-2 rounded-md border border-amber-200 bg-amber-50/40">
                        {waitlistedAttendees.length > 0 ? (
                          waitlistedAttendees.map((attendee, index) => (
                            <li
                              key={`${attendee}-${index}`}
                              className="flex gap-3 border-b border-amber-100 px-4 py-3 text-sm text-slate-700 last:border-b-0"
                            >
                              <span className="font-semibold text-amber-700">
                                {index + 1}.
                              </span>
                              <span>{attendee}</span>
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-6 text-center text-sm text-slate-500">
                            No one is currently waitlisted.
                          </li>
                        )}
                      </ul>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
