"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ViewAttendeesButtonProps = {
  eventTitle: string;
  attendees: string[];
  capacity: number;
  registrationCount?: number;
  canViewAttendees: boolean;
};

export default function ViewAttendeesButton({
  eventTitle,
  attendees,
  capacity,
  registrationCount = attendees.length,
  canViewAttendees,
}: ViewAttendeesButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

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


  if (!canViewAttendees) {
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
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full font-heading uppercase tracking-wide"
      >
        View Attendees
      </Button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${eventTitle}-attendees-title`}
          >
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-lg bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-orange-600">
                    {registrationCount}/{capacity} Signed Up
                  </p>
                  <h3
                    id={`${eventTitle}-attendees-title`}
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

              <ul className="mt-6 min-h-0 overflow-y-auto rounded-md border border-slate-200">
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
                    Attendee names are not available yet.
                  </li>
                )}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
