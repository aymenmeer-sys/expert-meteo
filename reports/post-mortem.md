# Game day post-mortem

## Incident 1 — Open-Meteo indisponible
- Détection : timeout API.
- Impact : données météo absentes.
- Réponse : cache Service Worker et message d’état.
- Action : conserver le cache stale et instrumenter les erreurs.

## Incident 2 — Vigilance Météo-France indisponible
- Détection : deux sources en échec.
- Impact : aucun niveau présenté comme certain.
- Réponse : fallback explicite `source indisponible`.
- Action : alerte opérateur et nouvelle tentative 15 minutes.

## Incident 3 — Push refusé
- Détection : permission navigateur refusée.
- Impact : pas de notification.
- Réponse : alertes persistantes toujours visibles dans l’application.
- Action : permettre la réactivation depuis `/alertes`.
