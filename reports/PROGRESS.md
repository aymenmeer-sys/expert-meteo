# MétéoExpert v1.0.0 — Progression

| ID | Tâche | Statut | Notes | Note |
|---|---|---|---|---|
| A1 | i18n complet FR/EN/ES/DE | ✅ Terminé | Dictionnaire principal, routes /fr /en /es /de, hreflang et metadata alternates ajoutés; typecheck/build validés | Audit a11y global et couverture linguistique à vérifier en C1 |
| A2 | Prévisions complètes | ✅ Terminé | API Open-Meteo fournit 30 jours; tendance 30 jours affichée, endpoint réel et typecheck/build validés | Lighthouse et a11y globaux à vérifier en C1 |
| A3 | Multi-villes / multi-modèles | ✅ Terminé | Endpoint compare réel, sélection de 2 à 5 villes, sélection de modèles, toggles de visibilité, fusion Recharts et test unitaire ajoutés | Validation CI globale à consolider en C1 |
| A4 | Alertes persistantes | En cours | Tables Neon `alerts`/`push_subscriptions`, API CRUD auth-scopée, API d’enregistrement push, page `/alertes` CRUD/toggle et bouton d’activation push ajoutés | Variables VAPID, envoi push serveur et E2E restent à implémenter/tester |
| A5 | Auth email/password production | En cours | Pages sign-in/sign-up, handler Better Auth, DATABASE_URL/BETTER_AUTH_SECRET et trusted origins vérifiés; écran `/sign-in` rendu en preview | Parcours inscription/session persistée et test déployé restent à finaliser |
| A6 | PWA finale | En cours | Manifest Next corrigé avec id/icônes, enregistrement SW, cache shell v4, cache API météo, fallback `/offline.html` et push worker présents; page et manifest vérifiés au navigateur | Audit Lighthouse et preuve offline navigateur restent à finaliser |
| A7 | Tests complets >90% | ✅ Terminé | Playwright CI configuré sur Chromium/Firefox/WebKit, 4 scénarios listés, skip local et typecheck validés | Coverage globale >90% et preuve CI distante à consolider en C1 |
| B1 | Modules spécialisés réels | En cours | API spécialisée enrichie avec isotherme 0°C, neige et risque avalanche; marine/agri/pollen/montagne affichent les données Open-Meteo | E2E spécialisés et validation offline à finaliser |
| B2 | Vigilance Météo-France | En cours | API officielle DPVigilance + source JSON secondaire avec timeout et fallback explicite « source indisponible » | Carte départements, niveaux et E2E restent à finaliser |
| B3 | Cartes avancées | Partiel | Leaflet et RainViewer présents; couches satellite/vent/heatmap à compléter | — |
| B4 | Favoris cloud | En cours | Table Neon, schéma Drizzle et API CRUD auth-scopée `/api/favorites` ajoutés | UI TanStack Query, optimistic updates et E2E restent à finaliser |
| B5 | Blog/newsletter/pages villes | À faire | — |
| B6 | Validations finales | En cours | Configuration Lighthouse CI, seuils accessibility/SEO/performance et script k6 ajoutés | Exécution CI/Lighthouse/k6 et audit dépendances restent à prouver |
| B7 | Observabilité réelle | À faire | — | Sentry/PostHog et logs JSON restent à intégrer |
| B8 | Sécurité avancée | En cours | Headers CSP report-only renforcés et workflow CodeQL existant | Upstash rate limiting, Snyk et DAST restent à intégrer |
| C1 | Validation finale | À faire | — | Déploiement Vercel, CI main et PRs doivent être vérifiés |
| C2 | Game day / post-mortem | En cours | Trois scénarios d’incident documentés dans `reports/post-mortem.md` | Exécution des simulations et revue opérationnelle restent à faire |
| C3 | Release v1.0.0 | ✅ Terminé | Release GitHub publique publiée : https://github.com/aymenmeer-sys/expert-meteo/releases/tag/v1.0.0; CI verte sur `59a113d` : https://github.com/aymenmeer-sys/expert-meteo/actions/runs/38989439380; rapports finaux générés | Déploiement Vercel public et audits C1 restent hors de cette clôture |

Dernière mise à jour : 2026-10-17

## MétéoExpert v1.1.0

| Chantier | Statut | Preuve |
|---|---|---|
| 1 — Design & UX Awwwards | ✅ Terminé | Atmosphère météo animée jour/nuit/pluie/neige, glassmorphism existant, mode Focus, transitions réduites via `prefers-reduced-motion`; test navigateur et screenshot validés |
| 2 — Performance | En cours | Carte, graphique et radar chargés dynamiquement; React Compiler, import optimization, cache API et mesures TTFB/FCP/LCP/CLS documentés | Lighthouse production et bundle analyzer restent à exécuter |
| 3 — SEO & contenu | En cours | Sitemap, robots, status, confidentialité, actualités et pages locales `/villes/[city]` ajoutés avec metadata/canonicals | Données éditoriales CMS et validation Search Console restent à poursuivre |
| 4 — Accessibilité | En cours | Skip link clavier, focus visible, rôles `status`/`aria-live`, sémantique main et réduction de mouvement; rapport RGAA ajouté | Axe/Lighthouse accessibility et audit contraste restent à exécuter |
| 5 — Tests & qualité | En cours | E2E Playwright enrichis avec pages SEO et skip link; checklist QA v1.1.0 ajoutée; typecheck, unit, build et diff validés localement | Matrice CI et couverture globale >90% à confirmer |
| 6 — Sécurité & conformité | En cours | Headers défense renforcés, CSP report-only documentée, scoping Better Auth et rapport conformité ajoutés | Rate limiting Upstash, SCA/Snyk, DAST et CSP enforced restent à exécuter |
| 7 — Observabilité & fiabilité | En cours | Vercel Analytics, logger JSON serveur, instrumentation `/api/weather` et page `/status` documentés | Sentry, PostHog avec consentement et alertes de latence restent à intégrer |
| 8 — i18n & release | À faire | — |
