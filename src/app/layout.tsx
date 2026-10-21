import type { Metadata, Viewport } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import "./refined.css";
import "./prototype.css";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "AQUAPROX — Diagnostic chaufferie",
  title: "AQUAPROX — Diagnostic chaufferie",
  description: "Une expérience tactile immersive pour identifier un risque réseau et découvrir la solution AQUAPROX.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "AQUAPROX" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${lato.variable} ${mono.variable}`}>{children}</body></html>;
}
