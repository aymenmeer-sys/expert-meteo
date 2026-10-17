# Rapport MétéoExpert v2.0.0

## Synthèse
La version 2.0.0 ajoute la carte météo avancée MapLibre, le nowcasting, MétéoBot avec fallback sans IA, le dashboard personnalisable, les signalements citoyens avec Blob privé, la carte publique des observations approuvées, la modération admin protégée, le contrat OpenAPI B2B et les améliorations PWA.

## Migration Neon
Appliquer `psql "$DATABASE_URL" -f drizzle/0001_community_reports.sql` avant de recevoir des signalements en production.

## Validation
Typecheck, tests unitaires, build Next, routes OpenAPI, page développeurs, PWA/offline et endpoints de signalements validés localement. La CI et le déploiement Vercel doivent confirmer la migration sur l’environnement Neon cible.
