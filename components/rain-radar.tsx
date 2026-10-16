'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((response) => response.json())

export function RainRadar({ latitude = 48.8566, longitude = 2.3522 }: { latitude?: number; longitude?: number }) {
  const { data, isLoading } = useSWR<{ host?: string; path?: string | null }>('/api/radar', fetcher, { revalidateOnFocus: false })
  const url = data?.host && data.path ? `${data.host}${data.path}/256/{z}/{x}/{y}/2/1_1.png` : null
  return <div className="rounded-xl border border-cyan-300/10 bg-[#0a1b2a] p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Radar pluie</p><p className="mt-1 text-xs text-slate-500">RainViewer · actualisé automatiquement</p></div><span className="text-xs text-cyan-300">{isLoading ? 'Connexion…' : url ? 'Connecté' : 'Indisponible'}</span></div>{url && <div className="mt-3 overflow-hidden rounded-lg"><img src={url.replace('{z}', '6').replace('{x}', String(Math.floor((longitude + 180) / 360 * 64))).replace('{y}', String(Math.floor((1 - Math.asinh(Math.tan(latitude * Math.PI / 180)) / Math.PI) / 2 * 64)))} alt="Radar des précipitations RainViewer" className="h-28 w-full object-cover opacity-80" /></div>}</div>
}
