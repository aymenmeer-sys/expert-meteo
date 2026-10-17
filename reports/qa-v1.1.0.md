# QA v1.1.0

## Couverture ajoutée
- Dashboard et modules principaux.
- Connexion email/password.
- Changement de langue et de modèle météo.
- Manifest PWA.
- Pages SEO `/actualites` et `/villes/paris`.
- Navigation clavier via skip link.

## Vérifications locales
- `pnpm typecheck` : OK.
- `pnpm test:unit` : OK.
- `pnpm build` : OK.
- `git diff --check` : OK.

## À compléter en CI
La matrice Playwright Chromium/Firefox/WebKit et le seuil de couverture globale doivent rester les preuves de référence sur GitHub Actions.
