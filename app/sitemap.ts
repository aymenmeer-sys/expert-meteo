import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => [{ url: 'https://expert-meteo.vercel.app/', lastModified: new Date(), changeFrequency: 'hourly', priority: 1 }, { url: 'https://expert-meteo.vercel.app/status', lastModified: new Date(), changeFrequency: 'daily', priority: 0.4 }, { url: 'https://expert-meteo.vercel.app/confidentialite', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 }]

export default sitemap
