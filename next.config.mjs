/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force clean build — cache bust 2026-03-06
  generateBuildId: () => `build-${Date.now()}`,
}

export default nextConfig
