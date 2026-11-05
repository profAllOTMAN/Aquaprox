# Collecte de contacts — Salon AquaProx

## Parcours

Après une intervention, deux choix facultatifs permettent de continuer la visite ou d’ouvrir un QR code. Le QR encode `https://aquaprox.vercel.app/contact?zone=…` avec `chaufferie`, `logements`, `gaines` ou `toiture`. Le formulaire demande uniquement un nom ou une entreprise, un email, un téléphone et le consentement. La zone et la source « Salon AquaProx » sont automatiques.

## Configuration serveur

Le projet Supabase existant est **aquaprox-leads** (`rbknfmjxfwehlfrmiezu`). La table `public.aquaprox_leads` et sa fonction d’enregistrement sont déjà créées. `supabase/lead-capture.sql` décrit leur création initiale ; ne pas réexécuter ce script sur la table existante.

Variables serveur requises : `SUPABASE_URL` et `SUPABASE_SECRET_KEY`. Elles sont configurées localement dans `.env.local`, ignoré par Git. Ne jamais utiliser de préfixe `NEXT_PUBLIC_` pour la clé, ni la copier dans le code ou la documentation.

Avant tout déploiement autorisé, ajouter ces deux variables dans le projet Vercel correspondant. Aucune modification Vercel ni aucun déploiement n’a été effectué pour cette fonctionnalité.

## Accès équipe et CSV

Ouvrir [le Table Editor du projet](https://supabase.com/dashboard/project/rbknfmjxfwehlfrmiezu/editor), puis `aquaprox_leads`. L’accès nécessite un compte membre du projet Supabase. Le menu d’export de la table permet d’obtenir un CSV pour le suivi commercial. Aucun contact n’est accessible depuis une page publique de l’application.

La table conserve le nom, email, téléphone, zone, source, consentement, version du consentement et date serveur. RLS et les permissions interdisent l’accès aux rôles navigateur. La clé serveur dispose de SELECT/INSERT sur cette table. Les requêtes sont validées côté serveur ; un identifiant de soumission empêche les doublons lors des tentatives répétées. Une limite de trois nouvelles demandes par email et par heure est appliquée en base.

## Vérification du 5 novembre 2026

- Parcours interactifs testés dans les quatre zones jusqu’au CTA.
- QR réellement décodés : URL de production et zone correctes.
- Routes correspondantes ouvertes sur le serveur local, sur un écran mobile 390 × 844, puis soumises à la vraie base Supabase.
- Quatre enregistrements vérifiés en base : une entrée par zone, source et consentement corrects, date serveur présente.
- Quatre nouvelles tentatives identiques : aucun doublon.
- Consentement obligatoire, données invalides, requête trop volumineuse et origine étrangère vérifiés.
- Erreur serveur : champs conservés et possibilité de réessayer.
- Audit Supabase : aucun avertissement de sécurité. TypeScript et compilation de production réussis.
- Données synthétiques supprimées après vérification.

Le QR pointe volontairement vers la production. Le formulaire de production ne sera disponible qu’après déploiement approuvé ; le test réalisé utilise la même route sur le candidat local, pas une mise en production implicite. Une vérification du QR depuis un téléphone devra être effectuée immédiatement après le déploiement autorisé.
