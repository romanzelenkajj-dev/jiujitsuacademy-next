/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Legacy images still on websupport's CDN — remove once migrated to /public or a blob store
      { protocol: 'https', hostname: 'files.vlastnawebstranka.websupport.sk' },
    ],
  },
  async redirects() {
    return [
      // Preserve legacy URL with encoded Slovak character -> new clean slug
      { source: '/%C4%8Dlenstvo', destination: '/clenstvo', permanent: true },
      { source: '/členstvo', destination: '/clenstvo', permanent: true },
      // Old /2 page -> new clean slug
      { source: '/2', destination: '/2-percenta', permanent: true },
    ]
  },
}

export default nextConfig
