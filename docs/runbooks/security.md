# Runbook sécurité

## npm/pnpm audit

Exécuter `pnpm audit`. Les vulnérabilités transitives sont triées par exploitabilité et corrigées par mise à jour du parent ou override testé. Ne pas utiliser `--force` sans revue.

## OWASP ZAP

Le workflow `.github/workflows/zap.yml` lance chaque nuit un baseline passif sur `PRODUCTION_URL`, sans attaque active. Consulter les artefacts et ouvrir un ticket pour chaque alerte confirmée.

## CSP

La politique `Content-Security-Policy` est appliquée par `next.config.mjs`. Toute nouvelle origine doit être ajoutée explicitement après vérification des appels réseau et validation preview.

## Incident

En cas de blocage, revenir temporairement à `Content-Security-Policy-Report-Only` via un commit traçable, documenter l’écart puis corriger la directive manquante.
