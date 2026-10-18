import { randomUUID } from 'node:crypto'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { alerts } from '@/lib/db/schema'
import { readJson } from '@/lib/http'

const getUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  return session.user.id
}

export const GET = async () => {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await db.select().from(alerts).where(eq(alerts.userId, userId)).orderBy(desc(alerts.createdAt)))
}

export const POST = async (request: Request) => {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await readJson<{ city?: unknown; threshold?: unknown; type?: unknown }>(request)
  const city = typeof body?.city === 'string' ? body.city.trim() : ''
  const type = typeof body?.type === 'string' ? body.type.trim() : ''
  if (!city || city.length > 80 || !['rain', 'temperature', 'wind'].includes(type) || typeof body?.threshold !== 'number' || !Number.isFinite(body.threshold) || Math.abs(body.threshold) > 100000) return NextResponse.json({ error: 'Invalid alert' }, { status: 400 })
  const [alert] = await db.insert(alerts).values({ id: randomUUID(), userId, city, threshold: String(body.threshold), type }).returning()
  return NextResponse.json(alert, { status: 201 })
}

export const PATCH = async (request: Request) => {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await readJson<{ id?: string; active?: boolean }>(request)
  if (!body?.id || typeof body.active !== 'boolean') return NextResponse.json({ error: 'Invalid alert' }, { status: 400 })
  const [alert] = await db.update(alerts).set({ active: body.active, updatedAt: new Date() }).where(and(eq(alerts.id, body.id), eq(alerts.userId, userId))).returning()
  return alert ? NextResponse.json(alert) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export const DELETE = async (request: Request) => {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Invalid alert' }, { status: 400 })
  await db.delete(alerts).where(and(eq(alerts.id, id), eq(alerts.userId, userId)))
  return new NextResponse(null, { status: 204 })
}
