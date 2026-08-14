# Fiche technique — expérience événementielle AQUAPROX

## Objet

Application interactive premium destinée aux salons professionnels. Elle présente un bâtiment en coupe, révèle cinq risques liés au réseau d’eau, explique la chaîne de valeur AQUAPROX et conduit vers une prise de contact.

Le contenu est aligné sur le positionnement public AQUAPROX : acteur intégré du traitement de l’eau depuis 1989, intervenant de l’audit et du conseil à l’exploitation et l’assistance, en passant par la formulation et l’ingénierie.

## Parcours de découverte guidée

Chaque point technique suit une révélation en quatre temps :

1. un hotspot neutre présente un **indice**, sans donner immédiatement le nom du risque ;
2. le premier toucher déclenche un zoom localisé et affiche un signal observable ;
3. l’utilisateur choisit de révéler le risque et accède à l’explication ;
4. la solution présente l’intervention, la valeur pour le site et la chaîne intégrée AQUAPROX.

Les contrôles `+`, `−` et retour à la vue d’ensemble restent disponibles en permanence. L’indice est explicitement présenté comme un outil de sensibilisation à confirmer par un audit AQUAPROX, et non comme un diagnostic automatique.

## Technologie

| Élément | Choix |
|---|---|
| Framework | Next.js App Router 16 |
| Langage | TypeScript strict |
| Interface | React 19, SVG éditable, zoom sémantique et CSS |
| Motion | Framer Motion et animations SVG/CSS |
| Typographie | Geist et Geist Mono via `next/font` |
| Déploiement cloud | Vercel relié à GitHub |
| Déploiement local | Conteneur Docker Next.js standalone |
| Architectures machine | x86-64 et ARM64 selon l’hôte Docker |
| Supervision | Endpoint `GET /api/health` et healthcheck Docker |
| Continuité | Cache hors-ligne après préchauffage kiosque |

## Profils d’affichage

| Profil | Cible | Comportement |
|---|---|---|
| `tablet` | tablette paysage 10–13 pouces | composition compacte, panneau de risque en bottom sheet |
| `tv` | borne ou téléviseur 1920×1080 | profil principal du brief |
| `wall` | mur LED, 2560×1440 ou canvas haute définition | typographie, espacements et cibles agrandis |

Le paramètre `display` décrit la densité visuelle. La résolution physique doit être réglée dans l’OS et dans le processeur vidéo/LED. Pour un mur LED, confirmer avec le prestataire la résolution d’entrée acceptée, l’EDID, le mapping des cabinets et le safe area ; l’application ne remplace pas la configuration du processeur LED.

## Modes d’interaction

### 1. Touch

Pour une borne, une TV tactile ou une tablette. Toutes les actions critiques fonctionnent au tap, sans dépendre du hover.

```txt
/?mode=kiosk&display=tv&interaction=touch
```

### 2. Staff

Pour une TV non tactile pilotée avec un mini-clavier, une télécommande USB ou un presenter qui émet des touches clavier.

```txt
/?mode=kiosk&display=tv&interaction=staff
```

Raccourcis : `1–5`, flèches, Page Up/Page Down, espace, `R`, Home.

### 3. Passive

Pour un mur LED purement visuel. Le parcours passe automatiquement de l’attract à la sélection, au bâtiment, au risque, au score et à la conversion.

```txt
/?mode=kiosk&display=wall&interaction=passive
```

## Scénarios matériels

### Stand TV tactile

- écran 55 à 75 pouces avec dalle tactile ou cadre infrarouge ;
- mini-PC ou Raspberry Pi 5 ;
- HDMI pour l’image, USB HID pour le tactile ;
- profil `tv + touch` ;
- distance d’utilisation indicative : bras tendu à environ 1–2 m.

### Mur LED

- sortie HDMI/DisplayPort de la machine vers le processeur LED ;
- profil `wall + passive` si le mur n’est pas tactile ;
- profil `wall + touch` seulement avec une couche tactile réellement calibrée ;
- vérifier la résolution native d’entrée, le ratio, la luminosité, le scan rate et le safe area avec l’intégrateur LED ;
- privilégier Ethernet et une machine locale pour éviter toute dépendance au Wi-Fi du salon.

### Tablette

- navigateur récent en mode application plein écran ou PWA ;
- profil `tablet + touch` ;
- orientation paysage verrouillée côté système ;
- support physique empêchant l’accès aux boutons système et au câble.

### Présentation staff

- TV classique ou vidéoprojecteur ;
- mini-PC/Raspberry Pi caché ;
- presenter Bluetooth/USB ou clavier compact ;
- profil `tv + staff`.

## Réseau et données

- Le parcours principal fonctionne depuis la machine locale sans Internet.
- Le QR code peut pointer vers une URL publique configurable.
- Le formulaire réel utilise un webhook HTTPS côté serveur.
- Aucune donnée de contact n’est écrite dans `localStorage` ou dans le cache hors-ligne.
- Le mode démonstration ne transmet rien et l’indique explicitement.
- Les analytics sont facultatives et ne contiennent pas les champs du formulaire.

## Performance et exploitation

- animations SVG/CSS sans moteur 3D lourd ;
- build statique pour la page principale, API uniquement pour santé et contact ;
- reset d’inactivité par défaut après 45 secondes ;
- service Docker redémarré automatiquement ;
- Chromium relancé automatiquement par systemd en mode kiosque ;
- surveillance locale via `/api/health`.

## Limites et responsabilités d’intégration

- Le plein écran applicatif ne peut pas supprimer seul l’interface du navigateur : Chromium doit être lancé avec `--kiosk`.
- Le processeur LED, le tactile, l’audio éventuel et l’EDID relèvent de l’intégrateur audiovisuel.
- Un formulaire live nécessite un webhook CRM validé, une information RGPD adaptée et une politique de conservation définie par AQUAPROX.
- La simulation de score reste un outil de sensibilisation, jamais un diagnostic technique réel.
