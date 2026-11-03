# Scènes globales, équipements et vidéos — 3 novembre 2026

Cette recette remplace les indications antérieures relatives aux boutons Avant/Après dans les fiches individuelles, ainsi que l’affectation de l’ancien film d’adoucisseur.

## Règle de comparaison

**Avant/Après concerne exclusivement une scène globale.** Le même fond, le même cadrage et les mêmes équipements existants sont conservés. Avant masque toutes les couches de solutions ajoutées ; Après affiche les corrections réalisées dans leur emplacement réel. Les gros plans de diagnostic, films produits et animations techniques restent des médias explicatifs, jamais les deux états de cette comparaison.

Le questionnaire de deux questions est conservé. La réponse sur le traitement montre d’abord l’indice diagnostique, pas automatiquement un appareil de prévention. Après l’application complète, l’effet se joue dans la scène puis la fiche se ferme ; un clic explicite sur le « + » permet de la revoir. Les étapes curative et préventive restent distinctes lorsqu’elles sont nécessaires.

Dans le logement, le résultat reste visible dans le logement. La courte révélation d’équipement et la comparaison globale montrent le **local commun concerné**, avec un titre explicite : aucun filtre, adoucisseur ou kit de chloration n’est artificiellement installé dans la salle de bain. Un fondu assure le passage au local puis le retour au logement. « Voir l’équipement » et « Voir comment ça fonctionne » sont des consultations facultatives.

## Affectation des médias

Tous les chemins de ce tableau sont relatifs à `public/assets/tradeshow/`.

| Zone / cas | Équipement et emplacement | Film produit | Explication sur demande |
| --- | --- | --- | --- |
| Chaufferie / particules ferreuses | Filtre magnétique sur le retour, après désembouage | `motion/magnetic-filter.mp4` | `motion/explainers/filter.mp4` |
| Chaufferie / pression | Groupe de maintien de pression, après contrôle du purgeur | Image du groupe correspondant ; aucun film de dégazeur substitué | `motion/explainers/pressure.mp4` |
| Chaufferie / calcaire | Adoucisseur simplex en amont, après détartrage | `motion/water-softener-product-loop-v2.mp4` | `motion/explainers/softener.mp4` |
| Chaufferie / conditionnement | Poste de dosage d’un traitement filmogène | Image de dosage ; aucun film d’hypochlorite générique | `motion/explainers/dosing.mp4` |
| Logement / radiateur | Désembouage dans le réseau, puis filtre préventif en chaufferie | `motion/magnetic-filter.mp4`, uniquement pour la filtration préventive | `motion/explainers/radiator.mp4` |
| Logement / douche | Détartrage de la paroi, puis adoucissement dans le local commun | `motion/water-softener-product-loop-v2.mp4` | `motion/explainers/softener.mp4` |
| Logement / ECS trop froide | Kit PROBIO dans le local ECS ; remise en état et suivi de la production/distribution distincts | Schéma exact du kit client ; pas de film de filtre ou de poste filmogène | `motion/explainers/probio.mp4` |
| Gaines / déséquilibre | Mesure et réglage des branches et colonnes ; mallette temporaire de contrôle | Image de la mallette ; pas de film d’un autre équipement | Pas de bouton promettant une vidéo inexistante |
| Toiture / glycol ancien | Même station remise en service, bac nettoyé sans rejet | Résultat dans la scène ; pas de vidéo d’équipement sans rapport | Même scène corrigée |
| Toiture / PAC | Désembouage puis dégazage du circuit PAC | `motion/degassing-unit.mp4` pour le dégazage | Film du dégazeur |

Le nouveau film produit d’adoucisseur est un **montage de 4 secondes en boucle, 1280 × 720**, issu du début du film existant : une seule bouteille bleue avec vanne de commande et un bac à sel. Le passage montrant une canalisation entartrée se nettoyant à côté de l’adoucisseur est écarté : l’adoucissement prévient la formation de nouveaux dépôts, il ne réalise pas le détartrage curatif. L’explication sur la résine reste séparée dans le bouton de fonctionnement.

