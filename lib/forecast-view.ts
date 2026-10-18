type Hourly = { time: string[]; temperature_2m: number[]; precipitation_probability: number[] }
type Daily = { time?: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[] }

// /api/weather requests past_days=7, so hourly/daily arrays start 7 days in the past.
// Realign them on the current local time (current.time is "YYYY-MM-DDTHH:mm" in the place's timezone).
export const alignForecast = <D extends Daily>(input: { current?: { time?: string }; hourly?: Hourly; daily?: D }) => {
  const now = input.current?.time
  const hourIndex = input.hourly && now ? input.hourly.time.findIndex((time) => time.startsWith(now.slice(0, 13))) : -1
  const dayIndex = input.daily?.time && now ? input.daily.time.indexOf(now.slice(0, 10)) : -1
  const hs = Math.max(0, hourIndex)
  const ds = Math.max(0, dayIndex)
  const { hourly, daily } = input
  return {
    hourly: hourly ? { time: hourly.time.slice(hs), temperature_2m: hourly.temperature_2m.slice(hs), precipitation_probability: hourly.precipitation_probability.slice(hs) } : undefined,
    daily: daily ? { ...daily, temperature_2m_max: daily.temperature_2m_max.slice(ds), temperature_2m_min: daily.temperature_2m_min.slice(ds), precipitation_probability_max: daily.precipitation_probability_max.slice(ds) } : undefined,
    pastMax: daily ? daily.temperature_2m_max.slice(0, ds) : [],
  }
}
