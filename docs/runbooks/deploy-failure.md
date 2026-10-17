# Déploiement en échec

1. Identifier le commit et l’étape CI fautive.
2. Reproduire localement avec `pnpm typecheck`, `pnpm test:unit` et `pnpm build`.
3. Ne pas promouvoir une preview défaillante.
4. Corriger sur une branche courte, valider, puis relancer le déploiement.
5. Documenter la cause et le rollback dans le post-mortem.
