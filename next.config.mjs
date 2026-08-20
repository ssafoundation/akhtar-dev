/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
