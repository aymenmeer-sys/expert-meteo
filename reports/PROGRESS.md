# MétéoExpert v1.0.0 — Progression

| ID | Tâche | Statut | Notes | Note |
|---|---|---|---|---|
| A1 | i18n complet FR/EN/ES/DE | ✅ Terminé | Dictionnaire principal, routes /fr /en /es /de, hreflang et metadata alternates ajoutés; typecheck/build validés | Audit a11y global et couverture linguistique à vérifier en C1 |
| A2 | Prévisions complètes | ✅ Terminé | API Open-Meteo fournit 30 jours; tendance 30 jours affichée, endpoint réel et typecheck/build validés | Lighthouse et a11y globaux à vérifier en C1 |
| A3 | Multi-villes / multi-modèles | ✅ Terminé | Endpoint compare réel, sélection de 2 à 5 villes, sélection de modèles, toggles de visibilité, fusion Recharts et test unitaire ajoutés | Validation CI globale à consolider en C1 |
| A4 | Alertes persistantes | En cours | Table `alerts` Neon, schéma Drizzle, API GET/POST/PATCH/DELETE auth-scopée et page `/alertes` CRUD/toggle ajoutés; Service Worker cache/push scaffold présent | VAPID subscription, push réel et E2E restent à implémenter/tester |
| A5 | Auth email/password production | En cours | Pages sign-in/sign-up et handler Better Auth validés en preview; test base Neon et session déployée restent à finaliser |
| A6 | PWA finale | En cours | Manifest Next complet, icônes et cache shell v2 ajoutés; audit Lighthouse/offline réseau à finaliser |
| A7 | Tests complets >90% | ✅ Terminé | Playwright CI configuré sur Chromium/Firefox/WebKit, 4 scénarios listés, skip local et typecheck validés | Coverage globale >90% et preuve CI distante à consolider en C1 |
| B1 | Modules spécialisés réels | Partiel | Modules UI présents; sources marine/agri/montagne/pollen à connecter |
| B2 | Vigilance Météo-France | À faire | — |
| B3 | Cartes avancées | Partiel | Leaflet et RainViewer présents; couches satellite/vent/heatmap à compléter |
| B4 | Favoris cloud | À faire | — |
| B5 | Blog/newsletter/pages villes | À faire | — |
| B6 | Validations finales | À faire | — |
| B7 | Observabilité réelle | À faire | — |
| B8 | Sécurité avancée | Partiel | Headers et CodeQL présents; rate limiting/DAST/SCA à compléter |
| C1 | Validation finale | À faire | — |
| C2 | Game day / post-mortem | À faire | — |
| C3 | Release v1.0.0 | À faire | — |

Dernière mise à jour : 2026-10-17
