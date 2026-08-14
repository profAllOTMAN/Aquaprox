"use client";

import { useEffect } from "react";
import type { ExperienceMode } from "@/hooks/useDisplayProfile";

export function useKioskRuntime(mode: ExperienceMode) {
  useEffect(() => {
    if (mode !== "kiosk") return;

    document.documentElement.dataset.kiosk = "true";
    const prevent = (event: Event) => event.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);

    return () => {
      delete document.documentElement.dataset.kiosk;
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
    };
  }, [mode]);
}

export function useOfflineRuntime(enabled: boolean) {
  useEffect(() => {
    if (!enabled || process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, [enabled]);
}
