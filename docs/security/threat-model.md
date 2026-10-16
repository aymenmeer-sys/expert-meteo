# Threat model STRIDE

- Spoofing : authentification serveur et cookies sécurisés.
- Tampering : validation Zod des entrées, requêtes paramétrées.
- Repudiation : journaux structurés avec correlation ID.
- Information disclosure : aucune clé API dans le navigateur, minimisation des données.
- Denial of service : timeout, cache et rate limiting sur les routes météo.
- Elevation of privilege : contrôles serveur par utilisateur et revue des permissions.

Les headers HSTS, nosniff, Referrer-Policy et Permissions-Policy sont requis en production.
