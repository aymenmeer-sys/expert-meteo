# Observabilité v1.1.0

## Implémenté
- Vercel Analytics conservé en production dans le layout.
- Logger JSON minimal côté serveur avec timestamp, événement et contexte non sensible.
- Route météo instrumentée sur les requêtes; aucune donnée d’authentification ou IP n’est journalisée.
- Health/status public disponible via `/status`.

## Reste à faire
Brancher Sentry pour les exceptions et PostHog pour les événements produit après validation des politiques de consentement. Ajouter alertes de latence et taux d’erreur sur la plateforme de déploiement.
