# Recette avant salon

## J-7 — validation logicielle

- [ ] La CI GitHub est verte sur le commit destiné au salon.
- [ ] Le déploiement Vercel Preview est validé par le client.
- [ ] `npm run validate` réussit.
- [ ] `npm run audit:production` ne signale aucune vulnérabilité haute ou critique.
- [ ] Les cinq risques, les solutions, le score et l’écran final ont été relus.
- [ ] Le QR code pointe vers l’URL finale.
- [ ] Le formulaire est explicitement en `demo` ou réellement connecté en `live`.
- [ ] Le premier toucher sur un hotspot ouvre un indice et zoome sur la zone sans révéler immédiatement le risque.
- [ ] Les boutons `+`, `−` et retour à la vue d’ensemble restent lisibles et tactiles.
- [ ] « Révéler ce risque » ouvre le détail, puis « Comment maîtriser ce risque ? » affiche la valeur pour le site.
- [ ] La mention « à confirmer par un audit AQUAPROX » est visible dans chaque carte d’indice.

## J-2 — validation matérielle

- [ ] La résolution de sortie correspond au processeur d’écran/LED.
- [ ] Aucun bord noir, overscan ou rognage n’est visible.
- [ ] Le tactile USB est calibré sur toute la surface.
- [ ] Les cibles principales sont utilisables sans hover.
- [ ] Chromium démarre automatiquement en kiosque après reboot.
- [ ] Docker et le navigateur redémarrent après arrêt forcé.
- [ ] Le parcours fonctionne au moins deux heures en boucle passive.
- [ ] La température et le refroidissement de la machine restent stables.

## J-1 — test sans réseau externe

- [ ] L’application locale répond sur `/api/health`.
- [ ] L’expérience a été préchauffée et parcourue une fois.
- [ ] Après coupure Internet, un rechargement conserve le parcours.
- [ ] Le message de repli du formulaire live est compréhensible.
- [ ] Le QR code et l’équipe du stand restent disponibles comme alternative.

## Jour J — ouverture

1. Alimenter l’écran, le processeur LED et la machine dans l’ordre recommandé par l’intégrateur.
2. Vérifier l’image, puis le tactile ou la télécommande staff.
3. Ouvrir `/api/health` depuis un autre appareil du réseau local.
4. Faire un parcours complet.
5. Revenir sur l’écran attract avant l’ouverture au public.

## Procédure de secours

1. Si le navigateur est bloqué : relancer `aquaprox-browser.service`.
2. Si l’application ne répond pas : `docker compose restart aquaprox`.
3. Si la dernière version est instable : relancer l’image Docker validée précédemment.
4. Si la machine locale tombe : utiliser immédiatement l’URL Vercel depuis une machine de secours.
5. Si Internet et machine locale sont indisponibles : conserver une vidéo MP4 du parcours sur le player du processeur LED comme ultime fallback de régie.

## Fermeture

- [ ] Exporter les leads depuis le CRM/webhook si le mode live était actif.
- [ ] Ne pas copier de données personnelles depuis le navigateur ou la machine kiosque.
- [ ] Arrêter proprement Docker avant de couper l’alimentation de la machine.
- [ ] Noter les incidents et les demandes client pour la version suivante.
