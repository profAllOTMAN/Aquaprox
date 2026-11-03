# Logement — alignement Excel et audit des médias

Référence : `backlog_developpeur_application_salon_copro.xlsx`, première feuille, module Logement, lignes 7 à 11. Cette passe porte sur le logement uniquement. Les comparaisons Avant/Après restent réservées à la scène globale selon `COMPARAISONS-GLOBALES-MEDIAS.md`.

## Repères et observation

- C8 : un point radiateur dans le salon, deux points dans la salle de bain : paroi de douche et lavabo. Le décor conserve cette répartition.
- C9 : le radiateur reste blanc dans la scène. La vue thermique apparaît à son inspection.
- C10 : zoom sur le mitigeur chaud avec main sous l’eau et pictogramme froid ; coupe pédagogique du risque bactérien après le diagnostic ; kit de chloration PROBIO du client pour la désinfection curative.
- C11 : paroi nettement entartrée et distinction entre retrait des dépôts existants et prévention par adoucissement en amont.

Les trois boutons « + » du logement utilisent désormais les mêmes lignes de repérage que la toiture. Les coordonnées sont exprimées en pourcentage du cadre 1672 × 941, pas du viewport : elles restent alignées lorsque le cadre change de taille. Chaque ligne part du point de l’objet et rejoint son bouton, sans légende révélant la réponse. Après correction, le même bouton reste en place et change de couleur.

| Objet | Cible sur l’objet (x, y) | Centre du bouton (x, y) |
| --- | --- | --- |
| Radiateur | 30,5 %, 56,5 % | 35,5 %, 45,5 % |
| Paroi de douche | 66 %, 57 % | 70,5 %, 46 % |
| Mitigeur du lavabo | 91,8 %, 45,5 % | 87 %, 36,5 % |

## Médias correspondant à chaque action

Les chemins du tableau sont relatifs à `public/assets/tradeshow/`. Le fichier `src/data/logementMedia.ts` centralise les affectations par cas et par action. Chaque action fournit son propre média et sa propre animation de fonctionnement.

| Cas et action | Image / film produit | Bouton « Voir comment ça fonctionne » |
| --- | --- | --- |
| Radiateur : désembouage | Gros plan du même radiateur, `zones/radiator-thermal-before-v3.png` | `motion/explainers/radiator.mp4` : dépôts, nettoyage, circulation puis protection |
| Radiateur : protection préventive | `motion/magnetic-filter.mp4`, filtre magnétique installé en chaufferie ; affiche extraite de ce même film | `motion/explainers/filter.mp4` : barreaux magnétiques et filtration |
| Douche : détartrage curatif | Recadrage de la même paroi entartrée dans `zones/logement-diagnostic-before-v2.png` | **Nouveau** `motion/explainers/descaling.mp4` : dépôt, retrait, rinçage et vérification |
| Douche : prévention | `motion/water-softener-product-loop-v2.mp4` : une bouteille simplex et un bac à sel ; affiche extraite de ce même film | `motion/explainers/softener.mp4` : résine, échange d’ions et régénération |
| Lavabo : désinfection curative | `equipment/client-reference/kit-probio.png`, kit exact fourni par le client ; détail et schéma complet disponibles | `motion/explainers/probio.mp4` : régulation REDOX et deux pompes d’injection |
| Lavabo : correction du défaut ECS | `equipment/client-reference/preparateur-ecs-1500l.png`, représentation du préparateur avec échangeur et ballon fournie précédemment | **Nouveau** `motion/explainers/ecs-recovery.mp4` : production, distribution, correction et suivi |

Les deux nouvelles animations sont des **schémas de principe animés**, exportés localement en MP4 H.264, 960 × 960, 24 images/seconde, 8 secondes, avec la palette et la présentation des animations existantes. Ce sont des illustrations du fonctionnement, pas de nouveaux films 3D photoréalistes. Elles se consultent sur demande, avec pause/reprise. Aucun équipement de chloration n’est substitué à la remise en état thermique de l’ECS.

Les images d’affiche des films produits sont maintenant extraites de leur première séquence pour que l’image d’attente, la boucle et l’équipement représenté correspondent :

- `equipment/technical/magnetic-filter-loop-poster.jpg`
- `equipment/technical/water-softener-simplex-loop-poster.jpg`

Le visuel duplex à deux bouteilles `water-softener-hero.png` n’est plus référencé dans le parcours logement. Le résultat après désembouage reste la vue thermique homogène du même radiateur. Après les deux actions de douche, la même paroi est propre. Après les deux actions du lavabo, l’ECS est remise en état et contrôlée. La désinfection seule ne suffit pas à afficher un retour de l’eau chaude.

## Films existants examinés

Inventaire de **20 MP4** présents dans le dossier `motion/` après ajout des deux nouvelles animations. Métadonnées et décodage contrôlés ; prélèvements au début, au milieu et à la fin. Les films pertinents pour le logement ont été revus visuellement puis testés dans leur action effective.

| Film existant | Affectation logement |
| --- | --- |
| `building-to-logement-matched-3s.mp4` | Conservé pour l’entrée, 3 s, 1920 × 1080 ; dernier cadre du décor actuel et radiateur blanc |
| `building-to-logement.mp4` | Ancienne entrée exclue : son cadre final ne correspond pas au décor blanc actuel |
| `magnetic-filter.mp4` | Conservé, 4,04 s, uniquement pour la filtration préventive en chaufferie |
| `water-softener-product-loop-v2.mp4` | Conservé, 4 s, modèle simplex avec un bac à sel |
| `water-softener.mp4` | Exclu : son incrustation de canalisation entartrée peut faire croire que l’adoucisseur retire les dépôts existants |
| `dosing-station.mp4` | Exclu : le poste générique à une pompe ne représente pas le kit PROBIO client à deux pompes et régulation REDOX |
| `degassing-unit.mp4` | Exclu : aucun des trois cas logement ne demande un dégazeur |
| `explainers/radiator.mp4` | Conservé pour le désembouage |
| `explainers/filter.mp4` | Conservé pour la protection préventive du chauffage |
| `explainers/softener.mp4` | Conservé pour l’adoucissement préventif |
| `explainers/probio.mp4` | Conservé pour la désinfection curative |
| `explainers/pressure.mp4`, `explainers/dosing.mp4` | Non affectés au logement : maintien de pression et traitement filmogène du circuit fermé |
| Films d’entrée chaufferie, gaines et toiture | Réservés à leur zone ; aucune réaffectation au logement |

## Navigation et vérification

Le passage de la première à la seconde action réinitialise la vue technique : la vidéo du nettoyage ou de la désinfection ne reste plus affichée à la place de l’équipement de prévention ou du préparateur ECS. La lecture et l’affiche sont également réinitialisées lorsque le média change. Les deux questions et les indices après erreur sont conservés.

Recette navigateur : trois enquêtes, six questions, six actions, trois lignes ciblées, six affectations de vidéos de fonctionnement, lecture/pause/reprise, bon équipement après changement d’action, résultat dans le logement, absence de fiche automatique après application, maintien des « + », cibles accessibles sur petit écran. Les quatre cas chaufferie sont vérifiés en non-régression du moteur partagé. TypeScript et compilation de production contrôlés.

Consommation Higgsfield pour cette passe : **0 crédit**. Aucun appel de génération payante et aucun push.
