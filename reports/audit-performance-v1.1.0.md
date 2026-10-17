# Audit performance v1.1.0

## Mesures disponibles
- Dashboard vérifié en preview à 768×683, light mode.
- Carte chargée dynamiquement avec `next/dynamic` et SSR désactivé.
- Service worker avec cache shell et fallback offline.

## À mesurer en production
Lighthouse et Core Web Vitals doivent être exécutés sur l’URL Vercel de production; aucune valeur n’est inventée dans ce rapport. Les seuils de suivi sont LCP ≤ 1,8 s, INP ≤ 100 ms et CLS ≤ 0,05.
