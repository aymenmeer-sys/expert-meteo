# Audit RGAA v1.1.0

## Contrôles réalisés
- Navigation clavier : skip link visible au focus et parcours des contrôles principaux confirmé dans le navigateur.
- Structure : `main`, `header`, titres hiérarchisés et labels accessibles présents sur les contrôles interactifs.
- États asynchrones : météo live exposée avec `role=status` et `aria-live`.
- Mouvement : animations météo désactivées avec `prefers-reduced-motion: reduce`.
- Contraste : palette sombre avec accents cyan/ambre; audit contrastes automatisé à poursuivre.

## Reste à faire
Exécuter axe-core/Lighthouse accessibility sur la preview Vercel et traiter les contrastes ou noms accessibles résiduels.
