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
      // ── pSEO consolidation: all /rates/ → settled.pro ──
      // Individual rate pages: /rates/binance/btc-usdt → settled.pro/rates/binance-btc-usdt
      { source: '/rates/:exchange/:pair', destination: 'https://settled.pro/rates/:exchange-:pair', permanent: true },
      // Exchange index: /rates/binance → settled.pro rates (no direct equivalent, go to main rates)
      { source: '/rates/:exchange', destination: 'https://settled.pro/rates', permanent: true },
      // Rates index
      { source: '/rates', destination: 'https://settled.pro/rates', permanent: true },
      // Calendar and leaderboard subpages
      { source: '/rates/calendar', destination: 'https://settled.pro/rates', permanent: true },
      { source: '/rates/leaderboard', destination: 'https://settled.pro/leaderboard', permanent: true },

      // Legacy site URLs → current equivalents (301 permanent)
      { source: '/manifesto', destination: '/about', permanent: true },
      { source: '/roadmap', destination: '/about', permanent: true },
      { source: '/privacy', destination: '/pact', permanent: true },
      { source: '/faq', destination: '/learn', permanent: true },
      { source: '/access-request', destination: '/', permanent: true },
      { source: '/research/basis-trading-strategies', destination: '/research', permanent: true },
      { source: '/research/network-optimization', destination: '/research', permanent: true },
      { source: '/research/quantum-computing', destination: '/research', permanent: true },
    ]
  },
}

export default nextConfig
