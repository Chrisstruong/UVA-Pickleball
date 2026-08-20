"use client";

import { ArrowRight } from "lucide-react";

export default function ScrollToSectionButton({
  targetId,
  children,
  className,
}: {
  targetId: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      className={className}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
