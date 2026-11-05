import type { Metadata, Viewport } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { isLeadZone } from "@/lib/lead-contact";

export const metadata: Metadata = { title: "Votre projet — AQUAPROX", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ zone?: string | string[] }> }) {
  const { zone } = await searchParams;
  return <ContactForm zone={isLeadZone(zone) ? zone : "general"} />;
}
