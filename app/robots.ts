import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({ rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/sign-in', '/sign-up'] }], sitemap: 'https://expert-meteo.vercel.app/sitemap.xml' })

export default robots
