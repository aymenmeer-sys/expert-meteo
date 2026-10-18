import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { favorites } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { readJson } from '@/lib/http'

async function userId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id ?? null }
export async function GET() { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await db.select().from(favorites).where(eq(favorites.userId, id))) }
export async function POST(request: NextRequest) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await readJson<{ city?: unknown; latitude?: unknown; longitude?: unknown }>(request); const city = typeof body?.city === 'string' ? body.city.trim() : ''; const lat = body?.latitude; const lon = body?.longitude; if (!city || city.length > 80 || typeof lat !== 'number' || typeof lon !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return NextResponse.json({ error: 'Invalid favorite' }, { status: 400 }); const duplicate = await db.select({ id: favorites.id }).from(favorites).where(and(eq(favorites.userId, id), eq(favorites.city, city))).limit(1); if (duplicate[0]) return NextResponse.json({ error: 'Already a favorite' }, { status: 409 }); const row = { id: randomUUID(), userId: id, city, latitude: String(lat), longitude: String(lon) }; return NextResponse.json((await db.insert(favorites).values(row).returning())[0], { status: 201 }) }
export async function DELETE(request: NextRequest) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const favoriteId = request.nextUrl.searchParams.get('id'); if (!favoriteId) return NextResponse.json({ error: 'Missing id' }, { status: 400 }); await db.delete(favorites).where(and(eq(favorites.id, favoriteId), eq(favorites.userId, id))); return NextResponse.json({ ok: true }) }
