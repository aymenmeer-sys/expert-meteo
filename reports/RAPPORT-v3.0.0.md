# Rapport MétéoExpert v3.0.0

## Livraison

- Stripe Checkout récurrent, portail client et webhook sécurisé pour les abonnements.
- Planificateur d’itinéraire météo basé sur Nominatim et OSRM.
- Globe 3D interactif React Three Fiber.
- Générateur de webhooks domotiques et flux iCal météo.
- Historique climatique Open-Meteo sur cinquante ans, agrégé par année et tracé avec Recharts.

## Validation

- `pnpm typecheck` : OK
- `pnpm test:unit` : OK
- `git diff --check` : OK

## Notes de production

Les clés Stripe et le secret webhook doivent être configurés dans les variables d’environnement Production. Le webhook doit pointer vers `/api/webhooks/stripe` et vérifier la signature Stripe avant toute écriture d’abonnement.
