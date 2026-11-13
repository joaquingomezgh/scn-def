import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Quien entra por www termina en el dominio sin www (redirección permanente)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.supercarnesnestor.com" }],
        destination: "https://supercarnesnestor.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
