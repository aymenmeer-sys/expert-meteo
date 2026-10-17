# Chantier communauté v2.0

- POST `/api/reports` protégé par Better Auth, Zod et rate limiting Upstash.
- Signalements stockés en base avec statut `pending`; seuls les éléments `approved` sont publics.
- Upload photos JPEG/PNG/WebP limité à 5 Mo dans Blob privé.
- À poursuivre : modération admin, carte publique et notifications temps réel.
