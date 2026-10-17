import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { communityReports } from '@/lib/db/schema'

const session = async () => auth.api.getSession({ headers: await headers() })
const isAdmin = (value: unknown) => typeof value === 'string' && value === 'admin'

export async function GET() {
  const current = await session()
  if (!current?.user || !isAdmin((current.user as { role?: unknown }).role)) return NextResponse.json({ error: 'Accès administrateur requis.' }, { status: 403 })
  const rows = await db.select().from(communityReports).where(eq(communityReports.status, 'pending')).orderBy(desc(communityReports.createdAt))
  return NextResponse.json(rows)
}

export async function PATCH(request: NextRequest) {
  const current = await session()
  if (!current?.user || !isAdmin((current.user as { role?: unknown }).role)) return NextResponse.json({ error: 'Accès administrateur requis.' }, { status: 403 })
  const parsed = z.object({ id: z.string().uuid(), status: z.enum(['approved', 'rejected']) }).safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Décision invalide.' }, { status: 400 })
  const rows = await db.update(communityReports).set({ status: parsed.data.status }).where(eq(communityReports.id, parsed.data.id)).returning()
  return NextResponse.json(rows[0] ?? null)
}
