import { NextResponse } from 'next/server'

export const readJson = async <T = unknown>(request: Request): Promise<T | null> => {
  try { return await request.json() as T } catch { return null }
}

export const upstreamError = (message = 'Service amont indisponible') => NextResponse.json({ error: message }, { status: 502 })

export const fetchJson = async <T = unknown>(url: string, init: RequestInit & { next?: { revalidate?: number } } = {}, timeoutMs = 8000): Promise<T> => {
  const response = await fetch(url, { ...init, signal: init.signal ?? AbortSignal.timeout(timeoutMs) })
  if (!response.ok) throw new Error(`Upstream ${response.status}`)
  return await response.json() as T
}
