import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./refined.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "AQUAPROX — Révélez l’invisible",
  title: "AQUAPROX — Révélez l’invisible",
  description: "Explorez les risques invisibles du réseau d’eau de votre bâtiment.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "AQUAPROX" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
