import { Droplets } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="AQUAPROX">
      <span className="brand-mark"><Droplets size={compact ? 18 : 24} strokeWidth={1.8} /></span>
      <span className="brand-name">AQUA<span>PROX</span></span>
      {!compact && <span className="brand-rule" />}
      {!compact && <span className="brand-tagline">Traitement de l’eau</span>}
    </div>
  );
}
