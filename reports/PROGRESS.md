# MétéoExpert — Progression v3.0.0

Dernière mise à jour : 2026-10-17

## Audit pré-production v3.0.0

- Variables et fallbacks audités; `ENV_CHECKLIST.md` généré.
- Checklist environnement produite; validation des APIs et des outils qualité en cours.
- Validation spécialisée durcie sur les plages latitude/longitude et fallback rate limit.
- APIs vérifiées: météo invalide `404`, coordonnées hors plage `400`, OpenAPI `200`, scénario spécialisé valide `200`.
- `pnpm lint`, `pnpm typecheck` et `pnpm build` passent. Le build émet seulement les avertissements Better Auth attendus quand les secrets ne sont pas injectés dans le sandbox.
- `pnpm audit` ne signale aucune vulnérabilité critique; il reste des avis high/moderate transitifs documentés, principalement tooling et dépendances indirectes.
- E2E Playwright préparés et tests API/manifest passés; exécution navigateur bloquée dans le sandbox par `libnspr4.so` manquante, hors code projet.
- Artefacts Playwright ignorés et nettoyage poussé sur `main` (`69e4394`).

## Correctif production — menu compte et météo

- Menu utilisateur rendu explicite pour les états pending, connecté et déconnecté.
- Modèle `best_match` retiré de la query Open-Meteo : il est le défaut et ne doit pas être envoyé dans `models`.
- Fetch client météo traite désormais les réponses HTTP d’erreur comme des erreurs SWR visibles.
- Header global sans logo ni barre doublon; il conserve uniquement le menu de compte superposé, avec Connexion pendant le chargement ou hors session.
- Page `/compte` convertie en garde client avec `useSession`, état de chargement et redirection contrôlée.
- `nextCookies()` désactivé temporairement comme demandé; `app/global-error.tsx` recharge une fois les erreurs de chunk.
- Vercel contient bien `BETTER_AUTH_URL` en Production, mais sa valeur est chiffrée et ne peut pas être vérifiée en clair via `vercel env ls`.
- Auth stabilisée sans `nextCookies()`; `/compte` est maintenant une Server Component protégée par `auth.api.getSession({ headers: await headers() })`, avec `AccountClient` pour l’hydratation et l’écoute client. Les erreurs serveur sont journalisées avec message et stack sans exposer de détail à l’utilisateur.
- Page `/compte` convertie en Client Component, avec spinner pendant `isPending` et redirection `router.replace('/sign-in')` différée après chargement.
- Middleware `middleware.ts` ajouté avec vérification cookie-only via `getSessionCookie(request)` sur `/compte/:path*`; l’autorisation réelle reste portée par Better Auth.
- `BETTER_AUTH_URL` est incluse explicitement dans `trustedOrigins`.
- Page `/compte` alignée sur le composant client demandé avec `mounted`, `isPending` et redirection différée.
- Middleware minimal restauré avec `getSessionCookie(request)` et exemption des préchargements Next.js; aucun appel base de données ni validation Better Auth dans Edge.
- Page admin auth marquée `force-dynamic` pour empêcher un accès Neon/Better Auth pendant le build Vercel.
- Secret Better Auth sans fallback permissif en production : l’absence de `BETTER_AUTH_SECRET` échoue explicitement au runtime.
- Logout sécurisé sur `/compte` et dans le menu : état de chargement, double-clic bloqué, gestion d’erreur et navigation native `window.location.replace('/')` après suppression de session, sans `router.refresh()` concurrent avec la mise à jour Better Auth.
- Correction du crash Base UI au logout : `DropdownMenuItem` conserve une seule sémantique interactive native avec `onClick` et `disabled`, sans composition de bouton dans `render`.
- Service worker versionné `v6` et purge des anciens caches pour éviter de servir un document HTML à la place d’un module JS; le cache ne doit plus réutiliser les anciens assets.
- CSP élargie pour les tuiles OpenStreetMap/RainViewer, APIs météo, WebSocket Vercel et workers `blob:`; CORP passe à `cross-origin` pour autoriser les ressources cartographiques.
- Service worker ignore désormais toutes les requêtes cross-origin afin de ne pas intercepter les tuiles ou workers externes.
- Fichier `.env.example` créé avec toutes les variables d’environnement disponibles, sans exposer leurs valeurs secrètes.
- Better Auth utilise `BETTER_AUTH_URL` ou `NEXT_PUBLIC_APP_URL` comme baseURL de production, avec normalisation de l’origine.
- CI initialise désormais le PostgreSQL de service via `drizzle-kit push --force` avant le build et les tests Playwright, afin de créer les tables Better Auth et applicatives.
- Playwright CI limité à Chromium avec SwiftShader/WebGL activé : Firefox/WebKit échouaient sur les runners sans GPU et masquaient les erreurs fonctionnelles réelles.
- Test de recherche rendu non ambigu (`Lyon, France` exact) et Playwright CI séquentiel (`--workers=1`) pour éviter les collisions d’état avec l’authentification et le PostgreSQL partagé.
- `/compte` reste un Client Component pur avec `mounted`, `isPending` et redirection client différée.
- Boundary local `/compte/error.tsx` ajouté pour éviter l’écran générique et proposer Réessayer/Connexion si un runtime error survient.
- `useSession` exporté explicitement depuis `lib/auth-client.ts`.

