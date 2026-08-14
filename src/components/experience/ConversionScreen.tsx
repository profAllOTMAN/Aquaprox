"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail, QrCode, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Brand } from "@/components/ui/Brand";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

type TrackingType = "qr" | "contact" | "submitted";

export function ConversionScreen({ onBack, onRestart, onTrack }: { onBack: () => void; onRestart: () => void; onTrack: (type: TrackingType) => void }) {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [qr, setQr] = useState("");
  const contactMode = process.env.NEXT_PUBLIC_CONTACT_MODE === "live" ? "live" : "demo";
  const qrUrl = process.env.NEXT_PUBLIC_QR_URL || "https://aquaprox.com/";

  useEffect(() => {
    QRCode.toDataURL(qrUrl, { width: 260, margin: 1, color: { dark: "#06263a", light: "#ffffff" } }).then(setQr).catch(() => setQr(""));
  }, [qrUrl]);

  const openForm = () => { setFormOpen(true); setError(""); onTrack("contact"); };
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = { prenom: form.get("prenom"), societe: form.get("societe"), contact: form.get("contact"), website: form.get("website") };

    if (contactMode === "demo") {
      setSubmitted(true);
      setSubmitting(false);
      onTrack("submitted");
      return;
    }

    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null);
    setSubmitting(false);
    if (!response?.ok) {
      setError("La transmission est momentanément indisponible. Scannez le QR code ou adressez-vous à un expert sur le stand.");
      return;
    }
    setSubmitted(true);
    onTrack("submitted");
  };

  return <motion.section className="screen conversion-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="conversion-top"><button className="round-button" onClick={onBack} aria-label="Retour"><ArrowLeft/></button><Brand compact/></div>
    <div className="conversion-copy"><p className="eyebrow">Passez de l’invisible au maîtrisé</p><h1>Votre réseau mérite<br/>une attention <em>sur mesure.</em></h1><p>Échangez avec nos experts pour mieux comprendre les risques spécifiques à votre bâtiment.</p><PrimaryButton onClick={openForm}>Parler à un expert</PrimaryButton><button className="text-link" onClick={openForm}>Ou demander à être recontacté</button></div>
    <button type="button" className="conversion-card" onClick={() => onTrack("qr")}><div className="qr-wrap">{qr ? <img src={qr} alt="QR code vers AQUAPROX"/> : <QrCode/>}<i/></div><span>Continuer sur mon téléphone</span><h2>Emportez l’expérience<br/>avec vous.</h2><p>Scannez ce QR code pour retrouver AQUAPROX et ses expertises.</p></button>
    <div className="conversion-stats"><div><strong>1989</strong><span>AQUAPROX<br/>depuis</span></div><i/><div><strong>4</strong><span>maillons intégrés<br/>de la chaîne de valeur</span></div><i/><div><strong>1</strong><span>partenaire pour<br/>votre réseau</span></div></div>
    <button className="restart-link" onClick={onRestart}>Recommencer l’expérience</button>
    <AnimatePresence>{formOpen && <motion.div className="form-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ y: 50, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }}><button className="panel-close" onClick={() => setFormOpen(false)} aria-label="Fermer"><X/></button>{submitted ? <div className="form-success"><CheckCircle2/><p className="eyebrow">{contactMode === "live" ? "Demande transmise" : "Démonstration validée"}</p><h2>{contactMode === "live" ? "Merci pour votre confiance." : "Parcours de contact terminé."}</h2><p>{contactMode === "live" ? "Un expert AQUAPROX reviendra vers vous dans les meilleurs délais." : "Mode démonstration : aucune donnée n’a été transmise."}</p><PrimaryButton onClick={onRestart}>Terminer l’expérience</PrimaryButton></div> : <><span className="modal-icon"><UserRound/></span><p className="eyebrow">Demande de contact</p><h2 id="contact-title">Restons en contact.</h2><p>Trois informations suffisent pour transmettre votre demande à notre équipe.</p><form onSubmit={submitContact}><label>Prénom<input name="prenom" autoComplete="given-name" required maxLength={80} placeholder="Votre prénom"/></label><label>Société<input name="societe" autoComplete="organization" required maxLength={120} placeholder="Votre société"/></label><label>Email ou téléphone<div className="input-icon"><Mail/><input name="contact" autoComplete="email" required maxLength={160} placeholder="vous@entreprise.fr"/></div></label><label className="contact-honeypot" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off"/></label>{error && <p className="form-error" role="alert">{error}</p>}<PrimaryButton type="submit" disabled={submitting}>{submitting ? "Transmission…" : "Être recontacté"}</PrimaryButton><small>{contactMode === "live" ? "Vos données sont uniquement utilisées pour répondre à votre demande." : "Mode démonstration — aucune donnée ne sera envoyée."}</small></form></>}</motion.div></motion.div>}</AnimatePresence>
  </motion.section>;
}
