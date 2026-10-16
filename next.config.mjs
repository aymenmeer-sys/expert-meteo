/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
<<<<<<< HEAD
    ignoreBuildErrors: false,
=======
    ignoreBuildErrors: true,
>>>>>>> 45f4c28 (Initial commit from v0)
  },
  images: {
    unoptimized: true,
  },
<<<<<<< HEAD
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
=======
>>>>>>> 45f4c28 (Initial commit from v0)
}

export default nextConfig
