# Logement — recette et correspondance des médias

## Scène et parcours

La scène existante est conservée : une partie salon avec un radiateur blanc et une salle de bain occupant la majorité de l’image, avec paroi de douche et lavabo. Les trois marqueurs restent des « + », sans légendes, centrés sur les objets concernés. Le clic rapproche la caméra puis ouvre le questionnaire à deux questions. Les indices après erreur sont conservés.

La couleur thermique du radiateur apparaît uniquement à l’inspection ou après intervention. Le zoom d’entrée reprend les deux premières secondes du film existant, avec un raccord de 0,5 seconde vers le cadre blanc exact ; la vidéo locale résultante dure 3 secondes. Elle évite la fin de l’ancien film où le radiateur était déjà coloré avant le clic. Ce raccord est un montage de médias existants, pas une nouvelle génération 3D.

## Les trois enquêtes

| Cas | Image du constat | Première action | Seconde action | Résultat visible |
| --- | --- | --- | --- | --- |
| Radiateur | Nouveau gros plan thermique suivant les reliefs du radiateur, chaud en haut et froid en bas | Désembouage | Filtration préventive en chaufferie et vérification | Vue thermique du même radiateur, chaleur homogène |
| Douche | Gros plan de la paroi entartrée issue du même décor | Détartrage des dépôts existants | Adoucissement en amont dans le local technique | Même paroi nettoyée |
| Lavabo | Nouveau gros plan du mitigeur sur chaud, main sous le jet, badge froid | Dans le cas de contamination confirmée de cette enquête, désinfection par kit PROBIO | Remise en état de la production/distribution ECS et contrôles | Même mitigeur après intervention, contrôles indiqués dans l’interface |

La première action ne valide pas prématurément la correction complète. La préparation reste mémorisée si le visiteur quitte la fiche ou revient au bâtiment. Après l’application finale, l’effet s’affiche dans la scène puis la vue d’ensemble reste disponible : aucune fiche ne se rouvre automatiquement. La fiche résultat se consulte au clic sur le « + » corrigé.

Dans cette fiche, le résultat dans le logement est montré en premier. **Voir l’équipement** affiche le matériel au bon endroit de la chaîne de traitement. **Voir comment ça fonctionne** reste optionnel et ouvre une courte boucle pédagogique. Les boutons Avant/Après et Rejouer l’avant/après restent disponibles.

## Équipements et vidéos

- Radiateur : le filtre magnétique est explicitement présenté comme une protection en chaufferie après désembouage. Son ancien film `magnetic-filter.mp4` est réutilisé pour cette phase préventive, pas comme image d’une machine de désembouage. Une nouvelle animation vectorielle `explainers/radiator.mp4` explique nettoyage, circulation puis prévention.
- Douche : le visuel simplex et le film existant `water-softener.mp4` correspondent à l’adoucisseur en amont du logement. Le film technique optionnel `explainers/softener.mp4` explique la résine et la régénération ; l’adoucisseur n’est pas présenté comme retirant le tartre déjà déposé.
- Lavabo : l’image exacte du kit PROBIO fournie par le client est conservée. Un cadrage SVG affiche le panneau, le coffret REDOX et les deux pompes de manière lisible ; un bouton montre le schéma complet. Aucun bidon chloré générique ni poste filmogène de la chaufferie ne remplace ce kit. Une nouvelle boucle vectorielle `explainers/probio.mp4` illustre régulation REDOX et injection pilotée sans consigne de dosage.

Une eau qui reste froide malgré la commande chaude révèle un défaut ECS à contrôler, pas une preuve de contamination. L’illustration bactérienne est annoncée comme une illustration du risque. Le contrôle confirmant une contamination est une donnée explicite de la seconde question de ce scénario. La désinfection ne réchauffe pas l’eau : la correction de sa cause et le suivi sont conservés comme seconde action. Aucune conclusion de potabilité ne repose sur l’image ou la couleur du jet.

## Références client consultées

