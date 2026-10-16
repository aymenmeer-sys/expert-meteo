# Sprint 00 — Setup entreprise

## Date + Sprint + Version
16 octobre 2026 · Sprint 00 · v1.0.0

## Objectifs
Initialiser la gouvernance, les conventions, la documentation et la CI de MétéoExpert.

## Livré
- Application Next.js App Router et TypeScript strict.
- Dashboard MétéoExpert responsive avec recherche, favoris, unités et prévisions.
- Conventions Git Flow, sécurité, accessibilité et rapports documentées.
- CI GitHub Actions ajoutée.

## Tests
- Validation navigateur : dashboard rendu et recherche de ville vérifiée.
- Typecheck/lint/build : à exécuter dans CI selon les outils disponibles.
- E2E et couverture : instrumentation prévue au Sprint 1.

## Sécurité / Accessibilité
Headers de défense en profondeur et exigences RGAA documentés. Aucun secret commité.

## Risques
1. APIs météo externes : prévoir fallback et cache.
2. Cartographie interactive : chargement différé prévu.
3. Données personnelles : consentement et minimisation obligatoires.

## Dette technique
Les données affichées sont actuellement des données de démonstration ; le branchement Open-Meteo est planifié au Sprint 2.

## Prochain sprint
Design tokens, Storybook, thèmes et internationalisation de base.
