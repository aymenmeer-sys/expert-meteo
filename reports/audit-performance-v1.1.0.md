# Audit performance v1.1.0

## Mesures disponibles
- Dashboard vérifié en preview à 768×683, light mode.
- Carte chargée dynamiquement avec `next/dynamic` et SSR désactivé.
- Service worker avec cache shell et fallback offline.

## Mesures navigateur disponibles
- Mesure locale navigateur : TTFB 74,8 ms, FCP 212 ms, LCP 212 ms, CLS 0 sur `/` en viewport 768×683, light mode, développement.
- Optimisations ajoutées : chargement différé de la carte, du graphique et du radar; cache serveur `revalidate` conservé sur les APIs météo.

## À mesurer en production
Lighthouse et Core Web Vitals doivent être exécutés sur l’URL Vercel de production; les valeurs locales ne remplacent pas cette mesure. Les seuils de suivi sont LCP ≤ 1,8 s, INP ≤ 100 ms et CLS ≤ 0,05.
