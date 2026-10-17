'use client'

import { useEffect, useMemo, useState } from 'react'
import { LiveWeather } from '@/components/live-weather'
import dynamic from 'next/dynamic'
import { ForecastChart } from '@/components/forecast-chart'
import { RainRadar } from '@/components/rain-radar'
import { WeatherModules } from '@/components/weather-modules'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((response) => response.json())
type WeatherPayload = { current?: { temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number; wind_speed_10m: number; wind_gusts_10m?: number; surface_pressure: number; visibility?: number; dew_point_2m?: number; cloud_cover?: number; weather_code: number }; air?: { european_aqi?: number; pm2_5?: number; pm10?: number; ozone?: number; nitrogen_dioxide?: number } | null; daily?: { temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[]; sunrise: string[]; sunset: string[]; uv_index_max?: number[] }; hourly?: { time: string[]; temperature_2m: number[]; precipitation_probability: number[] }; place?: { name: string; country: string; latitude: number; longitude: number }; error?: string }

const WeatherMap = dynamic(() => import('@/components/weather-map').then((module) => module.WeatherMap), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-2xl bg-white/[0.04]" /> })
import {
  Bell,
  ChevronDown,
  CloudDrizzle,
  CloudSun,
  Compass,
  Droplets,
  Gauge,
  Heart,
  LocateFixed,
  MapPin,
  Menu,
  Moon,
  Search,
  Settings2,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  X,
} from 'lucide-react'

const hourly = [
  { time: 'Maint.', temp: 18, rain: 12, icon: CloudSun },
  { time: '11h', temp: 19, rain: 10, icon: CloudSun },
  { time: '12h', temp: 20, rain: 8, icon: Sun },
  { time: '13h', temp: 21, rain: 7, icon: Sun },
  { time: '14h', temp: 22, rain: 6, icon: Sun },
  { time: '15h', temp: 22, rain: 9, icon: CloudSun },
  { time: '16h', temp: 21, rain: 14, icon: CloudSun },
  { time: '17h', temp: 20, rain: 18, icon: CloudDrizzle },
]

const days = [
  { day: "Aujourd'hui", date: '16 oct.', high: 22, low: 14, rain: 10, icon: CloudSun },
  { day: 'Vendredi', date: '17 oct.', high: 21, low: 13, rain: 20, icon: CloudSun },
  { day: 'Samedi', date: '18 oct.', high: 19, low: 12, rain: 42, icon: CloudDrizzle },
  { day: 'Dimanche', date: '19 oct.', high: 18, low: 11, rain: 55, icon: CloudDrizzle },
  { day: 'Lundi', date: '20 oct.', high: 20, low: 12, rain: 25, icon: CloudSun },
]

const cities = ['Paris, France', 'Lyon, France', 'Bordeaux, France', 'Marseille, France']
type Language = 'fr' | 'en' | 'es' | 'de'
const translations: Record<Language, Record<string, string>> = {
  fr: { overview: 'Vue d’ensemble', forecast: 'Prévisions', maps: 'Cartes météo', favorites: 'Mes favoris', search: 'Rechercher une ville...', login: 'Connexion', current: 'Conditions actuelles', air: 'Qualité de l’air', hourly: 'Prévisions horaires', next24: 'Les prochaines 24 heures', detail: 'Voir le détail', fiveDays: 'Prévisions à 14 jours', interactive: 'Carte interactive', local: 'Position et conditions locales', goodAir: 'Très bonne qualité' },
  en: { overview: 'Overview', forecast: 'Forecast', maps: 'Weather maps', favorites: 'My favorites', search: 'Search a city...', login: 'Sign in', current: 'Current conditions', air: 'Air quality', hourly: 'Hourly forecast', next24: 'Next 24 hours', detail: 'View details', fiveDays: '14-day forecast', interactive: 'Interactive map', local: 'Location and local conditions', goodAir: 'Very good quality' },
  es: { overview: 'Resumen', forecast: 'Pronóstico', maps: 'Mapas meteorológicos', favorites: 'Mis favoritos', search: 'Buscar una ciudad...', login: 'Iniciar sesión', current: 'Condiciones actuales', air: 'Calidad del aire', hourly: 'Pronóstico por horas', next24: 'Próximas 24 horas', detail: 'Ver detalles', fiveDays: 'Pronóstico de 14 días', interactive: 'Mapa interactivo', local: 'Ubicación y condiciones locales', goodAir: 'Muy buena calidad' },
  de: { overview: 'Übersicht', forecast: 'Vorhersage', maps: 'Wetterkarten', favorites: 'Meine Favoriten', search: 'Stadt suchen...', login: 'Anmelden', current: 'Aktuelle Bedingungen', air: 'Luftqualität', hourly: 'Stündliche Vorhersage', next24: 'Nächste 24 Stunden', detail: 'Details anzeigen', fiveDays: '14-Tage-Prognose', interactive: 'Interaktive Karte', local: 'Position und lokale Bedingungen', goodAir: 'Sehr gute Qualität' },
}

export default function Page() {
  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined)
  }, [])
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('Paris, France')
  const [favorite, setFavorite] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [language, setLanguage] = useState<Language>('fr')
  const copy = translations[language]
  const languages: Language[] = ['fr', 'en', 'es', 'de']
  const { data: weather } = useSWR<WeatherPayload>(`/api/weather?city=${encodeURIComponent(city.split(',')[0])}`, fetcher, { refreshInterval: 900000, revalidateOnFocus: true })
  const filteredCities = useMemo(() => cities.filter((item) => item.toLowerCase().includes(query.toLowerCase())), [query])
  const formatTemp = (value: number) => unit === 'C' ? `${Math.round(value)}°` : `${Math.round(value * 1.8 + 32)}°`
  const current = weather?.current
  const todayHigh = weather?.daily?.temperature_2m_max?.[0] ?? 22
  const todayLow = weather?.daily?.temperature_2m_min?.[0] ?? 14
  const liveHourly = useMemo(() => (weather?.hourly?.time ?? []).slice(0, 8).map((time, index) => ({ time: index === 0 ? 'Maint.' : new Date(time).getHours() + 'h', temp: weather?.hourly?.temperature_2m?.[index] ?? 18, rain: weather?.hourly?.precipitation_probability?.[index] ?? 0, icon: CloudSun })), [weather])

  return (
    <main className="min-h-screen overflow-hidden bg-[#081522] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0a1b2a] px-5 py-7 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-[#081522]"><CloudSun size={23} strokeWidth={2.3} /></div>
            <div><p className="text-[15px] font-bold tracking-tight">Météo<span className="text-cyan-300">Expert</span></p><p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Prévisions précises</p></div>
          </div>
          <nav className="mt-12 space-y-2" aria-label="Navigation principale">
            <a className="flex items-center gap-3 rounded-xl bg-cyan-400/10 px-3 py-3 text-sm font-semibold text-cyan-300" href="#dashboard"><Sun size={17} /> {copy.overview}</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white" href="#forecast"><CloudSun size={17} /> {copy.forecast}</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white" href="#maps"><Compass size={17} /> {copy.maps}</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white" href="#favorites"><Heart size={17} /> Mes favoris</a>
          </nav>
          <div className="mt-auto rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-xs font-semibold text-cyan-200">Conseil du jour</p><p className="mt-2 text-xs leading-5 text-slate-400">Profitez des éclaircies entre 12h et 16h pour vos activités extérieures.</p>
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5 text-xs text-slate-500"><Settings2 size={16} /> Paramètres <span className="ml-auto">v1.0</span></div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-5 sm:px-8 lg:px-12 lg:py-8">
          <header className="flex items-center justify-between gap-4">
            <button className="lg:hidden" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
            <div className="relative max-w-[430px] flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input aria-label="Rechercher une ville" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229 && filteredCities[0]) { setCity(filteredCities[0]); setQuery('') } }} placeholder={copy.search} className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.07]" />
              {query && <div className="absolute left-0 right-0 top-14 z-10 rounded-xl border border-white/10 bg-[#102638] p-2 shadow-2xl">{filteredCities.length ? filteredCities.map((item) => <button key={item} onClick={() => { setCity(item); setQuery('') }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10"><MapPin size={14} className="text-cyan-300" />{item}</button>) : <p className="p-2 text-sm text-slate-500">Aucune ville trouvée</p>}</div>}
            </div>
            <div className="flex items-center gap-2 sm:gap-4"><button aria-label="Changer la langue" onClick={() => setLanguage(languages[(languages.indexOf(language) + 1) % languages.length])} className="hidden text-xs font-semibold text-slate-400 sm:block">{language.toUpperCase()}</button><a href="/sign-in" className="hidden text-xs text-cyan-300 sm:block">Connexion</a><button className="hidden items-center gap-2 text-sm text-slate-400 sm:flex" onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}><span className={unit === 'C' ? 'font-bold text-white' : ''}>°C</span><span className="text-slate-600">/</span><span className={unit === 'F' ? 'font-bold text-white' : ''}>°F</span></button><button className="relative rounded-xl border border-white/[0.08] p-2.5 text-slate-400 hover:text-white" aria-label="Notifications"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" /></button><div className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-sm font-bold text-[#081522] sm:flex">AM</div></div>
          </header>


          <div id="dashboard" className="mt-10 flex flex-wrap items-end justify-between gap-4"><div><div className="flex items-center gap-2 text-sm text-slate-400"><MapPin size={15} className="text-cyan-300" />{city}<button onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris" className="ml-1 hover:text-amber-300"> <Heart size={15} fill={favorite ? 'currentColor' : 'none'} className={favorite ? 'text-amber-300' : ''} /></button></div><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bonjour, Aymen <span aria-hidden="true">.</span></h1><p className="mt-2 text-sm text-slate-500">Jeudi 16 octobre 2026 <span className="mx-2 text-slate-700">•</span> Dernière mise à jour à 10:42</p><div className="mt-2"><LiveWeather city={city} /></div></div><button onClick={() => navigator.geolocation?.getCurrentPosition((position) => setCity(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2 text-xs text-slate-400 hover:border-white/20 hover:text-white"><LocateFixed size={14} /> Ma position</button></div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <article className="relative overflow-hidden rounded-3xl border border-cyan-200/10 bg-gradient-to-br from-[#123650] via-[#0d2a41] to-[#102132] p-6 sm:p-8"><div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" /><div className="relative flex flex-wrap items-start justify-between gap-6"><div><p className="text-sm font-medium text-cyan-200">{copy.current}</p><div className="mt-5 flex items-center gap-5"><Sun size={72} strokeWidth={1.2} className="text-amber-300" /><div><div className="text-7xl font-light tracking-[-0.08em] text-white">{formatTemp(current?.temperature_2m ?? 18)}<span className="text-3xl text-slate-400">{unit}</span></div><p className="mt-1 text-sm text-slate-300">Partiellement nuageux</p></div></div><p className="mt-7 text-xs text-slate-400">Ressenti {formatTemp(current?.apparent_temperature ?? 18)} <span className="mx-2 text-slate-600">•</span> Max {formatTemp(todayHigh)} / Min {formatTemp(todayLow)}</p></div><div className="grid grid-cols-2 gap-x-7 gap-y-5 text-sm"><Metric icon={<Droplets />} label={language === 'fr' ? 'Humidité' : 'Humidity'} value={`${current?.relative_humidity_2m ?? 64}%`} /><Metric icon={<Wind />} label={language === 'fr' ? 'Vent' : 'Wind'} value={`${Math.round(current?.wind_speed_10m ?? 12)} km/h`} /><Metric icon={<Gauge />} label="Pression" value={`${Math.round(current?.surface_pressure ?? 1018)} hPa`} /><Metric icon={<Sunrise />} label="UV" value="3 Modéré" /></div></div></article>
            <article className="rounded-3xl border border-white/[0.07] bg-[#0d2132] p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium">{copy.air}</p><p className="mt-1 text-xs text-slate-500">Très bonne qualité</p></div><div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">AQI {Math.round(weather?.air?.european_aqi ?? 24)}</div></div><div className="mt-7"><div className="h-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400"><div className="h-full w-[18%] rounded-full bg-white shadow-[0_0_8px_white]" /></div><div className="mt-3 flex justify-between text-[10px] text-slate-500"><span>Bon</span><span>Modéré</span><span>Mauvais</span></div></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5 text-center"><div><p className="text-xs text-slate-500">PM2.5</p><p className="mt-1 font-semibold">{Math.round(weather?.air?.pm2_5 ?? 6)} <small className="font-normal text-slate-500">µg/m³</small></p></div><div><p className="text-xs text-slate-500">PM10</p><p className="mt-1 font-semibold">{Math.round(weather?.air?.pm10 ?? 11)} <small className="font-normal text-slate-500">µg/m³</small></p></div><div><p className="text-xs text-slate-500">O₃</p><p className="mt-1 font-semibold">{Math.round(weather?.air?.ozone ?? 42)} <small className="font-normal text-slate-500">µg/m³</small></p></div></div></article>
          </div>

          <section id="forecast" className="mt-8"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold">{copy.hourly}</h2><p className="mt-1 text-xs text-slate-500">{copy.next24}</p></div><button className="flex items-center gap-1 text-xs text-cyan-300">Voir le détail <ChevronDown size={14} /></button></div><div className="overflow-x-auto pb-2"><div className="grid min-w-[720px] grid-cols-8 divide-x divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-[#0d2132]">{(liveHourly.length ? liveHourly : hourly).map(({ time, temp, rain, icon: Icon }, index) => <div key={time} className={`flex flex-col items-center gap-3 px-3 py-5 ${index === 0 ? 'bg-cyan-300/[0.07]' : ''}`}><span className="text-xs text-slate-500">{time}</span><Icon size={24} className={index > 5 ? 'text-slate-300' : 'text-amber-300'} /><span className="font-semibold">{formatTemp(temp)}</span><span className="text-[11px] text-cyan-300">{rain}%</span></div>)}</div></div></section>

          <section className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.8fr]"><div><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">{copy.fiveDays}</h2><button className="text-xs text-cyan-300">14 jours <ChevronDown size={14} className="inline" /></button></div><div className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-[#0d2132] px-5">{days.map(({ day, date, high, low, rain, icon: Icon }) => <div key={day} className="flex items-center justify-between py-4"><div className="flex w-32 items-center gap-3"><Icon size={22} className="text-amber-300" /><div><p className="text-sm font-medium">{day}</p><p className="text-xs text-slate-500">{date}</p></div></div><div className="hidden items-center gap-2 text-xs text-cyan-300 sm:flex"><CloudDrizzle size={14} /> {rain}%</div><div className="flex w-20 items-center justify-end gap-3 text-sm"><strong>{formatTemp(high)}</strong><span className="text-slate-500">{formatTemp(low)}</span></div></div>)}</div></div><div id="maps" className="relative min-h-[250px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#122d3c] p-5"><div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(104,190,194,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(104,190,194,.14) 1px, transparent 1px)', backgroundSize: '42px 42px' }} /><div className="relative flex items-start justify-between"><div><p className="text-sm font-semibold">Carte des précipitations</p><p className="mt-1 text-xs text-slate-500">Paris et alentours</p></div><button className="rounded-lg bg-white/10 p-2 text-slate-300" aria-label="Ouvrir la carte"><Compass size={17} /></button></div><div className="relative mt-12 flex items-center justify-center"><div className="absolute h-28 w-28 rounded-full bg-cyan-300/10 blur-xl" /><div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-300/20"><MapPin size={22} className="text-cyan-200" /></div></div><p className="absolute bottom-5 left-5 text-[11px] text-slate-500">Aucune précipitation prévue dans l&apos;heure</p></div></section>
          <section className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]" aria-labelledby="analysis-title">
            <article className="rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5">
              <div className="mb-4"><h2 id="analysis-title" className="text-lg font-semibold">Tendance des prochaines heures</h2><p className="mt-1 text-xs text-slate-500">Température et risque de pluie</p></div>
              <ForecastChart hourly={weather?.hourly} /><div className="mt-4"><RainRadar latitude={weather?.place?.latitude} longitude={weather?.place?.longitude} /></div>
            </article>
            <article className="rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5"><div className="mb-4"><h2 className="text-lg font-semibold">{copy.interactive}</h2><p className="mt-1 text-xs text-slate-500">Position et conditions locales</p></div><WeatherMap city={city.split(',')[0]} /></article>
          </section>

          <WeatherModules language={language} comparisons={cities.slice(0, 3).map((item, index) => ({ city: item.split(',')[0], temp: (weather?.daily?.temperature_2m_max?.[index] ?? 20) - index, rain: weather?.daily?.precipitation_probability_max?.[index] ?? [10, 25, 40][index], trend: index === 0 ? 'Stable' : index === 1 ? 'En hausse' : 'En baisse' }))} />

          <section className="mt-8 grid gap-5 xl:grid-cols-2" aria-label={language === 'fr' ? 'Prévisions détaillées et historique' : 'Detailed forecast and history'}>
            <article className="rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5">
              <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">{language === 'fr' ? 'Prévisions détaillées' : 'Detailed forecast'}</h2><p className="mt-1 text-xs text-slate-500">{language === 'fr' ? '10 jours · modèle Open-Meteo' : '10 days · Open-Meteo model'}</p></div><span className="rounded-lg bg-cyan-300/10 px-2 py-1 text-[11px] text-cyan-300">10 J</span></div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-7">{(weather?.daily?.temperature_2m_max ?? []).slice(0, 14).map((high, index) => <div key={`${high}-${index}`} className="rounded-xl bg-white/[0.03] p-3 text-center"><p className="text-[10px] text-slate-500">{index === 0 ? (language === 'fr' ? 'Auj.' : 'Today') : `J+${index}`}</p><CloudSun size={19} className="mx-auto my-2 text-amber-300" /><p className="text-sm font-semibold">{formatTemp(high)}</p><p className="mt-1 text-[10px] text-cyan-300">{weather?.daily?.precipitation_probability_max?.[index] ?? 0}%</p></div>)}</div>
            </article>
            <article className="rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5"><div><h2 className="text-lg font-semibold">{language === 'fr' ? 'Historique météo' : 'Weather history'}</h2><p className="mt-1 text-xs text-slate-500">{language === 'fr' ? '7 derniers jours · températures observées' : 'Last 7 days · observed temperatures'}</p></div><div className="mt-5 flex items-end gap-2" aria-label={language === 'fr' ? 'Températures historiques' : 'Historical temperatures'}>{(weather?.daily?.temperature_2m_max ?? []).slice(0, 7).map((value, index) => <div key={`${value}-history-${index}`} className="flex flex-1 flex-col items-center gap-2"><span className="text-[10px] text-slate-500">{index === 0 ? 'J-6' : `J-${7 - index}`}</span><div className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/50 to-cyan-200/80" style={{ height: `${Math.max(30, Math.min(110, value * 4))}px` }} /><span className="text-xs font-medium">{formatTemp(value)}</span></div>)}</div></article>
          </section>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] py-6 text-[11px] text-slate-600"><span>Données météo © Open-Meteo · Mise à jour toutes les 15 min</span><span className="flex items-center gap-2"><Sunset size={13} /> Coucher du soleil à 18:54</span></footer>
        </section>
      </div>
    </main>
  )
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-2.5"><span className="text-cyan-300/70">{icon}</span><div><p className="text-[11px] text-slate-500">{label}</p><p className="mt-0.5 text-xs font-medium text-slate-200">{value}</p></div></div>
}
