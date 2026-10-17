import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'MétéoExpert', short_name: 'MétéoExpert', id: '/', description: 'Prévisions météo professionnelles, radar et qualité de l’air.', start_url: '/', scope: '/', display: 'standalone', orientation: 'portrait-primary', background_color: '#081522', theme_color: '#081522', lang: 'fr', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }, { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', purpose: 'any' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'maskable' }] }
}
