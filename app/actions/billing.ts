'use server'

import { randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getPlan } from '@/lib/products'

const getCurrentUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export const createCheckoutSession = async (planId: string) => {
  const user = await getCurrentUser()
  const plan = getPlan(planId)
  if (!plan || !plan.interval || plan.priceInCents <= 0) throw new Error('Invalid paid plan')
  const origin = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price_data: { currency: 'eur', product_data: { name: plan.name, description: plan.description }, unit_amount: plan.priceInCents, recurring: { interval: plan.interval } }, quantity: 1 }],
    success_url: `${origin}/compte/abonnement?success=1`,
    cancel_url: `${origin}/tarifs?canceled=1`,
    metadata: { userId: user.id, planId, requestId: randomUUID() },
    subscription_data: { metadata: { userId: user.id, planId } },
  })
  return session.url
}

export const createPortalSession = async () => {
  const user = await getCurrentUser()
  const customer = await stripe.customers.list({ email: user.email, limit: 1 })
  const existing = customer.data[0]
  if (!existing) throw new Error('No Stripe customer found')
  const origin = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
  const session = await stripe.billingPortal.sessions.create({ customer: existing.id, return_url: `${origin}/compte/abonnement` })
  return session.url
}
