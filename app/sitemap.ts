import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://expert-meteo.vercel.app'
  return [{ url: base, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 }]
}
