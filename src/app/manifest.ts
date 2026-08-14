import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AQUAPROX — Révélez l’invisible",
    short_name: "AQUAPROX",
    description: "Expérience événementielle interactive dédiée aux réseaux d’eau des bâtiments.",
    start_url: "/?mode=kiosk&display=tv&interaction=touch",
    display: "fullscreen",
    background_color: "#041624",
    theme_color: "#061b2c",
    orientation: "landscape",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