| Chantier | Statut | Preuve |
|---|---|---|
| 1 — Stripe & SaaS | ✅ Terminé | `/tarifs`, Checkout récurrent, portail client, webhook et table subscriptions |
| 2 — Route Weather | ✅ Terminé | `/itineraire`, géocodage Nominatim, routage OSRM, étapes de trajet |
| 3 — Immersif 3D | ✅ Terminé | `/immersif`, globe React Three Fiber et contrôles orbitaux |
| 4 — Domotique & calendrier | ✅ Terminé | Webhooks développeurs et `/api/calendar/weather.ics` |
| 5 — Data-viz & release | ✅ Terminé | `/climat`, historique Open-Meteo, rapport v3.0.0 |

## Progression v2.0.0

Dernière mise à jour : 2026-10-17

| Chantier | Statut | Preuve / reste |
|---|---|---|
| 1 — Carte avancée | ✅ Terminé | MapLibre GL, couches vent/radar/température/neige/pression, timeline -3h/+24h, lecture animation |
| 2 — IA & nowcasting | En cours | API Open-Meteo minutely 15, widget pluie 60 min et MétéoBot AI Gateway ajoutés |
| 3 — Dashboard personnalisable | ✅ Terminé | @dnd-kit drag/drop, widgets AQI/lune/soleil/pollen/marin, thèmes Clair/Sombre/Auto/Météo, ordre localStorage explicite | Synchronisation Neon utilisateur connecté à étendre en v2.1 |
| 4 — Communauté & signalements | ✅ Terminé | Signalements citoyens, upload Blob privé, carte MapLibre publique des signalements approuvés et `/admin/moderation` protégé admin | Diffusion temps réel reportée v2.1 |
| 5 — API publique & écosystème | ✅ Terminé | Contrat OpenAPI v2 exposé, page développeurs et endpoint `/api/v2/openapi` ajoutés | Clés API/quotas clients reportés v2.1 |
| 6 — PWA, polish & release | ✅ Terminé | Manifest enrichi, service worker v5, fallback IA hors clé, mode aventure/pro et thèmes existants vérifiés | Migration SQL à exécuter sur Neon avant données réelles; release v2.0.0 en cours |

## Historique v1.1.0


Dernière mise à jour : 2026-10-17

| Chantier | Statut | Preuve / reste |
|---|---|---|
| 1 — Design & UX | ✅ Terminé | Atmosphère météo, mode Focus, reduced motion, screenshot navigateur |
| 2 — Performance | En cours | Dynamic imports et cache; Lighthouse production à exécuter |
| 3 — SEO & contenu | En cours | Sitemap, robots, actualités et pages villes; Search Console à valider |
| 4 — Accessibilité | En cours | Skip link, aria-live, rapport RGAA; axe/contraste à exécuter |
| 5 — Tests & qualité | En cours | Playwright et checklist QA; couverture globale à confirmer |
| 6 — Sécurité & conformité | ✅ Terminé | Upstash rate limit, CSP enforced, ZAP workflow, rapports SCA/CSP; critical pnpm audit supprimée par overrides testés | High transitive de tooling reste tracée pour v1.1.1 |
| 7 — Observabilité | Partiel | Logger JSON, status, runbooks; Sentry/PostHog non connectés et reportés v1.1.1 | Connexions intégrations nécessaires avant ✅ |
| 8 — i18n & release | Partiel | Alternates et fichiers messages FR/EN/ES/DE; rapports et changelog v1.1.0 générés | Switcher runtime, CI distante, déploiement et release à publier |

## Aléas

- Open-Meteo a temporairement répondu « Service météo indisponible »; le fallback applicatif conserve un message contr��lé et l’événement est documenté comme aléa externe.
- Le warning Better Auth de schéma DB est non bloquant; ticket backlog v1.1.1 : `chore: fix Better Auth schema`.

## Backlog v1.1.1

- `chore: fix Better Auth schema`
- Connecter Sentry avec DSN et upload source maps.
- Connecter PostHog avec consentement analytics.
- Traiter les vulnérabilités transitives `proxy-addr` et `serialize-javascript` après validation des parents.
- Remplacer les exceptions CSP inline/eval par nonce Next en production.
