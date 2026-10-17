import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { favorites } from '@/lib/db/schema'
import { headers } from 'next/headers'

async function userId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id ?? null }
export async function GET() { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await db.select().from(favorites).where(eq(favorites.userId, id))) }
export async function POST(request: NextRequest) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json() as { city?: string; latitude?: number; longitude?: number }; if (!body.city || !Number.isFinite(body.latitude) || !Number.isFinite(body.longitude)) return NextResponse.json({ error: 'Invalid favorite' }, { status: 400 }); const row = { id: randomUUID(), userId: id, city: body.city, latitude: String(body.latitude), longitude: String(body.longitude) }; return NextResponse.json((await db.insert(favorites).values(row).returning())[0], { status: 201 }) }
export async function DELETE(request: NextRequest) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const favoriteId = request.nextUrl.searchParams.get('id'); if (!favoriteId) return NextResponse.json({ error: 'Missing id' }, { status: 400 }); await db.delete(favorites).where(and(eq(favorites.id, favoriteId), eq(favorites.userId, id))); return NextResponse.json({ ok: true }) }
