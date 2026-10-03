# AQUAPROX - plan MVP en 1 jour

## 1. Ce que le client demande réellement

Le produit n'est pas un jeu de recherche d'erreurs. C'est un diagnostic visuel simplifié d'un immeuble collectif.

La promesse de l'expérience est :

> J'observe un bâtiment -> j'identifie un signal -> je comprends le risque -> je découvre le diagnostic et la solution AQUAPROX.

Les quatre attentes de cadrage sont couvertes par le MVP :

1. wireframes détaillés matérialisés par les écrans interactifs ;
2. première intention graphique semi-réaliste et technique ;
3. parcours de conversion centré sur le QR code ;
4. recommandation technique pour une borne événementielle.

## 2. Périmètre MVP recommandé

### Inclus en une journée

- un immeuble collectif en coupe ;
- quatre univers visibles : toiture, logements, gaines techniques et chaufferie ;
- cinq diagnostics démontrables : embouage, présence d'air, défaut d'équilibrage, température ECS insuffisante et entartrage ;
- un parcours constant : signal visible -> indice -> question courte -> conséquence -> solution AQUAPROX ;
- une révélation avant/après dans la chaufferie avec apparition de l'équipement correctif ;
- une progression simple « X risques identifiés sur 5 » ;
- un écran final avec QR code comme CTA principal et contact expert comme CTA secondaire ;
- fonctionnement souris, tactile, présentation pilotée et lecture automatique ;
- fonctionnement local et mode démonstration sans collecte de données.

### Volontairement hors MVP

- véritable scène 3D temps réel ;
- photographie réaliste de chaque équipement ;
- personnalisation du bilan mobile après scan ;
- CRM et attribution des leads ;
- scénarios tertiaire, santé et hôtellerie ;
- validation d'ingénierie des raccordements et implantations.

Ces éléments doivent être ajoutés après validation du concept, car ils n'améliorent pas la preuve de faisabilité du premier jour.

## 3. Wireflow

### Écran 1 - Attraction

- message : « Votre bâtiment vous envoie des signaux. Saurez-vous les lire ? » ;
- immeuble animé en arrière-plan ;
- action unique : commencer.

### Écran 2 - Diagnostic du bâtiment

- immeuble en coupe avec chauffage et bouclage ECS visibles ;
- cinq signaux cliquables, assez grands pour une borne ;
- au premier clic : zoom et indice contextualisé ;
- au second clic : panneau de diagnostic.

### Écran 3 - Question et conséquence

- une seule question à deux réponses ;
- feedback immédiat, sans punition ni score de jeu ;
- conséquence métier clairement formulée ;
- action : révéler la solution AQUAPROX.

### Écran 4 - Révélation avant/après

- même point de vue de chaufferie ;
- apparition de l'équipement adapté ;
- rôle de l'équipement, bénéfice pour le bâtiment et chaîne de valeur AQUAPROX ;
- action : poursuivre l'exploration.

### Écran 5 - Bilan

- progression X/5, jamais une note arbitraire sur 100 ;
- liste des risques vus et restant à explorer ;
- transition vers le bilan mobile.

### Écran 6 - Conversion

1. CTA principal : « Recevoir mon bilan de vigilance » par QR code ;
2. CTA secondaire : « Échanger avec un expert AQUAPROX » ;
3. option : « Demander à être recontacté ».

Le QR code est prioritaire car il évite la saisie longue et les problèmes de confidentialité sur une borne de salon.

## 4. Direction graphique

- fond bleu nuit technique, aqua pour les flux maîtrisés, ambre pour les anomalies ;
- dessin vectoriel semi-réaliste plutôt qu'un univers ludique ;
- contrastes et titres lisibles à 2-3 mètres ;
- cibles tactiles généreuses ;
- animations courtes servant la compréhension : circulation, alerte, zoom et apparition de solution ;
- vocabulaire constant : signal, diagnostic, conséquence, solution, expertise.

## 5. Production en une journée avec IA

### 09:00-10:00 - cadrage

- extraction des exigences du PDF ;
- définition des cinq scénarios ;
- rédaction des micro-contenus et critères d'acceptation.

### 10:00-12:00 - structure et identité

- génération de l'immeuble vectoriel et des composants UI ;
- mise en place du parcours, de la progression et des modes d'affichage ;
- adaptation responsive borne, tablette et grand écran.

### 13:00-15:00 - interactions

- hotspots, zoom, questions et feedback ;
- comparaison avant/après ;
- apparition des cinq solutions ;
- animations et états tactiles.

### 15:00-16:30 - conversion

- bilan X/5 ;
- QR code ;
- formulaire de démonstration ;
- événements analytiques et reset automatique.

### 16:30-18:00 - recette

- tests clavier, souris et tactile ;
- contrôle 1920 x 1080 et tablette ;
- build de production ;
- correction des débordements et vérification du mode hors ligne.

## 6. Recommandation technique

- Next.js + React pour produire rapidement une expérience maintenable ;
- SVG et CSS animés pour le bâtiment : rapides, nets sur grand écran, légers et modifiables ;
- Framer Motion pour les transitions ;
- déploiement web ou exécution locale sur mini-PC en mode kiosk ;
- service worker pour la résilience réseau ;
- QR code pointant vers une landing page mobile avec identifiant de session ;
- webhook CRM activé uniquement en production.

Le MVP doit rester déterministe sur la borne. L'IA sert à accélérer le cadrage, les contenus, les visuels et le code ; elle ne doit pas générer les réponses en direct pendant le salon, ce qui ajouterait latence et risque opérationnel.

## 7. Validation indispensable avant production finale

L'IA peut produire l'intention graphique et le prototype, mais elle ne remplace pas la validation métier demandée dans le PDF. Un expert AQUAPROX doit valider :

- la forme et le nom des équipements ;
- leur implantation et leur raccordement ;
- les températures, débits, pressions et seuils présentés ;
- le lien exact entre symptôme, diagnostic et solution ;
- la formulation liée au risque légionelles.

## 8. Critères de réussite du MVP

- le visiteur comprend la consigne en moins de 5 secondes ;
- un hotspot est identifiable à 2-3 mètres ;
- un scénario complet prend moins de 45 secondes ;
- la différence avant/après est comprise sans explication orale ;
- le bilan peut être atteint après un seul risque ou après les cinq ;
- aucune saisie n'est obligatoire sur la borne ;
- l'expérience se réinitialise automatiquement ;
- l'application continue à fonctionner si la connexion internet tombe.
