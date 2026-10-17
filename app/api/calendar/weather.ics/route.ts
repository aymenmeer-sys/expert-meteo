import { NextResponse } from 'next/server'

export async function GET() {
  const now = new Date()
  const end = new Date(now.getTime() + 60 * 60 * 1000)
  const format = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MétéoExpert//Weather//FR', 'BEGIN:VEVENT', `UID:weather-${format(now)}@meteoexpert`, `DTSTAMP:${format(now)}`, `DTSTART:${format(now)}`, `DTEND:${format(end)}`, 'SUMMARY:MétéoExpert — Conditions actuelles', 'DESCRIPTION:Consultez les conditions et alertes météo actualisées sur MétéoExpert.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  return new NextResponse(body, { headers: { 'content-type': 'text/calendar; charset=utf-8', 'cache-control': 'public, max-age=900' } })
}
