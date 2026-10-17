import { NextResponse } from 'next/server'

export const GET = () => NextResponse.json({ openapi: '3.0.3', info: { title: 'MétéoExpert API', version: '2.0.0' }, paths: { '/api/weather': { get: { summary: 'Conditions actuelles', parameters: [{ name: 'city', in: 'query', required: false, schema: { type: 'string' } }] } }, '/api/nowcast': { get: { summary: 'Nowcasting précipitations' } }, '/api/reports': { get: { summary: 'Signalements approuvés' }, post: { summary: 'Créer un signalement authentifié' } } } })
