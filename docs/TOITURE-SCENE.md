# Toiture — même interaction que la chaufferie

Une seule vue fixe contient les deux anomalies : alarme rouge de la PAC et rejet de glycol noir opaque à la soupape solaire. Les « + » sans légende pointent vers l’écran de la PAC et le bac de récupération ; le clic rapproche la caméra puis ouvre l’enquête.

Le gros plan est extrait de cette même scène. Chaque point comporte une question de constat, une explication puis une question sur l’intervention. Le défaut de la PAC ne prouve pas seul l’embouage : le contrôle hydraulique est explicitement indiqué dans l’explication avant de proposer le désembouage et le dégazage.

Les corrections sont locales et indépendantes : la PAC corrigée n’efface pas le glycol noir encore non traité. Le nettoyage solaire ne supprime pas l’alarme de la PAC non traitée. La comparaison Avant/Après conserve les autres interventions.

## Images actives

- `public/assets/tradeshow/zones/toiture-unified-before-v3.png`
- `public/assets/tradeshow/zones/toiture-operational-after-v4.png`

Images réalisées avec ImageGen intégré. Le résultat opérationnel s’affiche dès l’explication de la solution et pendant l’intervention, sans réafficher la fuite du diagnostic. Le bac reste vide et propre, la soupape ne rejette plus et le voyant est vert.

Le zoom d’entrée utilise `public/assets/tradeshow/motion/building-to-toiture-matched-3s.mp4` : 3 secondes, 1920 × 1080, 24 images/s, sans son, avec un raccord final sur l’image exacte de la scène. Génération Kling 3.0 Pro sur Higgsfield, coût confirmé 5,25 crédits (solde constaté avant 542,09 ; après 536,84). Une seule génération, aucune régénération payante. Export compressé avec maintien final de l’image de référence.

