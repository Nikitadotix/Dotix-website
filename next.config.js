/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ['127.0.0.1'],
};

module.exports = nextConfig;
