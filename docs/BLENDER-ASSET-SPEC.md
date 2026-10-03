# AQUAPROX - cahier de livraison SIM 3D / Blender

## Stratégie recommandée

Pour le MVP, Blender produit les environnements et le navigateur gère les interactions. Il ne faut pas exporter immédiatement toute la scène en WebGL.

Cette approche donne :

- un rendu réaliste ou semi-réaliste beaucoup plus contrôlé ;
- une qualité constante sur une borne, même avec un ordinateur moyen ;
- des transitions instantanées et fiables sans téléchargement d'un lourd modèle 3D ;
- une validation métier image par image ;
- la possibilité de remplacer un rendu sans modifier l'application.

Le temps réel 3D pourra devenir une phase 2 si la rotation libre de caméra est réellement nécessaire.

## Ce qu'il faut fournir

### 1. Vue générale de l'immeuble

Fichier obligatoire :

`public/assets/scenes/building/overview.webp`

Spécifications :

- 3000 x 1980 px, ratio 50:33 ;
- WebP avec transparence ;
- immeuble collectif en coupe, centré ;
- même composition que les quatre zones du parcours : toiture, logements, gaines techniques, chaufferie ;
- espace libre autour du bâtiment pour les hotspots et leurs libellés ;
- aucun texte intégré dans l'image ;
- aucune alerte ni pastille intégrée dans le rendu ;
- éclairage semi-réaliste, matériaux crédibles, détails lisibles à distance.

L'application ajoute les hotspots, les libellés, la progression et les animations par-dessus cette image.

### 2. Cinq couples avant/après

Chaque risque utilise exactement le même cadrage avant et après :

```text
public/assets/scenes/risks/
  embouage/
    before.webp
    after.webp
  air/
    before.webp
    after.webp
  equilibrage/
    before.webp
    after.webp
  ecs/
    before.webp
    after.webp
  entartrage/
    before.webp
    after.webp
```

Spécifications pour chaque image :

- 1600 x 640 px ;
- WebP, profil sRGB ;
- caméra, focale, exposition et éclairage strictement identiques dans le couple ;
- `before.webp` montre le signal ou le défaut ;
- `after.webp` montre l'action corrective et l'équipement AQUAPROX ;
- aucun texte dans le rendu ;
- poids cible inférieur à 450 Ko par image.

### 3. Contenu de chaque couple

| Dossier | Avant | Après |
|---|---|---|
| `embouage` | radiateur ou circuit avec contraste thermique et circulation dégradée | filtre magnétique inox et pompe doseuse intégrés au circuit |
| `air` | pression instable, microbulles ou point haut problématique | centrale de dégazage raccordée au circuit |
| `equilibrage` | colonnes et indicateurs présentant des débits différents | vannes d'équilibrage réglées et valeurs stabilisées |
| `ecs` | retour ECS insuffisant, mesure à 46 °C représentée visuellement sans texte incrusté | sondes/monitoring et boucle ECS rééquilibrée |
| `entartrage` | dépôts sur la production ou l'échangeur | adoucisseur installé en amont de la production |

## Réglages Blender

### Caméra

- utiliser une caméra unique verrouillée par vue ;
- créer une collection `CAMERAS_LOCKED` ;
- protéger position, rotation et focale après validation du cadrage ;
- utiliser une focale entre 45 et 60 mm pour limiter les déformations techniques ;
- éviter le grand-angle dramatique ;
- conserver les mêmes réglages pour `before` et `after`.

### Couleur et éclairage

- utiliser AgX dans Blender ;
- exporter en sRGB ;
- privilégier une lumière principale douce et un contre-jour froid discret ;
- garder les matériaux proches de leurs couleurs métier : inox, cuivre, acier peint, calorifuge ;
- réserver l'ambre/rouge aux signaux de risque ;
- conserver le cyan AQUAPROX pour les éléments interactifs ajoutés dans l'application.

### Collections recommandées

```text
00_ENVIRONMENT
01_BUILDING
02_HEATING_NETWORK
03_ECS_NETWORK
04_EQUIPMENT_BASE
05_RISK_STATE
06_AQUAPROX_SOLUTION
07_LIGHTING
08_CAMERAS_LOCKED
09_RENDER_HELPERS
```

Le rendu `before` active `05_RISK_STATE` et masque `06_AQUAPROX_SOLUTION`. Le rendu `after` masque le défaut corrigé et active `06_AQUAPROX_SOLUTION`.

## Passes utiles

Pour le MVP, les images finales avant/après suffisent. Si du compositing ou des animations supplémentaires sont prévus, fournir aussi :

- beauty pass ;
- équipement AQUAPROX sur fond transparent ;
- signal/défaut sur fond transparent ;
- ombre de l'équipement sur fond transparent ;
- object mask par équipement ;
- depth pass facultatif pour un léger effet de parallaxe.

Formats de travail : PNG 16 bits ou OpenEXR. Les fichiers intégrés dans l'application restent en WebP.

## Nommage et versions

- uniquement des minuscules, sans espaces ni accents ;
- conserver les noms de dossiers indiqués ;
- ajouter les versions uniquement aux fichiers de travail Blender, par exemple `chaufferie_v03.blend` ;
- les exports finaux doivent toujours s'appeler `before.webp`, `after.webp` ou `overview.webp`.

## Activation dans l'application

Une fois les onze images placées aux bons chemins, définir :

```env
NEXT_PUBLIC_VISUAL_MODE=rendered
```

Puis relancer le build. Si une image est absente ou invalide, l'application revient automatiquement sur le visuel vectoriel de secours pour la scène concernée.

## Validation avant intégration

Pour chaque rendu, vérifier :

- correspondance exacte du cadrage avant/après ;
- équipement identifiable sans légende ;
- raccordements techniquement plausibles ;
- absence de texte ou logo déformé généré dans l'image ;
- contraste lisible à 2-3 mètres ;
- zone importante non masquée par le futur panneau d'interface ;
- validation par un expert AQUAPROX.

## Premier lot à envoyer

Avant de produire les onze images, envoyer seulement :

1. une capture de la vue générale de l'immeuble ;
2. le couple `air/before` et `air/after` ;
3. une capture des réglages de caméra et de color management.

Ce lot permet de valider le style, le cadrage et la transition avant de lancer tous les rendus.

## Prototype open source intégré

Le premier couple `air/before.webp` et `air/after.webp` est généré par :

`blender/scripts/build_chaufferie_concept.py`

La scène éditable est enregistrée dans :

`blender/aquaprox_chaufferie_concept.blend`

Elle utilise deux ressources CC0 de Poly Haven :

- Modular Industrial Pipes 01, Jorge Camacho ;
- Boiler Room HDRI, Oliksiy Yakovlyev.

Les sources et textures restent dans `blender/source/`. Le fichier Blender final embarque également ses ressources afin de pouvoir être ouvert indépendamment.

### Version immersive dans le navigateur

Le composant `src/components/experience/ImmersivePlantScene.tsx` superpose les interactions aux rendus haute fidélité. Il permet :

- l'exploration rapprochée de l'installation ;
- une légère parallaxe contrôlée par le pointeur ;
- la sélection de points techniques ;
- la comparaison avant/solution dans le même cadrage ;
- une utilisation fluide sur borne tactile sans charger toute la géométrie Blender.

Les rendus Blender définitifs remplaceront les images de concept sans modification du parcours interactif.
