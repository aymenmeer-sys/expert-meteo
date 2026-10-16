import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'MétéoExpert', short_name: 'MétéoExpert', description: 'Prévisions météo précises', start_url: '/', display: 'standalone', background_color: '#081522', theme_color: '#081522', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] }
}
