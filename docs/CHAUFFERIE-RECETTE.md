# Chaufferie — parcours de diagnostic

> Mise à jour active : `CHAUFFERIE-QUESTIONNAIRE-MEDIAS.md`. Le questionnaire à deux questions par anomalie est rétabli. Les notes du parcours simplifié ci-dessous sont conservées comme historique.

> Parcours actif : voir `CHAUFFERIE-PARCOURS-DIRECT.md`. L’équipement est prioritaire ; les films de principe sont accessibles uniquement via « Voir comment ça fonctionne ». La chaufferie conserve une question par anomalie, validée directement au toucher, sans clic de confirmation. Les vérifications de l’ancien parcours ci-dessous sont historiques.

## Parcours livré

Le clic sur Chaufferie conserve le zoom vidéo existant, arrêté à 3,2 secondes avant son fondu vers un autre décor. La scène fixe reprend le décor à deux grands caissons gris demandé le 3 novembre 2026. Les masques et points d’observation sont adaptés à ce décor ; les enquêtes et améliorations restent conservées. Aucun écran d’arrivée supplémentaire. Quatre points « + » sans légende et leurs courts traits de liaison ciblent les anomalies sans les masquer. Le clic rapproche la caméra de la zone pendant 720 ms, puis ouvre l’enquête. Le retour restitue doucement la vue d’ensemble.

Chaque enquête comprend deux questions : reconnaître le problème, puis choisir l’intervention. Une mauvaise réponse est écartée et accompagnée d’un indice. Chaque bonne réponse explique le constat ou l’action. Les interventions curatives précèdent la prévention lorsqu’elles sont pertinentes. Le traitement filmogène comporte une seule étape de protection.

La scène garde son cadrage. Les installations apparaissent par fondu local et restent visibles après les autres corrections, y compris après un retour au bâtiment. Les boutons Avant et Après comparent le constat et la solution. Les quatre solutions utilisent désormais des boucles pédagogiques locales, muettes, avec pause/lecture et accès au visuel de l’équipement. Voir `CHAUFFERIE-ANIMATIONS.md` pour les principes, les sources et la reproduction des films. Les étapes curatives et les corrections locales restent conservées.

## Correspondance des visuels

| Point | Image du constat | Solution | Apparition dans la chaufferie |
| --- | --- | --- | --- |
| Particules ferreuses | Photo client des barreaux couverts de dépôt noir | Désembouage, filtre magnétique et protection filmogène | Filtre inox côté chauffage |
| Pression | Gros plan du purgeur avec gouttelettes et coulures | Contrôle de la perte, puis groupe de maintien de pression | Groupe compact près de la chaudière et du vase d’expansion ; purgeur corrigé |
| Calcaire | Canalisation en coupe et macro du dépôt clair | Détartrage, puis adoucisseur | Adoucisseur à gauche, en amont de la production ECS |
| Corrosion | Manchette témoin ouverte avec rouille et piqûres | Traitement filmogène et dosage suivi | Poste de dosage côté ECS |

Les signes de fuite ne suffisent pas, à eux seuls, à prouver une pression basse : l’explication précise que la mesure confirme ce diagnostic dans le scénario. Le visuel générique de dosage ne porte ni mention d’hypochlorite ni pictogrammes incompatibles avec le traitement présenté. Le rendu des installations reste une illustration pédagogique à valider par l’expert métier.

## Vérification effectuée

- TypeScript et compilation de production réussis.
- Navigateur : quatre enquêtes complètes, huit questions et sept actions.
- Indice après erreur, explication après réponse correcte, comparaison Avant/Après, réouverture et conservation des quatre corrections.
- Zoom vidéo présent et arrivée directe en scène ; aucune image d’arrivée intermédiaire.
- Lecture effective vérifiée pour les vidéos du filtre et de l’adoucisseur : lecture active, boucle, son coupé, aucune erreur vidéo.
- Vérification visuelle à 1600 × 900 et 1366 × 768 ; aucun débordement des panneaux ni image manquante.
- Aucune erreur JavaScript observée pendant le parcours.

## Nouveaux médias

Génération avec l’outil ImageGen intégré. Aucun crédit Higgsfield consommé.

- `public/assets/tradeshow/equipment/technical/corrosion-witness-v2.png`
- `public/assets/tradeshow/equipment/technical/film-dosing-station-v2.png`
- `public/assets/tradeshow/scenes-v3/chaufferie-reference-before-v4.png`
- `public/assets/tradeshow/scenes-v3/chaufferie-reference-after-v4.png`

### Prompt : manchette témoin

Use case: scientific-educational. Asset type: photorealistic technical diagnostic photograph for AquaProx touchscreen quiz. Generate a wide 3:2 image, highest quality. Main subject: an opened removable steel witness spool (manchette témoin) from an ECS hot water pipe, revealing unmistakable dark orange-brown pitting rust and irregular corrosion on its interior metal wall, without white chalky mineral deposits. The circular pipe opening fills most of the image, with realistic worn threaded brass unions and a hint of red valve and copper pipe in blurred background. An expert tradesperson can immediately recognize CORROSION of the pipe metal, rather than scale, a blue filter vessel or dirty magnetic rods. Semi-realistic premium industrial 3D rendering, same warm concrete boiler room lighting as supplied scene, crisp detailed metal and rust, navy blue background accents, no UI, no labels, no text, no hands, no illustration, no fake transparent pipe. Composition all relevant damage centered and clearly visible in a landscape 3:2 frame.

### Prompt : implantation du maintien de pression

Reference: `public/assets/tradeshow/scenes-v3/pression-after-v2.png`.

Use case: precise-object-edit. Edit target: supplied boiler-room photograph, lock exact 1672x941 landscape framing, room geometry, camera, all architecture, lights, floor and pipes. Move ONLY the compact grey pressure-maintenance pump skid currently in lower right at image x75-85%, y56-76%. Remove it from that position and restore the original small black vertical strainer joining the blue horizontal pipe there. Put this same compact grey pump skid on the floor at x62-68%, y59-77%, just to the RIGHT of the second central boiler and immediately in FRONT of/LEFT of the red expansion vessel, realistically small and not hiding the boilers. The red expansion vessel must remain visible. Connect the skid using slim small-bore pipework to the adjacent heating pipe. Preserve the silver cylinder on far right with its repaired brass automatic air vent on top, no leak. IMPORTANT: all other objects, surfaces, proportions, pipes and lighting must stay pixel-aligned to input. No additional equipment, no text, no labels. Photorealistic high quality.

### Prompt : poste de dosage générique

Use case: product-mockup. Asset: AquaProx educational boiler-room touchscreen, neutral generic dosing station for film-forming water treatment. Premium photorealistic industrial 3D render on deep navy studio background and floor, cool blue rim lighting, accurate engineering. Show a compact blue wall-mounted electronic metering dosing pump with a small rectangular screen, white pump head, two clear flexible tubes properly connected to suction and discharge; suction line descends into a single plain white polyethylene cylindrical dosing tank with black screwed cap, placed on small black rectangular drip tray. Pump mounted above the tank on a slim stainless support bracket, not sitting loose. Discharge tube ends at a brass injection fitting on a short upright external copper pipe on right. Tank and pump fully visible, generous breathing room, three-quarter front view, landscape 3:2. NO label, NO text, NO logo, NO fish icon, NO hazard diamond, NO chemical name, NO hypochlorite, NO chlorine, NO filter vessel, NO technical diagram. This is generic dosing equipment only; do not invent branded product packaging. Match visual style of blue water softener and grey pressure-maintenance product renders.