- `backlog_developpeur_application_salon_copro.xlsx`, première feuille, lignes 8–11 : priorité à la salle de bain, radiateur blanc avant clic, parcours lavabo, kit de chloration et distinction curatif/préventif pour la douche.
- `26.10.20_AQUAPROX TERTIAIRE_Retour Appli_1.docx.md` : réutilisation des problèmes entre zones avec constats adaptés et logique curatif/préventif.
- `2610E5-E0 - Kit probio.png` : schéma du kit de chloration avec coffret, deux pompes d’injection, sonde REDOX et réseau ECS, déjà importé dans `equipment/client-reference/kit-probio.png`.

## Nouveaux fichiers actifs

Tous les chemins suivants sont relatifs à `public/assets/tradeshow/` :

- `zones/radiator-thermal-before-v3.png`
- `zones/radiator-thermal-after-v3.png`
- `zones/sink-observation-before-v3.png`
- `zones/sink-observation-after-v3.png`
- `motion/building-to-logement-matched-3s.mp4`
- `motion/explainers/radiator.mp4` et son affiche `radiator.jpg`
- `motion/explainers/probio.mp4` et son affiche `probio.jpg`

Les quatre gros plans sont produits avec ImageGen intégré et sauvegardés dans le projet. Les deux boucles de principe sont exportées localement en MP4 H.264, 960 × 960, 24 i/s, 8 secondes, via le moteur Canvas existant (`KINDS=radiator,probio`). Aucun crédit Higgsfield n’est consommé. Les anciennes images et vidéos restent disponibles pour l’historique.

## Prompts ImageGen employés

### Radiateur avant

Use case: precise-object-edit / scientific-educational. Asset type: polished close-up diagnostic image in the existing AQUAPROX apartment touchscreen prototype. Input image 1 is the exact apartment and radiator reference. Recreate a much clearer close-up of ONLY this same white vertical-grooved panel radiator on the same beige wall, with the same right-side white thermostatic valve, brass couplings, vertical red supply and blue return pipes. Keep the warm contemporary apartment materials and natural lighting. Camera almost frontal with the SAME slight perspective as reference, complete radiator and its right-side valve visible, a small part of the living-room cabinet at left and bathroom doorway at right, no different room or equipment. High quality semi-realistic 3D architectural visualization, clean landscape 4:3 composition, radiator occupying ~65% image width and most height, enough breathing room around exact equipment silhouette. Apply a credible pedagogical thermal-camera visualization ONLY ON THE ACTUAL METAL SURFACE of the radiator: top quarter hot saturated orange-red, gradual irregular yellow/orange middle, clearly cold deep cyan/navy-blue bottom third, indicating sludge accumulation and reduced circulation. The thermal color must follow every groove, perspective edge, rounded corner and exact outline of the real radiator, with realistic surface lighting and tonal depth. It must NOT be a flat rectangular gradient pasted over the photograph. Do not color wall, thermostat, pipe background or floor. No crude heat halo outside the radiator, no floating rectangular overlay, no painted square. This is an illustrative thermal observation, not a measured temperature scale. No text, numbers, legend, logo, UI, border, plus icon, watermark or split panel. One cohesive crisp image.

### Radiateur après

Use case: precise-object-edit. Edit target: input image 1, the completed AQUAPROX apartment radiator diagnostic image. Create its exact AFTER-intervention thermal view. Preserve the ENTIRE image composition, 1448x1086 dimensions, camera angle, radiator geometry, every groove, thermostat, pipes and couplings, wall, apartment background, lighting, floor and all object locations. Change ONLY the thermal visualization inside the exact metal radiator silhouette. The whole radiator now heats coherently after sludge removal: orange-red upper area and warm orange/amber-yellow across the rest, including the whole bottom third. Eliminate ALL cold blue and cyan areas on the radiator surface. Maintain natural variations along the actual grooves, crisp details, credible 3D material shading and surface contours. Do not create a flat rectangular overlay. The wall and thermostat remain natural unchanged neutral colors. Blue return PIPES outside the radiator remain unchanged: only the radiator face becomes uniformly warm. No outside halo, no smoke, no fire or steam, no text, numbers, scale, UI, symbols, labels or watermark. A pixel-aligned before/after pair of the same scene, no architecture or perspective changes.

