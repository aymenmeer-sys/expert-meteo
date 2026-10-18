import { describe, expect, it } from 'vitest'
import { alignForecast } from './forecast-view'

const days = ['2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14']
const hours = days.flatMap((d) => Array.from({ length: 24 }, (_, h) => `${d}T${String(h).padStart(2, '0')}:00`))

describe('alignForecast', () => {
  const payload = {
    current: { time: '2026-10-13T10:15' },
    hourly: { time: hours, temperature_2m: hours.map((_, i) => i), precipitation_probability: hours.map(() => 0) },
    daily: { time: days, temperature_2m_max: [10, 11, 12, 13], temperature_2m_min: [1, 2, 3, 4], precipitation_probability_max: [0, 0, 0, 0] },
  }
  it('starts hourly at the current hour and daily at today', () => {
    const view = alignForecast(payload)
    expect(view.hourly?.time[0]).toBe('2026-10-13T10:00')
    expect(view.daily?.temperature_2m_max[0]).toBe(12)
    expect(view.pastMax).toEqual([10, 11])
  })
  it('keeps arrays untouched when current.time is missing', () => {
    const view = alignForecast({ ...payload, current: undefined })
    expect(view.daily?.temperature_2m_max).toHaveLength(4)
    expect(view.pastMax).toEqual([])
  })
})
