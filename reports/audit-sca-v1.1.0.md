# Audit SCA v1.1.0

- Commande : `pnpm audit` (le dépôt n’a pas de package-lock npm, donc `npm audit` est non applicable).
- Résultat initial : 1 critical, 29 high, 30 moderate, 6 low sur l’arbre transitif.
- Critical principal : `proxy-addr` via `shadcn`/MCP Express; high principal : `serialize-javascript` via `next-pwa`/Workbox.
- Action : mise à jour directe des dépendances applicatives et remplacement des chaînes transitives lorsqu’un parent fournit un correctif; les packages de tooling shadcn/next-pwa restent à traiter dans le backlog v1.1.1 si aucun correctif compatible n’est disponible.
- Aucun `pnpm audit --fix` forcé n’est appliqué automatiquement afin d’éviter une migration majeure non testée.
- Suivi : verrouiller les versions corrigées dans la prochaine maintenance et publier le rapport d’audit CI.
