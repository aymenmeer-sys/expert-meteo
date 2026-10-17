# Base de données indisponible

1. Vérifier Neon et `DATABASE_URL` sans afficher les secrets.
2. Vérifier les erreurs Better Auth et les connexions poolées.
3. Suspendre les migrations et préserver les lectures en cache.
4. Restaurer après confirmation Neon, puis exécuter typecheck, unit et smoke tests.
