/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://audiophile-elieb77.vercel.app/"],
  },
};

module.exports = nextConfig;
