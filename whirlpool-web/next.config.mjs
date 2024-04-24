// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Adding ESLint configuration
    eslint: {
      // Disabling ESLint checks during production builds
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  