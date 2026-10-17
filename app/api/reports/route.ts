import { randomUUID } from 'node:crypto'
import { desc, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { communityReports } from '@/lib/db/schema'
import { limitRequest } from '@/lib/rate-limit'
import { headers } from 'next/headers'

const reportSchema = z.object({ type: z.enum(['inondation', 'neige', 'vent', 'orage', 'pollution', 'autre']), description: z.string().trim().min(10).max(1000), latitude: z.number().finite().min(-90).max(90), longitude: z.number().finite().min(-180).max(180), photoPathname: z.string().trim().max(300).optional() })
const getUserId = async () => (await auth.api.getSession({ headers: await headers() }))?.user?.id ?? null

export async function GET(request: NextRequest) {
  const rate = await limitRequest(`reports:${request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'}`)
  if (!rate.success) return NextResponse.json({ error: 'Trop de requêtes.' }, { status: 429 })
  const rows = await db.select().from(communityReports).where(eq(communityReports.status, 'approved')).orderBy(desc(communityReports.createdAt)).limit(100)
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Connexion requise.' }, { status: 401 })
  const rate = await limitRequest(`report-submit:${userId}`)
  if (!rate.success) return NextResponse.json({ error: 'Trop de signalements. Réessayez plus tard.' }, { status: 429 })
  const parsed = reportSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Signalement invalide.', issues: parsed.error.flatten() }, { status: 400 })
  const row = await db.insert(communityReports).values({ id: randomUUID(), userId, ...parsed.data, latitude: String(parsed.data.latitude), longitude: String(parsed.data.longitude) }).returning()
  return NextResponse.json(row[0], { status: 201 })
}
