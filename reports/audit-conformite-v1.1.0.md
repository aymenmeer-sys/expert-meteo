# Audit sécurité et conformité v1.1.0

## Contrôles confirmés
- Headers de défense : nosniff, HSTS, Referrer-Policy, Permissions-Policy, X-Frame-Options, DNS prefetch et CORP.
- CSP report-only conservée pour ne pas casser la preview iframe; les origines Open-Meteo, RainViewer, OpenStreetMap et Météo-France sont déclarées.
- Données utilisateur : endpoints favoris/alertes scoping par session Better Auth; aucune clé fournisseur écrite dans le client.
- Validation externe : les coordonnées spécialisées sont contrôlées par bornes; les fallbacks vigilance n’inventent pas de niveau.

## Reste à faire avant production stricte
- Ajouter rate limiting distribué sur les routes météo/auth avec Upstash.
- Exécuter SCA/Snyk et DAST sur preview publique.
- Passer de CSP report-only à CSP enforced après analyse des rapports de violation.
