# Audit sécurité v1.1.0

## Contrôles présents
- Headers nosniff, HSTS, referrer policy, permissions policy et CSP report-only.
- Requêtes API externes avec timeout sur la vigilance.
- Accès favoris limité à l’utilisateur authentifié.
- Validation TypeScript et tests unitaires dans CI.

## À compléter
Rate limiting distribué, DAST et SCA externe doivent être activés dans l’environnement de production avant certification finale.
