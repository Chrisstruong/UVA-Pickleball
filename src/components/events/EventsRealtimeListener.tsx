"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const REFRESH_DEBOUNCE_MS = 300;

export default function EventsRealtimeListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let refreshTimeout: ReturnType<typeof setTimeout> | undefined;

    const scheduleRefresh = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        router.refresh();
      }, REFRESH_DEBOUNCE_MS);
    };

    const channel = supabase
      .channel("event-registrations-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "event_registrations",
        },
        scheduleRefresh
      )
      .subscribe();

    return () => {
      clearTimeout(refreshTimeout);
      void supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
