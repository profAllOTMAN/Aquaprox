"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AttractScreen } from "./AttractScreen";
import { BuildingSelection } from "./BuildingSelection";
import { ExplorationScreen } from "./ExplorationScreen";
import { ScoreScreen } from "./ScoreScreen";
import { ConversionScreen } from "./ConversionScreen";
import { useIdleReset } from "@/hooks/useIdleReset";
import { useRuntimeProfile } from "@/hooks/useDisplayProfile";
import { trackEvent } from "@/lib/analytics";
import { risks } from "@/data/risks";
import { useKioskRuntime, useOfflineRuntime } from "@/hooks/useKioskRuntime";
import type { ExperienceStep, RiskHotspot, RiskId } from "@/types/experience";

export function WaterExperience() {
  const runtime = useRuntimeProfile();
  const [step, setStep] = useState<ExperienceStep>("attract");
  const [activeRisk, setActiveRisk] = useState<RiskHotspot | null>(null);
  const [revealed, setRevealed] = useState<Set<RiskId>>(new Set());
  const [solved, setSolved] = useState<Set<RiskId>>(new Set());

  const reset = useCallback(() => { setStep("attract"); setActiveRisk(null); setRevealed(new Set()); setSolved(new Set()); trackEvent("experience_reset"); }, []);
  useIdleReset(reset, runtime.idleMs, step !== "attract" && runtime.interaction !== "passive");
  useKioskRuntime(runtime.mode);
  useOfflineRuntime(runtime.mode === "kiosk");

  useEffect(() => {
    if (runtime.interaction !== "passive") return;
    let phase = 0;
    const applyPhase = () => {
      const featuredRisk = risks[0];
      if (phase === 0) { setStep("attract"); setActiveRisk(null); setRevealed(new Set()); setSolved(new Set()); }
      if (phase === 1) { setStep("building-selection"); setActiveRisk(null); }
      if (phase === 2) { setStep("exploration"); setActiveRisk(null); }
      if (phase === 3) { setStep("exploration"); setActiveRisk(featuredRisk); setRevealed(new Set([featuredRisk.id])); }
      if (phase === 4) { setStep("exploration"); setActiveRisk(featuredRisk); setSolved(new Set([featuredRisk.id])); }
      if (phase === 5) { setStep("score"); setActiveRisk(null); setRevealed(new Set(risks.map((risk) => risk.id))); }
      if (phase === 6) { setStep("conversion"); setActiveRisk(null); }
      phase = (phase + 1) % 7;
    };
    applyPhase();
    const timer = window.setInterval(applyPhase, 8_000);
    return () => window.clearInterval(timer);
  }, [runtime.interaction]);

  useEffect(() => {
    if (runtime.interaction !== "staff") return;
    const sequence: ExperienceStep[] = ["attract", "building-selection", "exploration", "score", "conversion"];
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const direct = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4 }[event.code];
      let nextIndex = typeof direct === "number" ? direct : sequence.indexOf(step);
      if (event.code === "ArrowRight" || event.code === "PageDown" || event.code === "Space") nextIndex = Math.min(sequence.length - 1, nextIndex + 1);
      else if (event.code === "ArrowLeft" || event.code === "PageUp") nextIndex = Math.max(0, nextIndex - 1);
      else if (event.code === "KeyR" || event.code === "Home") nextIndex = 0;
      else if (typeof direct !== "number") return;

      event.preventDefault();
      const nextStep = sequence[nextIndex];
      setStep(nextStep);
      setActiveRisk(null);
      if (nextStep === "score" || nextStep === "conversion") setRevealed(new Set(risks.map((risk) => risk.id)));
      if (nextStep === "attract") { setRevealed(new Set()); setSolved(new Set()); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runtime.interaction, step]);

  const openRisk = (risk: RiskHotspot) => { setActiveRisk(risk); setRevealed((current) => new Set(current).add(risk.id)); trackEvent("risk_opened", { risk: risk.id }); };
  const solveRisk = (risk: RiskHotspot) => { setSolved((current) => new Set(current).add(risk.id)); trackEvent("solution_viewed", { risk: risk.id }); };

  return (
    <div className="experience-shell" data-display={runtime.display} data-mode={runtime.mode} data-interaction={runtime.interaction}>
      <div className="noise"/>
      <AnimatePresence mode="wait">
        {step === "attract" && (
          <AttractScreen key="attract" passive={runtime.interaction === "passive"} onStart={() => { setStep("building-selection"); trackEvent("experience_started"); }}/>
        )}
        {step === "building-selection" && (
          <BuildingSelection key="selection" onBack={reset} onSelect={() => { setStep("exploration"); trackEvent("building_selected", { building: "habitat" }); }}/>
        )}
        {step === "exploration" && (
          <ExplorationScreen key="exploration" activeRisk={activeRisk} revealed={revealed} solved={solved} onRisk={openRisk} onSolve={solveRisk} onClose={() => setActiveRisk(null)} onScore={() => { setActiveRisk(null); setStep("score"); trackEvent("score_viewed"); }} onBack={() => setStep("building-selection")}/>
        )}
        {step === "score" && (
          <ScoreScreen key="score" revealed={revealed} onBack={() => setStep("exploration")} onContinue={() => setStep("conversion")}/>
        )}
        {step === "conversion" && (
          <ConversionScreen key="conversion" onBack={() => setStep("score")} onRestart={reset} onTrack={(type) => trackEvent(type === "qr" ? "qr_clicked" : type === "submitted" ? "contact_submitted" : "contact_started")}/>
        )}
      </AnimatePresence>
    </div>
  );
}
