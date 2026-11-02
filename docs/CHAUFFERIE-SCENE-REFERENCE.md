# Chaufferie — scène fixe issue du cadrage vidéo

La vidéo existante s’arrête à 3,2 s, avant le fondu vers l’ancien local technique. La capture client et une image extraite du même film servent de références à une reconstitution fixe de la même disposition. La reconstitution conserve l’ordre des équipements mais ajoute les indices pédagogiques ; elle n’est pas une copie pixel à pixel de la capture.

## Assets actifs

- Avant : `public/assets/tradeshow/scenes-v3/chaufferie-reference-before-v4.png`
- Après : `public/assets/tradeshow/scenes-v3/chaufferie-reference-after-v4.png`
- Géométrie, arrêt vidéo, coordonnées et masques : `src/data/boilerRoomScene.ts`

| Enquête | Point réel dans l’image (x, y) | Indice |
| --- | --- | --- |
| Dépôts ferreux | 72,7 %, 56,5 % | Pot avec barreau noir sur le retour |
| Pression | 88,9 %, 28,5 % | Purgeur humide au sommet du ballon droit |
| Calcaire | 47,7 %, 44,3 % | Manchette ouverte avec dépôt clair |
| Corrosion | 37,9 %, 44,3 % | Manchette ouverte à l’intérieur rouillé |

Le point de liaison reste sur l’objet. Le bouton « + » est décalé de 3,3 % à droite et de 5,5 % vers le haut pour laisser lire le défaut. Les coordonnées suivent le cadre réel de l’image, même avec des bandes latérales ou horizontales.

Le clic rapproche la caméra pendant 720 ms, puis ouvre la question. Le déplacement reste borné aux limites de l’image pour ne pas révéler de fond vide. Les corrections utilisent la même image après avec des masques indépendants, afin de conserver les interventions déjà réalisées. Le gros plan du purgeur provient directement de la scène avant.

## Production et crédits

Images produites avec ImageGen intégré, sans Higgsfield. Coût Higgsfield : 0 crédit. Les fichiers existants des autres scènes sont conservés.

## Prompts employés

### Reconstitution avant

Use case: precise-object-edit. Asset: main BEFORE scene for AquaProx educational boiler-room game. Input image 1 is exact composition reference, a screenshot of the room in a building cutaway video. Input image 2 is a clean video frame of same environment. Reconstruct the SAME boiler room, not a different room. Remove all video UI/controls and apartment interiors. Make an exceptionally sharp photorealistic semi-realistic 3D image in 16:9 landscape, 1920x1080 or higher. Straight-on frontal camera, preserve exact left-right order and appearance: white rectangular twin boiler at left (x14%); red expansion vessel (x25%); central tall polished steel hydraulic/ECS cylinder (x43%); smaller polished cylinder and black circulation pump (x54-60%); grey wall control panels (x68%); brass/blue manifolds (x77%); tall silver-foil insulated storage tank far right (x86%). Preserve concrete structural opening, slab along bottom, red and blue risers and silver pipes overhead, same warm neutral lighting and materials. Add vertical breathing room by revealing concrete ceiling and floor inside this same basement, no new room, no window, no other floors. Keep all equipment readable. Add ONLY FOUR clear physical diagnostic anomalies, in distinct locations: 1) at x69%, y66%, a small existing dark sludge collection pot on the blue return pipe, top open with a visibly black dirty magnetic inspection rod protruding; this is the dirty old pot, NOT a new polished magnetic filter. 2) At x86%, y28%, brass automatic air vent at the TOP of the far-right tank with subtle visible water droplets, descending water streaks and a nearby damp wall stain. 3) At x38%, y45%, a removable open inspection sleeve on an ECS pipe close to central production cylinder, showing a clearly pale cream chalky mineral encrusted interior. 4) At x29%, y40%, a second separate opened witness pipe sleeve on hot-water departure with distinctly rusty orange-brown corroded interior (not chalk). Physically plausible joints and supports; anomaly objects sufficiently large to identify at normal view. Leave foreground space at far-left x3-8% for a future blue softener, x29% low for a future white dosing tank, x75% low for future pressure-maintenance skid. No treatment softener, no dosing station, no new magnetic filter and no pressure-maintenance skid installed in this BEFORE version. No UI, no plus signs, no circles, no labels, no words, no watermark. Keep image 1 architecture and layout recognizably unchanged; this is a high-resolution faithful reconstruction with only the described four diagnostic additions.

### Ajout des solutions

Use case: precise-object-edit. Edit target: image1, the EXACT before-state boiler room. Produce the AFTER-state of THIS SAME IMAGE. Same 1672x941 size and composition. Lock the camera, all concrete, lighting, equipment positions and pipes pixel-aligned. Do not move, resize, recolor or replace any existing boiler, red vessel, cylinders, panels, manifolds or storage tank. Change ONLY these four local groups: (1) Replace the dirty small black pot around x73%,y56% with a compact polished INOX magnetic filter connected to the same blue return pipe, under the existing control panel. Size only ~6% of image width, extending from y52% to65%, not a huge cylinder. (2) Repair the brass air vent at x89%,y28% on top of the right insulated tank: remove droplets, brown wall stains and water streaks only there. Add a compact generic pressure maintenance skid, charcoal vertical control cabinet, stainless pump and small grey expansion vessel, on floor foreground at x64%, y64-76%, below control panels, to right of black circulation pump, left of magnetic filter, max10% image width. (3) Add a small blue water softener cylinder and dark brine tank in lower far-left foreground x3-10%,y54-76%, physically plumbed to nearby water supply, without hiding or moving white boiler behind. Clean the pale chalky deposit in the open witness pipe at x48%,y44%, showing clean metal inside. (4) Add a blue dosing metering pump with a single plain white polyethylene tank and black cap, tubing mounted externally, in foreground at x31%,y56-74%, max6% image width, in front of existing narrow pipework, no label and no chemical symbols. The opened rusty witness sleeve x38%,y44% should now show clean smooth protected inner wall, no orange rust. All additions realistic, modest proportions, coherent joints, matched industrial lighting. No text, labels, logos, video controls, UI, circles, arrows or marks. Important: fill no other areas, change no architecture. The two images must support local masked before/after comparisons with no camera jumps. Preserve identical crop and perspective.

### Nettoyage local des témoins après intervention

Use case: precise-object-edit. This is an AFTER treatment image. Make only TWO small local edits and leave literally everything else unchanged: in the open circular pipe mouth at x38.0%, y44.3%, replace the ORANGE RUST interior with a smooth clean silver grey steel inner wall, no orange/brown remains. In the second open circular pipe mouth at x47.8%,y44.3%, replace the thick CREAM WHITE CHALKY material with a smooth clean empty silver grey steel interior. Both are small open steel witness pipe sections, the outer pipe rings and every adjoining pipe must stay exactly the same. Show clean treated empty pipe openings with clear inner diameter, no deposits, no colored fluids. Do not move either opening. Preserve every other pixel: the white boiler, softener in front of it, red expansion vessel, silver cylinders, blue dosing pump and white tank, pressure skid, inox magnetic filter, right insulated tank and repaired vent, all pipes, all wall, ceiling and floor. SAME 1672x941 framing and SAME camera. No text or UI.