Le film d’entrée des gaines est un montage de **3 secondes, 1920 × 1080** : début du mouvement existant puis raccord en fondu vers la nouvelle scène exacte, maintenue sur le dernier cadre. Ce montage ne constitue pas une nouvelle génération 3D de caméra.

## Gaines : cohérence entre les deux états

Les lignes 12 à 18 de la première feuille du backlog Excel client ont été prises en compte : deux paires de colonnes bleu/rouge, compteurs individuels par logement, vannes de type STAD, un logement nettement moins alimenté, équilibrage par logement et colonne, mallette de mesure non propriétaire.

| Élément | Avant | Après |
| --- | --- | --- |
| Paires de colonnes | 2 | 2 |
| Compteurs individuels de logement | 4 | 4 |
| Vannes de branches | 4 | 4 |
| Vannes de colonnes | 2 | 2 |
| Mallette de contrôle | 0 | 1, raccordée aux prises de mesure, temporaire |

Les colonnes traversent les planchers ; les quatre compteurs sont placés aux dérivations des logements. La rangée de compteurs centraux de l’ancienne illustration est supprimée. La mallette ne remplace aucune vanne et n’est pas présentée comme un équipement restant installé.

Les valeurs sont des exemples pédagogiques, pas des consignes de dimensionnement. Avant : 352, 348, **10**, 362 L/h ; le troisième réglage indique 0,1 contre 3,5 sur les autres branches. Après : 351, 349, 350, 352 L/h. Les chiffres sont dessinés par l’interface sur les afficheurs pour éviter les chiffres illisibles générés dans les images. Le diagnostic présente quatre recadrages de cette même scène.

