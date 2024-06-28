/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;

