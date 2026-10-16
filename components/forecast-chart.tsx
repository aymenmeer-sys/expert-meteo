'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { time: '10h', temperature: 18, rain: 12 }, { time: '12h', temperature: 20, rain: 8 },
  { time: '14h', temperature: 22, rain: 6 }, { time: '16h', temperature: 21, rain: 14 },
  { time: '18h', temperature: 19, rain: 24 }, { time: '20h', temperature: 17, rain: 18 },
  { time: '22h', temperature: 16, rain: 10 },
]

export function ForecastChart() {
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
