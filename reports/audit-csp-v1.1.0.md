# Audit CSP v1.1.0

La CSP est maintenant envoyée en mode enforced via `Content-Security-Policy`.

- `default-src 'self'`
- Images : self, data et HTTPS
- Styles : self et inline nécessaire au rendu Tailwind/Next
- Scripts : self, inline et eval requis par le runtime Next preview
- Connexions : self, Open-Meteo, Air Quality, OpenStreetMap tiles, RainViewer et Météo-France
- Fonts : self et data

La politique est volontairement documentée avec les exceptions runtime nécessaires. Toute suppression de `unsafe-inline`/`unsafe-eval` devra être validée avec nonce Next en production.
