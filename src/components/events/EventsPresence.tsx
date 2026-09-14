"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type EventsPresenceProps = {
  userId: string | null;
  fullName: string | null;
  avatarUrl: string | null;
};

type ViewerPresence = {
  userId: string | null;
  fullName: string;
  avatarUrl: string | null;
  sessionId: string;
  onlineAt: string;
  [key: string]: unknown;
};

const MAX_VISIBLE_VIEWERS = 4;
const avatarRingColors = [
  "bg-emerald-400",
  "bg-orange-400",
  "bg-amber-300",
  "bg-teal-400",
];

function getInitials(fullName: string) {
  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return initials || "H";
}

function getSafeAvatarUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function normalizePresence(value: ViewerPresence): ViewerPresence | null {
  if (typeof value.sessionId !== "string") {
    return null;
  }

  const fullName =
    typeof value.fullName === "string" && value.fullName.trim()
      ? value.fullName.trim().slice(0, 80)
      : "Guest Hoo";

  return {
    userId: typeof value.userId === "string" ? value.userId : null,
    fullName,
    avatarUrl: getSafeAvatarUrl(value.avatarUrl),
    sessionId: value.sessionId,
    onlineAt:
      typeof value.onlineAt === "string" ? value.onlineAt : "",
  };
}

function OnlineAvatar({
  viewer,
  index,
}: {
  viewer: ViewerPresence;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = viewer.avatarUrl && !imageFailed;

  return (
    <div
      className={`animate-in fade-in zoom-in-75 rounded-full p-0.5 shadow-lg transition-transform duration-200 fill-mode-both hover:z-10 hover:-translate-y-1 hover:scale-105 motion-reduce:animate-none motion-reduce:transition-none ${avatarRingColors[index % avatarRingColors.length]}`}
      style={{ animationDelay: `${index * 70}ms` }}
      title={viewer.fullName}
    >
      <div className="rounded-full bg-white p-0.5">
        <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-slate-700 text-[10px] font-black tracking-wide text-white sm:size-10 sm:text-xs">
          {showImage ? (
            // Profile photos can be hosted outside the app's configured image domains.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={viewer.avatarUrl ?? undefined}
              alt={viewer.fullName}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span aria-label={viewer.fullName}>
              {getInitials(viewer.fullName)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsPresence({
  userId,
  fullName,
  avatarUrl,
}: EventsPresenceProps) {
  const [viewers, setViewers] = useState<ViewerPresence[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const viewersButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const sessionId = crypto.randomUUID();
    let isActive = true;

    const channel = supabase.channel("events-presence", {
      config: {
        presence: {
          key: sessionId,
        },
      },
    });

    const syncViewers = () => {
      const presences = Object.values(
        channel.presenceState<ViewerPresence>()
      ).flat();
      const uniqueViewers = new Map<string, ViewerPresence>();

      presences.forEach((presence) => {
        const viewer = normalizePresence(presence);

        if (!viewer) {
          return;
        }

        const viewerKey = viewer.userId
          ? `user:${viewer.userId}`
          : `session:${viewer.sessionId}`;

        if (!uniqueViewers.has(viewerKey)) {
          uniqueViewers.set(viewerKey, viewer);
        }
      });

      setViewers(
        [...uniqueViewers.values()].sort((first, second) =>
          first.onlineAt.localeCompare(second.onlineAt)
        )
      );
    };

    channel
      .on("presence", { event: "sync" }, syncViewers)
      .on("presence", { event: "join" }, syncViewers)
      .on("presence", { event: "leave" }, syncViewers)
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED" || !isActive) {
          return;
        }

        await channel.track({
          userId,
          fullName: fullName?.trim() || "Guest Hoo",
          avatarUrl: getSafeAvatarUrl(avatarUrl),
          sessionId,
          onlineAt: new Date().toISOString(),
        } satisfies ViewerPresence);
      });

    return () => {
      isActive = false;
      void channel.untrack();
      void supabase.removeChannel(channel);
    };
  }, [avatarUrl, fullName, userId]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const viewersButton = viewersButtonRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      viewersButton?.focus();
    };
  }, [isExpanded]);

  const visibleViewers = viewers.slice(0, MAX_VISIBLE_VIEWERS);
  const overflowCount = Math.max(
    viewers.length - MAX_VISIBLE_VIEWERS,
    0
  );
  const viewerLabel = viewers.length === 1 ? "Hoo" : "Hoos";
  const sortedViewers = [...viewers].sort((first, second) => {
    const firstIsCurrentUser = Boolean(
      userId && first.userId === userId
    );
    const secondIsCurrentUser = Boolean(
      userId && second.userId === userId
    );

    if (firstIsCurrentUser !== secondIsCurrentUser) {
      return firstIsCurrentUser ? -1 : 1;
    }

    return first.fullName.localeCompare(second.fullName);
  });

  return (
    <>
      <div
        className="animate-in fade-in slide-in-from-bottom-2 mb-7 overflow-hidden rounded-3xl border border-teal-400/70 bg-gradient-to-r from-[#06182d] via-[#08233c] to-[#063747] p-4 text-white shadow-[0_18px_45px_-22px_rgba(6,78,89,0.9)] duration-500 motion-reduce:animate-none sm:mb-8 sm:p-5"
        aria-live="polite"
        aria-label={`${viewers.length} ${viewerLabel} online`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="relative flex size-11 shrink-0 items-center justify-center sm:size-14">
            <span className="absolute size-10 animate-ping rounded-full bg-emerald-400/25 motion-reduce:animate-none sm:size-12" />
            <span className="absolute size-7 rounded-full bg-emerald-400/15 sm:size-9" />
            <span className="relative size-4 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.95)] sm:size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="flex items-baseline gap-1.5 font-heading font-bold leading-none">
              <span
                key={viewers.length}
                className="animate-in fade-in zoom-in-90 text-2xl tabular-nums duration-300 motion-reduce:animate-none sm:text-3xl"
              >
                {viewers.length}
              </span>
              <span className="text-lg sm:text-xl">{viewerLabel}</span>
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300 sm:text-sm">
              Online
            </p>
          </div>

          {visibleViewers.length > 0 && (
            <button
              ref={viewersButtonRef}
              type="button"
              onClick={() => setIsExpanded(true)}
              aria-haspopup="dialog"
              aria-controls="events-online-viewers"
              aria-label={`View all ${viewers.length} online ${viewerLabel}`}
              className="flex shrink-0 -space-x-3 cursor-pointer rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 motion-reduce:transition-none sm:-space-x-3.5"
            >
              {visibleViewers.map((viewer, index) => (
                <OnlineAvatar
                  key={viewer.userId ?? viewer.sessionId}
                  viewer={viewer}
                  index={index}
                />
              ))}

              {overflowCount > 0 && (
                <div
                  key={overflowCount}
                  className="animate-in fade-in zoom-in-75 z-10 rounded-full bg-cyan-400 p-0.5 shadow-lg duration-300 motion-reduce:animate-none"
                >
                  <div className="rounded-full bg-white p-0.5">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#102a43] text-[10px] font-black text-white sm:size-10 sm:text-xs">
                      +{overflowCount}
                    </div>
                  </div>
                </div>
              )}
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close online Hoos list"
            onClick={() => setIsExpanded(false)}
            className="animate-in fade-in absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] duration-200 motion-reduce:animate-none"
          />

          <section
            id="events-online-viewers"
            role="dialog"
            aria-modal="true"
            aria-labelledby="events-online-viewers-title"
            className="animate-in fade-in zoom-in-95 relative flex max-h-[82dvh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-teal-400/40 bg-[#07192d] text-white shadow-2xl duration-200 motion-reduce:animate-none"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  Live
                </p>
                <h2
                  id="events-online-viewers-title"
                  className="mt-1 font-heading text-2xl font-bold sm:text-3xl"
                >
                  {viewers.length} {viewerLabel} Online
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label="Close online Hoos list"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 motion-reduce:transition-none"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>

            <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-4 sm:grid sm:grid-cols-2 sm:content-start sm:gap-2 sm:space-y-0 sm:px-6">
              {sortedViewers.map((viewer, index) => (
                <li
                  key={viewer.userId ?? viewer.sessionId}
                  className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/7 px-3 py-2.5"
                >
                  <OnlineAvatar
                    viewer={viewer}
                    index={index % avatarRingColors.length}
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white/90">
                    {viewer.fullName}
                  </span>
                  {viewer.userId === userId && userId && (
                    <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">
                      You
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
