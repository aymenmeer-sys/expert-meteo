'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Hourly = { time: string[]; temperature_2m: number[]; precipitation_probability: number[] }

export function ForecastChart({ hourly }: { hourly?: Hourly }) {
  const data = hourly?.time?.slice(0, 12).map((time, index) => ({ time: new Date(time).toLocaleTimeString('fr-FR', { hour: '2-digit' }), temperature: hourly.temperature_2m[index], rain: hourly.precipitation_probability[index] })) ?? []
  return (
    <div className="h-[250px] w-full" aria-label="Graphique des températures et précipitations">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#102638', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, color: '#fff' }} />
          <Line type="monotone" dataKey="temperature" name="Température °C" stroke="#67e8f9" strokeWidth={3} dot={{ fill: '#67e8f9', r: 3 }} />
          <Line type="monotone" dataKey="rain" name="Pluie %" stroke="#a78bfa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
