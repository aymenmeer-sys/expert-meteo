# Runbook — panne fournisseur météo

1. Vérifier les erreurs et le p95 de `/api/weather`.
2. Confirmer le timeout du fournisseur principal.
3. Servir la dernière donnée cache avec son timestamp.
4. Basculer vers le fournisseur secondaire si disponible.
5. Ouvrir un incident, documenter l'impact et clôturer par un post-mortem blameless.
