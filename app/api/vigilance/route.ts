import { NextResponse } from 'next/server'

const fallback = {
  available: false,
  source: 'Météo-France indisponible',
  message: 'Source indisponible — niveaux de vigilance non confirmés.',
  departments: [],
}

export async function GET() {
  const sources = [
    'https://public-api.meteofrance.fr/public/DPVigilance/v1/cartevigilance/encours',
    'https://vigilance.meteofrance.fr/data/vigilance.json',
  ]
  for (const source of sources) {
    try {
      const response = await fetch(source, { next: { revalidate: 900 }, signal: AbortSignal.timeout(6000) })
      if (response.ok) return NextResponse.json({ available: true, source: 'Météo-France', data: await response.json() })
    } catch (error) {
      console.warn('[v0] vigilance source unavailable', source, error instanceof Error ? error.message : 'unknown')
    }
  }
  return NextResponse.json(fallback, { status: 200 })
}
