import { ArrowLeft } from "lucide-react";
import { Brand } from "./Brand";

export function ScreenHeader({ label, onBack }: { label?: string; onBack?: () => void }) {
  return (
    <header className="screen-header">
      {onBack ? <button className="round-button" onClick={onBack} aria-label="Retour"><ArrowLeft /></button> : <Brand compact />}
      {label && <span className="header-label"><i />{label}</span>}
      {onBack && <Brand compact />}
    </header>
  );
}
