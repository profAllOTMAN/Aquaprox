export type AnalyticsEvent =
  | "experience_started"
  | "building_selected"
  | "risk_opened"
  | "solution_viewed"
  | "score_viewed"
  | "qr_clicked"
  | "contact_started"
  | "contact_submitted"
  | "experience_reset";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  const payload = JSON.stringify({ event, data: data ?? {}, timestamp: new Date().toISOString() });
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

  if (process.env.NODE_ENV === "development") console.info("[AQUAPROX]", event, data ?? {});
  if (!endpoint || typeof window === "undefined") return;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
    return;
  }

  fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => undefined);
}
