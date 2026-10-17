# Audit rate limiting v1.1.0

- Integration vérifiée : Upstash for Redis connecté au projet.
- SDK installé : `@upstash/ratelimit` et `@upstash/redis`.
- Route protégée : `GET /api/weather`.
- Algorithme : sliding window, 60 requêtes par minute et par IP proxy.
- Réponse de dépassement : HTTP 429 avec `Retry-After`.
- Fallback contrôlé : si les variables Upstash ne sont pas injectées, la route reste disponible sans limiter; la configuration de production doit fournir `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`.
