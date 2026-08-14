"use client";

import { useCallback, useEffect, useRef } from "react";

export function useIdleReset(onReset: () => void, delay = 45_000, enabled = true) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callback = useRef(onReset);

  useEffect(() => { callback.current = onReset; }, [onReset]);

  const restart = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    if (enabled) timer.current = setTimeout(() => callback.current(), delay);
  }, [delay, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const events = ["pointerdown", "pointermove", "keydown", "touchstart"] as const;
    events.forEach((event) => window.addEventListener(event, restart, { passive: true }));
    restart();
    return () => {
      events.forEach((event) => window.removeEventListener(event, restart));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enabled, restart]);
}
