/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["prisma", "oslo"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Only externalize packages that don't need to be bundled
      config.externals.push("prisma", "oslo");
    }
    return config;
  },
};

export default nextConfig;
