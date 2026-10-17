import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { limitRequest } from '@/lib/rate-limit'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return NextResponse.json({ error: 'Connexion requise.' }, { status: 401 })
  const rate = await limitRequest(`report-upload:${session.user.id}`)
  if (!rate.success) return NextResponse.json({ error: 'Trop d’uploads. Réessayez plus tard.' }, { status: 429 })
  const file = (await request.formData()).get('file')
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Image JPEG, PNG ou WebP de 5 Mo maximum.' }, { status: 400 })
  const blob = await put(`reports/${session.user.id}/${crypto.randomUUID()}`, file, { access: 'private', addRandomSuffix: false })
  return NextResponse.json({ pathname: blob.pathname }, { status: 201 })
}
