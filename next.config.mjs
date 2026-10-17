/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' blob: data: https://*.tile.openstreetmap.org https://*.rainviewer.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; connect-src 'self' https://api.open-meteo.com https://geocoding-api.open-meteo.com https://air-quality-api.open-meteo.com https://*.tile.openstreetmap.org https://api.rainviewer.com https://public-api.meteofrance.fr https://vigilance.meteofrance.fr https://vercel.com https://*.vercel.com wss://*.vercel.com; font-src 'self' data:;" },
        ],
      },
    ]
  },
}

export default nextConfig
