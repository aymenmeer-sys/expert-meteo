import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MétéoExpert — La météo, simplement précise',
  description: 'Prévisions météo précises, qualité de l’air et alertes pour Paris et toute la France.',
  generator: 'v0.app',
  keywords: ['météo', 'prévisions météo', 'qualité de l’air', 'radar pluie', 'France'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MétéoExpert — Prévisions météo précises',
    description: 'Prévisions, radar pluie, qualité de l’air et modules experts.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'MétéoExpert', applicationCategory: 'WeatherApplication', operatingSystem: 'Web', description: 'Plateforme météo professionnelle avec prévisions, radar et qualité de l’air.' }) }} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
