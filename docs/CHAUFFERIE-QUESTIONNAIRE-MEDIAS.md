# Chaufferie — retour au questionnaire et contrôle des médias

## Parcours actif

Retour au questionnaire de la version `063d94b` : deux questions par anomalie (huit questions au total), sélection d’une réponse, validation, indice en cas d’erreur et explication de la réponse correcte. La première question identifie le risque, la seconde choisit l’intervention. Le décor à deux chaudières reste conservé.

Les deux questions précèdent les actions. Les cas qui le demandent conservent leur ordre métier : désembouage puis filtration, réparation de la perte puis maintien de pression, détartrage puis adoucissement. La protection filmogène est appliquée en une seule action. Une préparation déjà effectuée reste mémorisée.

Le bouton **Voir comment ça fonctionne** reste optionnel : il affiche une animation pédagogique séparée. Les explications techniques ne remplacent pas les images du constat ni les vidéos du produit. Pendant une action curative, le visuel du défaut est affiché ; pendant la prévention, l’équipement adapté est présenté.

Après application, la transformation se joue dans le même décor. La fiche ne se rouvre pas automatiquement. Tous les repères chaufferie restent des **+**, y compris les points corrigés ; leur couleur indique l’état et leur nom accessible permet de revoir la correction.

## Correspondances vérifiées

| Cas | Constat | Équipement / film produit | Animation technique optionnelle |
| --- | --- | --- | --- |
| Dépôts ferreux | `equipment/magnetic-bars.jpg` | `equipment/technical/magnetic-filter.png` + `motion/magnetic-filter.mp4` | `motion/explainers/filter.mp4` |
| Pression | Gros plan du purgeur humide de `scenes-v3/pression-anormale-before.png` | `equipment/technical/pressure-maintenance-group.png` | `motion/explainers/pressure.mp4` |
| Calcaire | `equipment/client-reference/manchette-test-entartrage.png` | Photo simplex `equipment/technical/water-softener.jpg` + `motion/water-softener.mp4` | `motion/explainers/softener.mp4` |
| Corrosion | `equipment/technical/corrosion-witness-v2.png` | `equipment/technical/film-dosing-station-v2.png` | `motion/explainers/dosing.mp4` |

Chemins relatifs à `public/assets/tradeshow/`. Les corrections en scène conservent les images locales spécifiques à chaque équipement, sans remplacer toute la chaufferie ni effacer les interventions précédentes.

## Films examinés et exclus des mauvais cas

Les quatre films produits existants ont été lus et inspectés au début, au milieu et en fin de séquence (4,04 s, 1280 × 720).

- `magnetic-filter.mp4` montre le filtre inox avec une vue en coupe : relié au cas des particules ferreuses.
- `water-softener.mp4` montre une bouteille bleue, son bac à sel et la résine : relié à l’adoucissement, pas au détartrage curatif.
- `dosing-station.mp4` montre un bidon portant une référence à un produit chloré : conservé dans les assets mais non utilisé pour présenter le traitement filmogène ECO²Protect L.
- `degassing-unit.mp4` montre une centrale de dégazage jaune : conservé pour son cas existant, non utilisé comme groupe de maintien de pression.

Aucun nouveau film payant n’est généré. Les logements et les gaines techniques seront revus séparément, après validation de la chaufferie.

## Recette de cette version

Vérification navigateur terminée : huit questions, sept actions, indices après réponse incorrecte aux deux types de question, quatre correspondances de constat/produit, quatre explications techniques optionnelles, quatre repères « + », corrections indépendantes et absence de réouverture automatique de la fiche. Affichage contrôlé à 1366 × 768 sans débordement. Aucune erreur JavaScript observée. TypeScript et compilation de production validés.
