# MétéoExpert

Plateforme météo française responsive, accessible et privacy-first avec Next.js App Router, TypeScript, Tailwind CSS et données météo réelles.

[![CI](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/ci.yml/badge.svg)](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/ci.yml) [![CodeQL](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/codeql.yml/badge.svg)](https://github.com/aymenmeer-sys/expert-meteo/actions/workflows/codeql.yml)

## Fonctionnalités v1.1.0

- Dashboard météo, qualité de l’air, prévisions et modules spécialisés.
- Atmosphère adaptative, mode Focus, responsive mobile-first et reduced motion.
- Pages SEO locales, actualités, sitemap, robots et metadata multilingues FR/EN/ES/DE.
- PWA offline, favoris cloud, rate limiting Upstash et headers de sécurité CSP.
- Observabilité JSON serveur, page `/status`, runbooks et workflow OWASP ZAP passif.
- Tests TypeScript, Vitest et Playwright.

## Démarrage

```bash
pnpm install
pnpm dev
```

Vérifications : `pnpm typecheck`, `pnpm test:unit`, `pnpm build`.

## Documentation

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/api.md`](docs/api.md)
- [`docs/runbooks/security.md`](docs/runbooks/security.md)
- [`reports/PROGRESS.md`](reports/PROGRESS.md)
- [`CHANGELOG.md`](CHANGELOG.md)

Les secrets et intégrations sont configurés via les variables d’environnement du projet. Les DSN Sentry/PostHog ne sont pas inventés : leur activation est prévue après connexion des intégrations correspondantes.
