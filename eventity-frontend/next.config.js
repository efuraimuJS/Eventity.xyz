/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}
const withImages = require('next-images');
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = withImages();
module.exports = nextConfig


