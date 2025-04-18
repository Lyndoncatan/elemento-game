/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@radix-ui/react-use-effect-event"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add a fallback for the useEffectEvent hook
    config.resolve.alias = {
      ...config.resolve.alias,
      "@radix-ui/react-use-effect-event": require.resolve("./lib/fix-radix-ui.ts"),
    }

    return config
  },
}

module.exports = nextConfig
