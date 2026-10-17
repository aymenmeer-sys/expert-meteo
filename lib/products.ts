export type PlanId = 'free' | 'premium' | 'api-pro'

export type Plan = { id: PlanId; name: string; description: string; priceInCents: number; interval?: 'month'; features: string[] }

export const PLANS: Plan[] = [
  { id: 'free', name: 'Gratuit', description: 'Les essentiels météo pour commencer.', priceInCents: 0, features: ['1 ville favorite', 'Alertes essentielles'] },
  { id: 'premium', name: 'Premium', description: 'Prévisions avancées et alertes sans limites.', priceInCents: 499, interval: 'month', features: ['Villes illimitées', 'Alertes push illimitées', 'Modèle ECMWF'] },
  { id: 'api-pro', name: 'API Pro', description: 'Données météo pour vos produits.', priceInCents: 1999, interval: 'month', features: ['50 000 requêtes/mois', 'OpenAPI v2', 'Support prioritaire'] },
]

export const getPlan = (id: string) => PLANS.find((plan) => plan.id === id)
