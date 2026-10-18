import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { pushSubscriptions } from '@/lib/db/schema'
import { readJson } from '@/lib/http'

const getUserId = async () => (await auth.api.getSession({ headers: await headers() }))?.user?.id ?? null

export const POST = async (request: Request) => {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await readJson<{ endpoint?: string; keys?: { p256dh?: string; auth?: string } }>(request)
  if (!body?.endpoint || !body.keys?.p256dh || !body.keys.auth) return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })
  const existing = await db.select({ id: pushSubscriptions.id }).from(pushSubscriptions).where(eq(pushSubscriptions.endpoint, body.endpoint)).limit(1)
  if (existing[0]) return NextResponse.json({ ok: true, id: existing[0].id })
  const id = randomUUID()
  await db.insert(pushSubscriptions).values({ id, userId, endpoint: body.endpoint, p256dh: body.keys.p256dh, auth: body.keys.auth })
  return NextResponse.json({ ok: true, id }, { status: 201 })
}
