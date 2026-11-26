import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "graph.digiseller.ru",
        pathname: "/img.ashx/**",
      },
    ],
  },
};

export default nextConfig;


