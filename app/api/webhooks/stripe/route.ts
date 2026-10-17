import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { subscriptions } from '@/lib/db/subscriptions'
import { stripe } from '@/lib/stripe'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !secret) return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 })
  let event
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, secret) } catch (error) { console.error('[stripe] webhook signature failed', error); return NextResponse.json({ error: 'Invalid signature' }, { status: 400 }) }
  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    const subscription = event.data.object
    const userId = subscription.metadata.userId
    const plan = subscription.metadata.planId ?? 'premium'
    const currentPeriodEnd = subscription.items.data[0]?.current_period_end ? new Date(subscription.items.data[0].current_period_end * 1000) : null
    if (userId) await db.insert(subscriptions).values({ id: subscription.id, userId, stripeCustomerId: String(subscription.customer), stripeSubscriptionId: subscription.id, status: subscription.status, plan, cancelAtPeriodEnd: subscription.cancel_at_period_end, currentPeriodEnd }).onConflictDoUpdate({ target: subscriptions.stripeSubscriptionId, set: { status: subscription.status, plan, cancelAtPeriodEnd: subscription.cancel_at_period_end, currentPeriodEnd, updatedAt: new Date() } })
  }
  if (event.type === 'customer.subscription.deleted') await db.update(subscriptions).set({ status: 'canceled', updatedAt: new Date() }).where(eq(subscriptions.stripeSubscriptionId, event.data.object.id))
  return NextResponse.json({ received: true })
}
