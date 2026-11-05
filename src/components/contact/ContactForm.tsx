"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { LEAD_SOURCE, LEAD_ZONES, type LeadZone } from "@/lib/lead-contact";
import "./lead-contact.css";

export function ContactForm({ zone }: { zone: LeadZone }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const submissionId = useRef<string | null>(null);
  const busy = useRef(false);
  const successTitle = useRef<HTMLHeadingElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), phone: form.get("phone"),
          zone, consent: form.get("consent") === "on", website: form.get("website"), submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || "L’envoi a échoué. Veuillez réessayer.");
      setStatus("success");
      requestAnimationFrame(() => successTitle.current?.focus());
    } catch (cause) {
      setError(cause instanceof Error && cause.name === "Error" ? cause.message : "Connexion interrompue. Vos informations sont conservées dans ce formulaire, réessayez.");
      setStatus("idle");
    } finally {
      busy.current = false;
    }
  }

  return <main className="lead-contact-page">
    <section className="lead-contact-card">
      <p className="lead-kicker">AQUAPROX · {LEAD_SOURCE}</p>
      {status === "success" ? <div className="lead-success" role="status">
        <CheckCircle2 size={44} />
        <h1 ref={successTitle} tabIndex={-1}>Merci ! Notre équipe vous recontactera prochainement.</h1>
        <a className="lead-form-link" href="/">Découvrir l’expérience AQUAPROX</a>
      </div> : <>
        <h1>Parlons de votre projet.</h1>
        <p className="lead-intro">Laissez vos coordonnées pour échanger avec notre équipe.</p>
        <p className="lead-interest">Votre intérêt <strong>{LEAD_ZONES[zone]}</strong></p>
        <form method="post" onSubmit={submit} aria-busy={status === "sending"}>
          <label htmlFor="lead-name">Nom complet ou nom d’entreprise <span aria-hidden="true">*</span></label>
          <input id="lead-name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="Votre nom ou votre entreprise" />
          <label htmlFor="lead-email">Email professionnel <span aria-hidden="true">*</span></label>
          <input id="lead-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="vous@entreprise.fr" />
          <label htmlFor="lead-phone">Téléphone <span aria-hidden="true">*</span></label>
          <input id="lead-phone" name="phone" type="tel" autoComplete="tel" required maxLength={32} placeholder="06 12 34 56 78" />
          <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-website">Site web</label><input id="lead-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <p className="lead-privacy">Vos coordonnées sont utilisées par AQUAPROX pour répondre à votre demande. Pour exercer vos droits sur vos données, contactez <a href="mailto:info@aquaprox.com">info@aquaprox.com</a>.</p>
          <label className="lead-consent"><input name="consent" type="checkbox" required /> <span>J’accepte qu’AQUAPROX me contacte par email ou téléphone au sujet de mon projet.</span></label>
          {error && <p className="lead-error" role="alert">{error}</p>}
          <button className="lead-submit" type="submit" disabled={!ready || status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Être recontacté"}</button>
        </form>
      </>}
    </section>
  </main>;
}
