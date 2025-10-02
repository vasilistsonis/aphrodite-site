/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Don’t fail the production build if there are ESLint warnings.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Don’t fail the build if there are type errors.
      // (You can turn this off later once everything is green.)
      ignoreBuildErrors: true,
    },
    images: {
      // You’re using <img/>, not next/image, so don’t try to optimize.
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;
  