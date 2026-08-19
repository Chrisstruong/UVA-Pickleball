"use client";

import { Button } from "@/components/ui/button";

export default function ScrollToUpcomingEventsButton() {
  function handleClick() {
    document
      .getElementById("upcoming-events")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="h-10 rounded-md bg-orange-600 px-6 font-heading text-[11px] uppercase tracking-wide text-white hover:bg-orange-700 md:h-11 md:px-7"
    >
      Register Now
    </Button>
  );
}
