# AQUAPROX — Révélez l’invisible

Expérience événementielle tactile-first en Next.js, conçue pour une borne, un stand TV, une tablette ou un mur LED. Le bâtiment interactif propose cinq diagnostics chauffage/ECS et révèle les solutions AQUAPROX dans une chaufferie avant/après.

Le périmètre, le wireflow et le planning de production sont détaillés dans [docs/MVP-1-JOUR.md](docs/MVP-1-JOUR.md).
Le contrat de livraison des rendus SIM 3D / Blender est détaillé dans [docs/BLENDER-ASSET-SPEC.md](docs/BLENDER-ASSET-SPEC.md).

Le diagnostic « présence d’air » comprend une vue immersive semi-réaliste : exploration rapprochée, points techniques interactifs et comparaison avant/solution dans un cadrage parfaitement identique.

## Démarrage

```bash
npm ci
npm run dev
```

Ouvrir `http://localhost:3000`.

Contrôle complet avant livraison :

```bash
npm run validate
npm run audit:production
```

## URLs d’exploitation

| Usage | URL |
|---|---|
| Démo ordinateur | `/?display=tv` |
| Borne ou stand tactile | `/?mode=kiosk&display=tv&interaction=touch` |
| Tablette | `/?mode=kiosk&display=tablet&interaction=touch` |
| Mur LED automatique | `/?mode=kiosk&display=wall&interaction=passive` |
| Présentation pilotée par le staff | `/?mode=kiosk&display=tv&interaction=staff` |

En mode staff : touches `1` à `4` pour les écrans, flèches/Page Up/Page Down pour avancer ou reculer, `R` ou `Home` pour recommencer.

Le délai de reset peut être réglé entre 15 et 600 secondes avec `&idle=90`.

## Déploiement

- [Guide Vercel, GitHub et machine locale](docs/DEPLOIEMENT.md)
- [Fiche technique multi-écrans](docs/FICHE-TECHNIQUE.md)
- [Recette avant salon](docs/RECETTE-EVENEMENT.md)

## Variables d’environnement

Copier `.env.example` vers `.env.local`. Le projet reste en mode démonstration tant que `NEXT_PUBLIC_CONTACT_MODE` n’est pas défini à `live` et que `CONTACT_WEBHOOK_URL` n’est pas configuré.
