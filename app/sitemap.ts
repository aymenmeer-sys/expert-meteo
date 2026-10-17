import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
  const base = 'https://expert-meteo.vercel.app'
  const cities = ['paris', 'lyon', 'marseille', 'bordeaux']
  return [{ url: `${base}/`, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 }, { url: `${base}/actualites`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 }, { url: `${base}/developpeurs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 }, ...cities.map((city) => ({ url: `${base}/villes/${city}`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.8 })), { url: `${base}/status`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.4 }, { url: `${base}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 }]
}

export default sitemap
