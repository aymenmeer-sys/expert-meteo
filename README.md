# MétéoExpert

Plateforme météo française responsive, accessible et privacy-first, construite avec Next.js App Router, TypeScript, Tailwind CSS et Lucide.

[![CI](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/ci.yml/badge.svg)](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/ci.yml)

## État du projet

Version actuelle : `0.1.0` — fondations UI et gouvernance livrées. La feuille de route complète est documentée dans [`reports/sprint-01-09-roadmap.md`](reports/sprint-01-09-roadmap.md). Les intégrations météo, cartes, alertes, authentification et stockage cloud restent des étapes identifiées, pas des fonctionnalités simulées comme disponibles.

## Fonctionnalités actuelles

- Dashboard météo responsive avec conditions, qualité de l'air, horaires et prévisions.
- Recherche de villes avec autocomplétion locale et sélection clavier.
- Conversion °C/°F et favoris d'interface.
- Navigation responsive, repères d'accessibilité et thème sombre lisible.
- Documentation d'architecture, API, sécurité, onboarding et runbooks.

## Démarrage rapide

```bash
pnpm install
pnpm dev
```

Ouvrir `http://localhost:3000`. Vérifications disponibles :

```bash
pnpm typecheck
pnpm build
```

## Structure

- `app/` : routes App Router et styles globaux.
- `components/` : composants UI réutilisables.
- `docs/` : architecture, API, ADR, sécurité et runbooks.
- `reports/` : rapports de sprint et synthèses.
- `.github/` : CI, CodeQL, modèles de contribution et issues.

## Qualité et sécurité

Les contrôles CI vérifient l'installation reproductible, le typecheck et le build. Les secrets restent dans les variables d'environnement ; consultez [`.env.example`](.env.example). La threat model STRIDE et le plan d'incident sont dans [`docs/security/threat-model.md`](docs/security/threat-model.md) et [`docs/runbooks/api-outage.md`](docs/runbooks/api-outage.md).

## Contribution

Lire [`CONTRIBUTING.md`](CONTRIBUTING.md), respecter Conventional Commits et ouvrir une PR avec le modèle fourni. Le comportement attendu est décrit dans [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Les vulnérabilités doivent être signalées selon [`SECURITY.md`](SECURITY.md).

## Documentation

- [Architecture](docs/architecture.md)
- [Contrat API](docs/api.md)
- [Onboarding](docs/onboarding.md)
- [Glossaire](docs/glossary.md)
- [Conformité légale](docs/legal.md)
- [Changelog](CHANGELOG.md)
- [Licence MIT](LICENSE)

## Déploiement

Le dépôt cible `github.com/aymenmeer-sys/expert-meteo`. Les déploiements Vercel doivent être configurés depuis le projet Vercel connecté au dépôt ; aucune clé ou URL privée n'est committée dans le repository.
