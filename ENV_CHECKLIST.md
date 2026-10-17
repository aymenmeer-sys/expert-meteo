# Checklist environnement — MétéoExpert v3.0.0

Audit pré-production — 2026-10-17

## Variables requises ou optionnelles

| Variable | Usage | Repli si absente | Statut attendu |
|---|---|---|---|
| `DATABASE_URL` | Neon/Postgres Better Auth + Drizzle | `POSTGRES_PRISMA_URL`, puis `POSTGRES_URL`; build-only placeholder sans requête | Requise en production |
| `DATABASE_URL_UNPOOLED` | Outils/migrations réseau direct | Aucun usage applicatif direct | Recommandée |
| `BETTER_AUTH_SECRET` | Sessions Better Auth | Aucun — erreur explicite | Requise |
| `BETTER_AUTH_URL` | URL canonique auth | URL Vercel, puis localhost en développement | Recommandée en production |
| `STRIPE_SECRET_KEY` | Checkout et portail Stripe côté serveur | Aucun — erreur explicite à l’appel | Requise pour paiements |
| `STRIPE_WEBHOOK_SECRET` | Vérification signature webhook | Réponse 503 contrôlée | Requise pour webhook |
| `STRIPE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe côté client si utilisé | Checkout hébergé sans clé publique | Recommandée |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limiting distribué | Fallback mémoire contrôlé | Recommandées en production |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Notifications push | Fonctionnalité push désactivée | Optionnelle |
| `BLOB_READ_WRITE_TOKEN` | Uploads Blob | Upload indisponible contrôlé | Requise pour uploads |
| `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL` | Origines/base URL Vercel | `BETTER_AUTH_URL` ou localhost | Fournies par Vercel |
| `NODE_ENV` | Sélection des comportements dev/prod | Valeur runtime Next | Fournie par Next |

## Variables détectées mais non utilisées directement

`STRIPE_MCP_KEY`, `STRIPE_PUBLISHABLE_KEY`, `NEON_AUTH_BASE_URL`, `NEON_PROJECT_ID`, `PGDATABASE`, `PGHOST`, `PGHOST_UNPOOLED`, `PGPASSWORD`, `PGUSER`, `POSTGRES_DATABASE`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_URL_NO_SSL`, `POSTGRES_USER`, `REDIS_URL`, `KV_*`, `VITE_NEON_AUTH_URL` sont injectées par les intégrations ou réservées aux outils.

## Résultat audit dépendances

`npm audit` n’a pas pu s’exécuter car le projet utilise pnpm et ne contient pas de `package-lock.json` (`ENOLOCK`). L’équivalent `pnpm audit` a été exécuté: aucune vulnérabilité critique, 24 high, 29 moderate et 6 low transitives. Les avis high sont issus de chaînes indirectes/outillage; aucune correction automatique sûre n’a été appliquée sans mise à niveau majeure.

## Règles de validation

- Ne jamais afficher les valeurs secrètes dans les logs, commits ou rapports.
- Les placeholders Stripe/auth servent uniquement à permettre la collecte de configuration au build; les variables réelles restent obligatoires en production et doivent être vérifiées avant déploiement.
- Les routes doivent répondre avec une erreur JSON contrôlée quand une dépendance est absente.
- Les valeurs numériques géographiques doivent être finies et dans les plages latitude `[-90, 90]`, longitude `[-180, 180]`.
- Les tests doivent être exécutables localement sans dépendre de `CI` pour les suites non destructives.
