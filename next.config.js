/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer', 'sharp', 'canvas']
  },
  images: {
    domains: ['localhost'],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

module.exports = nextConfig 