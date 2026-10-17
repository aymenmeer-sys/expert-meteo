import { generateText, tool } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const weatherTool = tool({
  description: 'Fetch current and tomorrow weather for a city using Open-Meteo geocoding and forecast APIs.',
  inputSchema: z.object({ city: z.string().min(2).max(80) }),
  execute: async ({ city }) => {
    const search = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`)
    const place = (await search.json()).results?.[0]
    if (!place) return { error: 'Ville introuvable' }
    const params = new URLSearchParams({ latitude: String(place.latitude), longitude: String(place.longitude), current: 'temperature_2m,precipitation,weather_code,wind_speed_10m', daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code', forecast_days: '2', timezone: 'auto' })
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
    const weather = await response.json()
    return { city: place.name, country: place.country, current: weather.current, tomorrow: { max: weather.daily?.temperature_2m_max?.[1], min: weather.daily?.temperature_2m_min?.[1], rainProbability: weather.daily?.precipitation_probability_max?.[1], code: weather.daily?.weather_code?.[1] } }
  },
})

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { message?: unknown } | null
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 500) : ''
  if (!message) return Response.json({ error: 'Message requis' }, { status: 400 })
  const result = await generateText({ model: 'openai/o4-mini', system: 'Tu es MétéoBot, un assistant météo précis et concis. Utilise weatherTool dès qu’une ville ou une prévision est mentionnée. Réponds en français, avec des conseils pratiques.', prompt: message, tools: { weatherTool }, stopWhen: ({ steps }) => steps.length >= 3 })
  return Response.json({ text: result.text })
}
