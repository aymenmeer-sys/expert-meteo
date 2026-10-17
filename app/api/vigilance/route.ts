import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch('https://vigilance.meteofrance.fr/data/vigilance.json', { next: { revalidate: 900 } })
  if (!response.ok) return NextResponse.json({ available: false, departments: [] }, { status: 200 })
  const data: unknown = await response.json()
  return NextResponse.json({ available: true, source: 'Météo-France', data })
}
