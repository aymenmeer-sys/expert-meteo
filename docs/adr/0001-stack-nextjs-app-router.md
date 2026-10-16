# ADR 0001 — Stack Next.js App Router

## Décision
Adopter Next.js App Router + TypeScript strict + Tailwind CSS + Lucide.

## Raisons
SSR/streaming disponibles, conventions de routing explicites, intégration Vercel native et faible coût opérationnel.

## Alternatives écartées
- SPA Vite : moins adapté aux besoins SEO et routes serveur.
- Pages Router : moins aligné avec la cible Next.js actuelle.
- UI propriétaire : dette d'accessibilité supérieure à shadcn/Radix.
