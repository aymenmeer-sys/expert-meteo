# Architecture

MétéoExpert utilise Next.js App Router, TypeScript strict et Tailwind CSS. La page principale est un composant client pour les interactions immédiates ; les futures données météo seront servies par des Route Handlers avec validation, cache et limitation de débit.

## Flux cible
1. SearchBar résout une ville via géocodage Open-Meteo.
2. `/api/weather` récupère les données avec timeout et fallback.
3. TanStack Query gère cache et invalidation côté client.
4. Les modules spécialisés sont chargés à la demande.
5. Les événements anonymisés alimentent l'observabilité privacy-first.

## Principes
- Pas de secret côté client.
- Données et identifiants utilisateur toujours scopés côté serveur.
- Progressive enhancement et accessibilité RGAA.
- Headers de sécurité centralisés dans la configuration Next.js.