Références client consultées : [station solaire à deux rangs](https://www.ebay.fr/itm/236715196117) et [soupape de sécurité](https://www.manomano.fr/p/soupape-de-securite-de-remplacement-8-bars-pour-syrobloc-24-et-25-dn-20-47731568). Elles servent de repères de représentation, sans imposer un tarage ou une référence de matériel au réseau illustré.

## Vérifications

- Deux enquêtes toiture et quatre questions parcourues dans le navigateur.
- Aucun nom d’anomalie affiché à côté des « + ».
- Rapprochement de caméra avant ouverture des questions.
- Corrections PAC et solaire indépendantes, comparaison Avant/Après testée.
- Vidéo de la centrale de dégazage lue en boucle.
- Panneau vérifié à 1366 × 768 sans débordement ; aucune erreur JavaScript observée.
- Régression chaufferie : quatre enquêtes, huit questions et zoom vidéo arrêté à 3,2 s validés.
- TypeScript et build de production réussis.

## Prompts

### Zoom vidéo raccordé

Modèle : Kling 3.0 Pro ; 3 s ; 16:9 ; son désactivé. Première image : bâtiment général ; dernière image : toiture avant intervention. Job : `541f88ae-c194-4545-a818-bf9e1d18735e`.

Create a single continuous 3-second cinematic camera transition for a touchscreen building diagnostic experience. Start EXACTLY on the provided full cutaway apartment-building image. Camera smoothly ascends and pushes toward its ROOFTOP mechanical equipment, with gentle ease-in and ease-out, stable horizon, no rotation reversal. End EXACTLY on the supplied rooftop reference image, same framing and perspective and daylight: two heat-pump cabinets on left, three blue solar thermal collectors on right, red and blue piping and central exchange station. FINAL FRAME MUST MATCH THE SECOND IMAGE so playback can freeze seamlessly into that identical interactive scene. Keep the red PAC warning screen, central red solar fault lamp, OPAQUE BLACK glycol stream, BLACK-filled overflowing catch tray and black sight-glass liquid at the end. This is the faulty BEFORE state, not a repair video: do not clean the fluid or change alarms to green. No people, no captions, no UI, no circles or plus icons, no floating equipment, no morphing pipes. Maintain same white concrete building, materials, lighting and surroundings. Camera motion only, no cuts, no dissolve to a different roof, no new architecture. Reach the exact end-frame composition before the last 0.2 seconds and hold that frame.

### Solution opérationnelle, sans rejet

Use case: precise-object-edit. This is the SOLUTION / operational AFTER scene of a solar thermal rooftop station. Keep EXACT same camera, composition, dimensions 1672x941, roof, light, solar collectors, PAC cabinets, added degassing device and all piping. Locally correct only central solar station x51-74%, y38-81%: the brass pressure relief valve must be CLOSED with absolutely ZERO discharge, ZERO stream, ZERO droplets, ZERO overflow. The stainless catch tray is entirely EMPTY, DRY, CLEAN and shows its bare metal bottom, no pool and no stains on tray or floor. The short transparent vertical sight glass on the blue lower pipe at x64.5%,y61.5% must show NO dark liquid and NO blue water, NO bubbles: neutral clear transparent inspection tube with clean brass ends, no visually colored fluid. Solar station status light is distinctly GREEN and operational. Clear any residual black stream, wet sheen or colored puddle anywhere in this central group. Do not add or move equipment, alter the PAC, modify perspective or redraw other areas. High quality realistic industrial 3D, no UI, text, labels, arrows or branding. BEFORE contains black degraded glycol; THIS AFTER must be unmistakably clean, dry, operational with no visible fluid leak.

### Cohérence du fluide dans le voyant

Use case: precise-object-edit. Change ONLY the fluid INSIDE the vertical transparent sight glass around x64.5%, y61.5% (the short transparent cylinder with brass end caps on the blue lower solar pipe, immediately right of the black dripping relief stream). That fluid must be OPAQUE JET BLACK, like the degraded glycol already dripping into the black-filled tray. Fill the visible interior of this glass with black glycol, NO blue water, NO clear water, NO white bubbles. Preserve transparent outer glass highlights and brass end fittings. Keep all the rest of this BEFORE image literally unchanged: same black stream and black tray, same solar red lamp, same PAC red alarm, same pipes, blue pipe paint stays blue, solar collectors, roof, camera, sky and every other object. Match EXACT same dimensions 1672x941. Do not change framing or add text/UI. The whole solar loop has degraded BLACK glycol; this one sight glass must show the same fluid.

### Avant

Use case: precise-object-edit. Edit target: this rooftop plant image. Keep EXACT same 1672x941 camera, perspective, roof, daylight, buildings, solar collectors, heat pumps, pipes and all equipment. Need one BEFORE view containing BOTH educational anomalies simultaneously, without labels: (1) The degraded glycol from the brass relief outlet at x61%, y44% and the entire catching tray at x61%,y72% must be unmistakably OPAQUE JET BLACK, like black ink or tar. Remove ALL caramel amber orange brown hue from the liquid and drips. Show a viscous black stream, a deep BLACK pool, black overflow stains on tray. Keep brass metal brass, do not darken surrounding pipes. The central solar station red fault lamp remains red. (2) Add a small realistic control screen to the RIGHT HAND SIDE of the largest heat pump cabinet on LEFT of image, around x35%,y29%, with a bright RED warning triangle on dark screen. This should match the unit and be readable as an alarm, no words. Both faults must be clearly visible together in the full scene. Keep remaining area clean and credible. No UI, no pluses, no circles, no captions, no text, no watermark. Do not change equipment order, architecture or composition. Highest quality clean photorealistic semi-realistic 3D.

### Après

Use case: precise-object-edit. Input is a rooftop BEFORE scene; create the matching AFTER image with EXACT same 1672x941 framing and pixel-aligned camera, equipment and roof. Change ONLY: (1) all opaque black degraded glycol in the central catching tray, hanging stream, and stains on tray and immediate floor x52-73% y42-80% are cleaned away. The tray is clean brushed stainless and EMPTY; no liquid discharge from relief valve. Solar control red lamp x57.6%,y46.3% becomes GREEN. Preserve brass fittings and glass gauge. (2) Heat pump warning screen x34.5%,y27.8% becomes a GREEN operating indicator, no words. (3) Add a small realistic vacuum degassing unit with grey upright housing, slim stainless vessel and brass small-bore connections, fitted to PAC pipe circuit, on roof foreground around x44%,y64%, max8% image width, does not hide circulation station. This is a compact preventive device not another heat pump. Everything else MUST remain unchanged: solar collectors, PAC cabinets, red and blue pipes, all concrete, surrounding buildings, light, shadow geometry and camera. No text, UI, pluses, annotations or watermark. Maintain clean premium photorealistic semi-realistic 3D. This is used for independent local before-after masked corrections, so change no unrelated area.
