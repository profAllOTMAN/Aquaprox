"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { ArrowRight, X } from "lucide-react";
import { contactUrl, LEAD_ZONES, type LeadZone } from "@/lib/lead-contact";
import "./lead-contact.css";

function ContactQr({ zone, onClose }: { zone: LeadZone; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [qr, setQr] = useState("");
  const [error, setError] = useState(false);
  const url = contactUrl(zone);

  useEffect(() => {
    dialog.current?.showModal();
    let cancelled = false;
    QRCode.toDataURL(url, { width: 320, margin: 4, errorCorrectionLevel: "M", color: { dark: "#071b2e", light: "#ffffff" } })
      .then((data) => { if (!cancelled) setQr(data); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [url]);

  return createPortal(
    <dialog ref={dialog} className="lead-qr-dialog" aria-labelledby="lead-qr-title" onCancel={onClose} onKeyDown={(event) => event.stopPropagation()}>
      <button className="lead-qr-close" type="button" onClick={onClose} aria-label="Fermer le QR code"><X size={22} /></button>
      <p className="lead-kicker">AQUAPROX · {LEAD_ZONES[zone]}</p>
      <h2 id="lead-qr-title">Vous avez un projet ? Parlons-en</h2>
      <p>Scannez ce QR code pour être recontacté par notre équipe.</p>
      <div className="lead-qr-image" aria-live="polite">
        {qr ? <img src={qr} width={320} height={320} alt={`QR code vers le formulaire AQUAPROX — ${LEAD_ZONES[zone]}`} /> : <p>{error ? "Utilisez le lien ci-dessous pour ouvrir le formulaire." : "Préparation du QR code…"}</p>}
      </div>
      <a className="lead-form-link" href={url} target="_blank" rel="noopener noreferrer">Ouvrir le formulaire sur cet appareil <ArrowRight size={16} /></a>
      <button className="lead-secondary" type="button" onClick={onClose}>Continuer l&apos;exploration</button>
    </dialog>, document.body,
  );
}

export function LeadCapture({ zone, onContinue }: { zone: LeadZone; onContinue: () => void }) {
  const [open, setOpen] = useState(false);
  return <div className="lead-choice">
    <button className="boiler-primary" type="button" onClick={onContinue}>Continuer l&apos;exploration<ArrowRight size={20} /></button>
    <button className="lead-project-button" type="button" onClick={() => setOpen(true)}>Vous avez un projet ? Parlons-en<ArrowRight size={18} /></button>
    {open && <ContactQr zone={zone} onClose={() => setOpen(false)} />}
  </div>;
}

export function ZoneLeadPrompt({ zone }: { zone: LeadZone }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return <aside className="lead-zone-prompt" aria-label="Poursuivre votre visite">
    <LeadCapture zone={zone} onContinue={() => setDismissed(true)} />
  </aside>;
}
