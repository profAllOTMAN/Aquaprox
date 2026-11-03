# Chaufferie — boucles explicatives

> Mise à jour active : `CHAUFFERIE-QUESTIONNAIRE-MEDIAS.md`. Le questionnaire à deux questions par anomalie est rétabli. Les notes du parcours simplifié ci-dessous sont conservées comme historique.

> Parcours actif : voir `CHAUFFERIE-PARCOURS-DIRECT.md`. L’équipement est prioritaire ; les films de principe sont accessibles uniquement via « Voir comment ça fonctionne ». La chaufferie conserve une question par anomalie, validée directement au toucher, sans clic de confirmation. Les vérifications de l’ancien parcours ci-dessous sont historiques.

## Livraison du 3 novembre 2026

La scène avec les deux caissons, ses quatre enquêtes, ses coordonnées et ses corrections locales sont conservées. Les apparitions des solutions passent par un fondu de 1,1 seconde. Le statut d’installation suit cette durée.

Quatre films de principe ont été exportés localement : MP4 H.264, 960 × 960, 24 images/s, huit secondes, muets et en boucle. Le total des vidéos est d’environ 1 Mo. Aucun crédit Higgsfield n’est utilisé. Les films pédagogiques complètent les visuels produits sans prétendre être des rendus photoréalistes du matériel installé.

| Enquête | Film actif | Principe expliqué |
| --- | --- | --- |
| Dépôts ferreux | `public/assets/tradeshow/motion/explainers/filter.mp4` | Ralentissement de l’eau, captation du fer par les barreaux et des autres boues par la poche |
| Pression | `public/assets/tradeshow/motion/explainers/pressure.mp4` | Mesure, commande et volume tampon ; la fuite doit être réparée au préalable |
| Calcaire | `public/assets/tradeshow/motion/explainers/softener.mp4` | Échange des ions calcium/magnésium contre sodium, eau adoucie, puis régénération sur un cycle distinct |
| Corrosion | `public/assets/tradeshow/motion/explainers/dosing.mp4` | Prélèvement, injection dosée et protection des parois dans un circuit fermé de chauffage |

Le film apparaît dès l’explication de l’intervention correcte, puis pendant la prévention et dans l’état Après. Les étapes curatives conservent l’image du constat. Les commandes Pause/Lire et Voir l’équipement/Voir le fonctionnement permettent de revoir le mécanisme ou le produit. Le visuel de l’adoucisseur est la photo simplex issue de la documentation, déjà présente dans les assets. Les autres zones conservent leurs médias.

Une affiche JPEG est affichée avant la lecture pour éviter une image noire. Si la lecture automatique est refusée, le bouton Lire permet de lancer le film. Avec la préférence de réduction des animations, la lecture n’est pas automatique. Une erreur de chargement affiche le visuel du produit. Les films restent utilisables hors ligne avec le reste de l’application.

## Références métier consultées

- `23.03.14_AQUAPROX TERTIAIRE_ECO2ProtectL.pdf` : programme de protection filmogène des circuits fermés. Ne pas présenter ECO²Protect L comme un traitement de l’eau potable ou du départ ECS sanitaire. La formation du film et la dispersion des dépôts sont progressives ; la vidéo est un principe accéléré.
- `24.05.28_AQUAPROX Tertiaire_Fiche Produit_Désemboueur Inox.pdf` : double captation magnétique et mécanique, montage sur le retour ; limites de la fiche : 90 °C, 10 bar.
- `26.10.05_AQUAPROX_Fiche Produit_Adoucisseur Premium simplex DN50.pdf` : résine, bac à sel, saumurage et régénération ; plage indiquée : 2–8 bar et 2–40 °C. La boucle illustre un principe, pas un dimensionnement ni une prescription de débit.
- `24.08.29_AQUAPROX Tertiaire_Fiche Produit_Centrale de dégazage_SPIROVENT SUPERIOR S250 dégazeur sous vide.pdf` : prélèvement, dépression et extraction des gaz dissous. Cet appareil n’est pas le groupe de maintien de pression de l’enquête chaufferie ; aucun remplacement incorrect de ce groupe ni aucune vidéo de dégazage n’est utilisé pour illustrer la régulation de pression.

## Reproduction des médias

Le rendu vectoriel Canvas est dans `scripts/equipment-animation.mjs`. `scripts/render-equipment-loops.mjs` produit les quatre vidéos et leurs affiches. Il nécessite Playwright et ffmpeg disponibles sur la machine ; les chemins peuvent être fournis via `PLAYWRIGHT_MODULE`, `FFMPEG_PATH` et `CHROME_PATH`. Il ne contacte aucun service de génération.

Exemple :

```sh
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs FFMPEG_PATH=/path/to/ffmpeg node scripts/render-equipment-loops.mjs
```

## Vérifications

- TypeScript et compilation de production validés.
- Quatre enquêtes, huit questions et quatre corrections indépendantes parcourues dans le navigateur.
- Quatre films de huit secondes lus effectivement, en boucle, en 960 × 960.
- Pause, reprise, retour au visuel produit et retour au fonctionnement vérifiés pour les quatre solutions.
- Boucle de l’adoucisseur vérifiée au franchissement de la fin ; préférence de réduction des animations respectée.
- Affichage revu à 1600 × 900 et 1366 × 768 ; pas de débordement du panneau ni d’erreur JavaScript.