### Lavabo avant

Use case: precise-object-edit / scientific-educational. Asset type: high-resolution diagnostic close-up in the AQUAPROX apartment touchscreen. Input image 1 is the exact apartment scene reference. Recreate a crisp close-up of the SAME bathroom washbasin faucet on the right of this scene: brushed chrome single-lever mixer with a horizontal cylindrical spout pointing left, tall cylindrical body, same white rectangular basin, beige limestone wall, warm mirror-edge LED, small portion of green plant on left and soap dispenser at far right, same premium semi-realistic architectural 3D style. Composition 4:3 landscape, all faucet and visible stream centered, camera at natural near-eye-level angle facing tap, complete mixer handle and basin clear, no different bathroom. The faucet's handle is turned fully to the hot position with its tiny red hot-water marker visible, but water is actually cold (no steam, no red water). A realistic adult's single hand enters naturally from the LEFT, palm up gently testing the clear stream directly below the spout, above the basin. Only hand and small wrist visible, anatomically accurate, five natural fingers, fingers relaxed together, no weird gestures. The hand and stream must align exactly with the faucet spout. Clear neutral water stream, tiny realistic splash over palm into white basin; comfortable soft light, clean modern details. No temperature numbers, no text, no labels, no snowflake, no UI, no overlaid circles or dots, no icons, no watermark. The app will add its own small cold-water badge, so do not bake explanatory graphics into the image. This is the BEFORE diagnostic state, not a product photo or a chemical treatment illustration. Preserve a clear view of the faucet, hand and running water.

### Lavabo après

Use case: precise-object-edit. Edit target: input image 1, AQUAPROX apartment sink observation close-up. Produce the matching AFTER-intervention view, preserving this exact 1448x1086 composition, chrome mixer, hot-position lever with its tiny red marker, beige stone wall and mirror lighting, white basin, plant at left, soap dispenser at right, same camera, materials, shadows and exposure. Change only this: remove the hand and wrist completely; reconstruct the hidden background and basin naturally. Keep a natural clear stream flowing from the exact same aerator directly down into the sink with a small realistic splash. No hand and no other person. The repaired water supply itself is clear and colorless, not red or orange. Do NOT add steam, thermal colors, heat waves or disinfection equipment in the bathroom. Technical checks will be indicated by the app, not baked into this image. No text, temperature numbers, badges, circles, UI or watermark. This is the same faucet after repair and verification of the ECS system, not a different model or camera angle.

## Vérifications finales

- Parcours navigateur complet : trois enquêtes, six questions et six actions, avec indice après erreur.
- Nouveau couple thermique utilisé dans le diagnostic et le résultat ; ancienne surcouche rectangulaire supprimée.
- Nouvelle paire de gros plans du mitigeur utilisée avant/après ; ancienne main vectorielle et cercle de commande retirés.
- Deux films produits existants lus effectivement et reliés aux bonnes phases ; trois films de principe lus sur demande.
- Kit PROBIO client en détail et schéma complet vérifiés ; eau encore froide après la seule désinfection, résultat rétabli uniquement après la seconde action.
- Corrections indépendantes, repères « + », réouverture explicite des fiches et comparaison Avant/Après vérifiés.
- Entrée logement contrôlée : 3 secondes, 1920 × 1080, dernier cadre correspondant à la scène blanche de diagnostic.
- Revue visuelle à 1366 × 768, sans débordement de panneau ni erreur JavaScript.
- TypeScript et compilation de production validés. Questionnaire chaufferie à huit questions également vérifié après les changements du moteur partagé.
- Aucun push et aucun crédit Higgsfield supplémentaire.
