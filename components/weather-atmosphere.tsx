'use client'

import { useMemo } from 'react'

type WeatherAtmosphereProps = {
  weatherCode?: number
  isDay?: boolean
}

const getMode = (weatherCode: number, isDay: boolean) => {
  if (!isDay) return 'night'
  if (weatherCode >= 71 && weatherCode <= 86) return 'snow'
  if (weatherCode >= 51 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82) return 'rain'
  if (weatherCode >= 95) return 'storm'
  return 'sunny'
}

export const WeatherAtmosphere = ({ weatherCode = 1, isDay = true }: WeatherAtmosphereProps) => {
  const mode = useMemo(() => getMode(weatherCode, isDay), [weatherCode, isDay])
  const particles = useMemo(() => Array.from({ length: mode === 'night' ? 18 : 14 }, (_, index) => index), [mode])

  return (
    <div className={`weather-atmosphere weather-atmosphere--${mode}`} aria-hidden="true">
      <div className="weather-atmosphere__glow" />
      <div className="weather-atmosphere__orb" />
      {particles.map((particle) => <span key={particle} className="weather-atmosphere__particle" style={{ '--particle-index': particle } as React.CSSProperties} />)}
    </div>
  )
}
