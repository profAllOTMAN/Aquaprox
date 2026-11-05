export const LEAD_SOURCE = "Salon AquaProx";
export const CONTACT_PRODUCTION_ORIGIN = "https://aquaprox.vercel.app";
export const LEAD_ZONES = {
  chaufferie: "Chaufferie",
  logements: "Logement",
  gaines: "Gaines techniques",
  toiture: "Toiture",
  general: "Projet général",
} as const;

export type LeadZone = keyof typeof LEAD_ZONES;

export function isLeadZone(value: unknown): value is LeadZone {
  return typeof value === "string" && Object.hasOwn(LEAD_ZONES, value);
}

export function contactUrl(zone: LeadZone) {
  const url = new URL("/contact", CONTACT_PRODUCTION_ORIGIN);
  url.searchParams.set("zone", zone);
  return url.toString();
}

export type LeadFields = {
  name: string;
  email: string;
  phone: string;
  zone: LeadZone;
  consent: true;
  submissionId: string;
};

export function validateLead(input: unknown): { data?: LeadFields; error?: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Le formulaire est incomplet." };
  }
  const body = input as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (name.length < 2 || name.length > 160 || /[\u0000-\u001f\u007f]/.test(name)) {
    return { error: "Indiquez votre nom complet ou le nom de votre entreprise." };
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Indiquez une adresse email valide." };
  }
  const digits = phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.length > 32 || digits.length < 8 || digits.length > 15) {
    return { error: "Indiquez un numéro de téléphone valide." };
  }
  if (!isLeadZone(body.zone)) return { error: "La zone d’intérêt est invalide. Rouvrez le lien du QR code." };
  if (body.consent !== true) return { error: "Votre accord est nécessaire pour être recontacté." };
  if (typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) {
    return { error: "Rechargez le formulaire puis réessayez." };
  }
  return { data: { name, email, phone, zone: body.zone, consent: true, submissionId: body.submissionId } };
}
