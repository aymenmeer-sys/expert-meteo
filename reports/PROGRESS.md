# MétéoExpert — Progression v2.0.0

Dernière mise à jour : 2026-10-17

| Chantier | Statut | Preuve / reste |
|---|---|---|
| 1 — Carte avancée | ✅ Terminé | MapLibre GL, couches vent/radar/température/neige/pression, timeline -3h/+24h, lecture animation |
| 2 — IA & nowcasting | En cours | API Open-Meteo minutely 15, widget pluie 60 min et MétéoBot AI Gateway ajoutés |
| 3 — Dashboard personnalisable | ✅ Terminé | @dnd-kit drag/drop, widgets AQI/lune/soleil/pollen/marin, thèmes Clair/Sombre/Auto/Météo, ordre localStorage explicite | Synchronisation Neon utilisateur connecté à étendre en v2.1 |
| 4 — Communauté & signalements | En cours | Signalements citoyens persistés avec modération pending, validation Zod, rate limiting et upload Blob privé | Carte communautaire, backoffice de modération et diffusion temps réel à poursuivre |
| 5 — API publique & écosystème | En cours | Contrat OpenAPI v2 exposé, page développeurs et endpoint `/api/v2/openapi` ajoutés | Clés API, quotas par client et SDK publics à poursuivre |
| 6 — PWA, polish & release | À faire | — |

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

- Open-Meteo a temporairement répondu « Service météo indisponible »; le fallback applicatif conserve un message contrôlé et l’événement est documenté comme aléa externe.
- Le warning Better Auth de schéma DB est non bloquant; ticket backlog v1.1.1 : `chore: fix Better Auth schema`.

## Backlog v1.1.1

- `chore: fix Better Auth schema`
- Connecter Sentry avec DSN et upload source maps.
- Connecter PostHog avec consentement analytics.
- Traiter les vulnérabilités transitives `proxy-addr` et `serialize-javascript` après validation des parents.
- Remplacer les exceptions CSP inline/eval par nonce Next en production.
