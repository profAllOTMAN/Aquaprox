"use client";

import { useEffect, useState } from "react";

export type DisplayProfile = "tablet" | "tv" | "wall";
export type ExperienceMode = "demo" | "kiosk";
export type InteractionMode = "touch" | "staff" | "passive";

export type RuntimeProfile = {
  display: DisplayProfile;
  mode: ExperienceMode;
  interaction: InteractionMode;
  idleMs: number;
};

function detectDisplay(params: URLSearchParams): DisplayProfile {
  const forced = params.get("display");
  if (forced === "tablet" || forced === "tv" || forced === "wall") return forced;
  if (window.innerWidth >= 2200) return "wall";
  if (window.innerWidth <= 1180 || window.innerHeight > window.innerWidth) return "tablet";
  return "tv";
}

function detectRuntime(): RuntimeProfile {
  const params = new URLSearchParams(window.location.search);
  const requestedMode = params.get("mode");
  const requestedInteraction = params.get("interaction");
  const idleSeconds = Number(params.get("idle"));

  return {
    display: detectDisplay(params),
    mode: requestedMode === "kiosk" ? "kiosk" : "demo",
    interaction: requestedInteraction === "staff" || requestedInteraction === "passive" ? requestedInteraction : "touch",
    idleMs: Number.isFinite(idleSeconds) && idleSeconds >= 15 && idleSeconds <= 600 ? idleSeconds * 1000 : 45_000,
  };
}

export function useRuntimeProfile() {
  const [profile, setProfile] = useState<RuntimeProfile>({ display: "tv", mode: "demo", interaction: "touch", idleMs: 45_000 });

  useEffect(() => {
    const update = () => setProfile(detectRuntime());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return profile;
}

export function useDisplayProfile() {
  return useRuntimeProfile().display;
}
