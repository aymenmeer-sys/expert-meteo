# Test de charge v1.1.0

Le script k6 est disponible dans `tests/load/weather.js` et cible `/api/weather` avec 1 000 utilisateurs virtuels. L’exécution doit être réalisée contre une URL de déploiement autorisée; aucun résultat synthétique n’est déclaré. Critère : p95 inférieur à 500 ms.
