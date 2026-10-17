import { randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'

const schema = z.object({ url: z.string().url(), events: z.array(z.string()).min(1).max(10) })

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'URL ou événements invalides' }, { status: 400 })
  return NextResponse.json({ id: randomUUID(), userId: session.user.id, ...parsed.data, status: 'active', createdAt: new Date().toISOString() }, { status: 201 })
}
