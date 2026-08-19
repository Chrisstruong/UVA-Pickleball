"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewAttendeesButtonProps = {
  eventTitle: string;
  attendees: string[];
  capacity: number;
};

export default function ViewAttendeesButton({
  eventTitle,
  attendees,
  capacity,
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
                    {attendees.length}/{capacity} Signed Up
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
                {attendees.map((attendee) => (
                  <li
                    key={attendee}
                    className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700 last:border-b-0"
                  >
                    {attendee}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
