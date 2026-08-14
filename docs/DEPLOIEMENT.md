# Guide de déploiement

## 1. Architecture recommandée

Deux canaux doivent être conservés :

1. **Vercel** pour la démonstration client, les validations à distance et les mises à jour rapides.
2. **Machine locale** pour le salon, afin que l’expérience reste disponible même si le Wi-Fi du lieu est saturé ou coupé.

Le même dépôt et la même version Git doivent alimenter les deux canaux.

## 2. GitHub

```bash
git add .
git commit -m "Prepare AQUAPROX event experience for deployment"
git remote add origin git@github.com:ORGANISATION/aquaprox-experience.git
git push -u origin main
```

Le workflow `.github/workflows/ci.yml` exécute automatiquement :

- installation déterministe avec `npm ci` ;
- vérification TypeScript stricte ;
- build Next.js de production ;
- audit des dépendances de production au niveau `high`.

Protéger ensuite la branche `main` dans GitHub et exiger la réussite du workflow avant fusion.

## 3. Vercel

1. Dans Vercel, choisir **Add New → Project**.
2. Importer le dépôt GitHub.
3. Laisser le framework détecté sur **Next.js**.
4. Ne pas remplacer les commandes : `npm ci` et `npm run build` sont détectées automatiquement.
5. Ajouter les variables d’environnement avant le premier déploiement.

### Variables publiques de build

| Variable | Exemple | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://experience.aquaprox.com` | URL canonique de l’expérience |
| `NEXT_PUBLIC_QR_URL` | `https://www.aquaprox.com/` | Destination du QR code |
| `NEXT_PUBLIC_CONTACT_MODE` | `demo` ou `live` | Active ou désactive la transmission réelle |
| `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | URL facultative | Collecte d’événements non personnels |

### Secrets serveur

| Variable | Rôle |
|---|---|
| `CONTACT_WEBHOOK_URL` | Endpoint CRM, n8n, Make, HubSpot ou backend AQUAPROX |
| `CONTACT_WEBHOOK_SECRET` | Jeton Bearer facultatif transmis au webhook |

Pour activer le formulaire réel, les deux conditions sont nécessaires :

```txt
NEXT_PUBLIC_CONTACT_MODE=live
CONTACT_WEBHOOK_URL=https://...
```

Sans cela, le formulaire reste honnêtement identifié comme démonstration et ne conserve aucune donnée.

### Domaine et contrôle

- Ajouter le domaine final dans Vercel.
- Tester `/api/health` : la réponse doit contenir `"status":"ok"`.
- Tester les URLs tactile, tablette, staff et passive.
- Faire un déploiement Preview avant chaque passage en Production.

## 4. Machine locale avec Docker

Cette option est recommandée sur Raspberry Pi 5, mini-PC Intel/AMD ou ordinateur de régie. L’image est basée sur la sortie Next.js `standalone` et fonctionne sur `amd64` et `arm64` lorsque Docker utilise l’image Node correspondante.

```bash
cp .env.example .env
docker compose build
docker compose up -d
docker compose ps
curl http://127.0.0.1:3000/api/health
```

Mise à jour :

```bash
git pull --ff-only
docker compose build --pull
docker compose up -d
```

Retour arrière : conserver le tag ou le SHA de l’image validée avant le salon et le relancer avec Docker si nécessaire.

## 5. Raspberry Pi en mode kiosque

### Matériel conseillé

- Raspberry Pi 5, idéalement 8 Go pour garder une marge avec Chromium et les animations ;
- Raspberry Pi OS 64 bits ;
- alimentation officielle et refroidissement actif ;
- stockage fiable, idéalement SSD USB plutôt qu’une microSD pour une exploitation intensive ;
- Ethernet filaire quand il est disponible ;
- sortie HDMI vers l’écran ou le processeur LED ;
- tactile relié en USB HID si l’écran en dispose.

Le tutoriel officiel Raspberry Pi confirme le principe : démarrage direct de Chromium avec `--kiosk` sur Raspberry Pi OS 64 bits. Pour cette expérience animée, le Pi 5 offre une marge plus adaptée qu’un modèle minimal.

### Installation

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin chromium curl git
sudo usermod -aG docker "$USER"
sudo mkdir -p /opt/aquaprox
sudo chown -R "$USER":"$USER" /opt/aquaprox
git clone URL_DU_DEPOT /opt/aquaprox
cd /opt/aquaprox
cp .env.example .env
docker compose up -d --build
```

Pour le navigateur, copier l’exemple d’environnement :

```bash
mkdir -p "$HOME/.config/systemd/user" "$HOME/.config"
cp deploy/kiosk/aquaprox-kiosk.env.example "$HOME/.config/aquaprox-kiosk.env"
cp deploy/kiosk/aquaprox-browser.service "$HOME/.config/systemd/user/"
systemctl --user daemon-reload
systemctl --user enable --now aquaprox-browser.service
```

Selon l’image Raspberry Pi OS, le lancement depuis `.config/labwc/autostart` peut être préférable. Utiliser alors :

```bash
/opt/aquaprox/deploy/kiosk/start-browser.sh &
```

## 6. Fonctionnement hors connexion

En mode kiosque, un service worker met en cache l’application après un premier chargement réussi. Procédure de préchauffage :

1. démarrer l’application locale ;
2. ouvrir une fois l’URL kiosque avec le réseau disponible ;
3. parcourir l’expérience complète ;
4. couper le réseau externe, conserver la machine locale active ;
5. recharger et vérifier le parcours.

Le formulaire live nécessite une connexion au webhook. En cas de coupure, l’interface affiche un message de repli et oriente vers le QR code ou l’équipe du stand. Aucune donnée personnelle n’est stockée localement.

## 7. Références officielles

- Next.js standalone : https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- Auto-hébergement Next.js : https://nextjs.org/docs/app/guides/self-hosting
- Next.js sur Vercel : https://vercel.com/docs/frameworks/full-stack/nextjs
- Variables Vercel : https://vercel.com/docs/environment-variables
- Kiosque Raspberry Pi : https://www.raspberrypi.com/tutorials/how-to-use-a-raspberry-pi-in-kiosk-mode/
