/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Legacy site URLs → current equivalents (301 permanent)
      { source: '/manifesto', destination: '/about', permanent: true },
      { source: '/roadmap', destination: '/about', permanent: true },
      { source: '/privacy', destination: '/pact', permanent: true },
      { source: '/faq', destination: '/learn', permanent: true },
      { source: '/access-request', destination: '/', permanent: true },
      { source: '/research/basis-trading-strategies', destination: '/research', permanent: true },
      { source: '/research/network-optimization', destination: '/research', permanent: true },
      { source: '/research/quantum-computing', destination: '/research', permanent: true },
      // www → non-www handled by Cloudflare, but catch any stragglers
    ]
  },
}

export default nextConfig