Référence de principe pour les prises de mesure et le réglage : [IMI STAD PN25](https://climatecontrol.imiplc.com/en-gb/product/stad-pn25). Les liens vidéo/de comparaison commerciale inaccessibles n’ont pas été considérés comme visionnés ou validés.

## Nouvelles images actives

Éditions avec **ImageGen intégré**, sauvegardées dans le projet ; aucun appel de génération Higgsfield.

| Fichier dans `public/assets/tradeshow/` | Usage |
| --- | --- |
| `zones/gaines-before-v3.png` | Scène avant, quatre compteurs et six vannes |
| `zones/gaines-after-v3.png` | Même scène, mallette raccordée et réglage terminé |
| `scenes-v3/entartrage-simplex-after-v4.png` | Même chaufferie à deux chaudières, ajout d’une bouteille de résine et d’un bac à sel ; le grand ballon bleu existant reste présent |
| `scenes-v3/chaufferie-probio-after-v1.png` | Même chaufferie, ajout d’un panneau PROBIO cohérent avec le schéma client : coffret, deux pompes, analyse et bac produit |

Les états après sont intégrés par masque sur le fond de référence pour limiter les variations périphériques d’une édition générative. Il s’agit de visualisations de prototype, pas de plans d’exécution ou de photographies certifiant une installation réelle.

## Prompts de référence des images finales

Les formulations ci-dessous normalisent les contraintes des éditions retenues pour les reproduire. Les fonds sont les cibles d’édition ; les photos et schémas client servent uniquement de références d’équipement.

### Gaines avant — `zones/gaines-before-v3.png`

Use case: precise-object-edit / scientific-educational. Edit the existing AQUAPROX technical-shaft scene, preserving its front-facing composition, concrete shaft, lighting, materials and semi-realistic architectural 3D style. Show exactly TWO PAIRS of vertical heating risers in BLUE RED BLUE RED order, continuing through the upper and lower concrete slabs, with no open pipe ends. Four apartment branches, two levels and two sides. Exactly FOUR individual apartment heat meters, one per apartment, mounted visibly beside their own branch. Exactly FOUR realistic STAD-style balancing valves on the apartment return branches and TWO column balancing valves on the blue returns, with accessible paired measuring nipples. Remove the inappropriate central row of meters below the column valves. Keep meter LCDs blank and clean so the app can add exact readable values. Before balancing: no portable measuring case and no additional equipment. No legends, UI, arrows, labels or watermark. Preserve a credible connected hydraulic installation rather than a display of unrelated products.

### Gaines après — `zones/gaines-after-v3.png`

Use case: precise-object-edit. Edit target: the completed gaines-before-v3 scene. Preserve the exact framing, architecture, floor, lighting, FOUR apartment meters, FOUR branch balancing valves, TWO column valves and TWO blue/red riser pairs. Keep all installed equipment in the same place and with the same count. Add exactly ONE open portable hydraulic-balancing measuring case on the foreground floor. Connect its two thin red and blue measurement hoses to the two existing measuring nipples of the left central column balancing valve; no floating hoses, no new meter row and no replacement valves. Leave apartment LCDs blank for interface-rendered values. This is the same installation after a balancing service with a temporary verification tool, not a new permanent plant. No text, UI, labels or watermark.

### Adoucisseur simplex — `scenes-v3/entartrage-simplex-after-v4.png`

Use case: precise-object-edit / compositing. Edit target: the existing AQUAPROX boiler-room BEFORE scene with the TWO large grey boiler boxes. Supporting reference: client photo of the simplex water-softening equipment. Preserve exactly the boilers, large existing blue storage cylinder, right stainless tank, concrete room, all existing pipework, camera, lighting and floor. Add in the far-left available equipment area exactly ONE compact blue resin pressure vessel with a controller on top and exactly ONE white brine/salt tank beside it, realistically connected upstream with valves and small lines. Do not create a second resin bottle or mistake the existing large blue storage cylinder for the new softener. Match scale, perspective, material detail, contact shadows and semi-realistic 3D style. No cutaway pipe, no dissolving pre-existing limescale, no text, legends, UI or watermark. Keep the same environment suitable for a masked global before/after reveal.

### Kit PROBIO — `scenes-v3/chaufferie-probio-after-v1.png`

Use case: precise-object-edit / compositing. Edit target: the same AQUAPROX boiler-room BEFORE scene with two large grey boiler boxes. Supporting reference: the client Kit PROBIO schematic, used for component identity and count. Keep the exact building, camera, two boiler boxes, large blue cylinder, right stainless tank, lighting, materials, floor and existing pipes. In the free left-centre area beside the blue cylinder and left of the first boiler, integrate ONE compact PROBIO treatment assembly on a credible support: ONE control cabinet, TWO blue injection pumps, the filtration and analysis chamber with REDOX sensing, connected small sampling/injection tubes, and ONE white product tank in containment below. Match the schematic’s assembly rather than substituting a generic magnetic filter or film-treatment dosing station. Keep all equipment legible and connected at a realistic scale, with consistent perspective and contact shadows. Do not place equipment in a bathroom, do not change unrelated plant, no UI, captions or watermark. The same room must remain aligned for a local masked reveal.

## Budget et vérification

- Plafond autorisé pour cette demande : **300 crédits Higgsfield**.
- Consommation Higgsfield de cette passe : **0 crédit**. Les appels de consultation du service ont retourné une erreur de connexion ; aucun appel de génération ni relance payante n’a été déclenché.
- Réutilisation et montage local des films existants ; nouvelles images via ImageGen intégré.
- Version précédente poussée d’abord sur `origin/main` : **`f4cc3d8`**. Les nouvelles corrections décrites ici sont une passe locale suivante.
- Recette navigateur sur les dix cas des quatre zones : questionnaires, interventions, films affectés, emplacement des équipements, comparaison globale uniquement, même fond et mêmes masques, fermeture et réouverture explicites.
- La fiche de produit isolé n’a plus de boutons Avant/Après. Les « + » sont conservés dans toutes les zones.
- TypeScript, compilation de production, références de fichiers et absence d’erreurs JavaScript contrôlés.
