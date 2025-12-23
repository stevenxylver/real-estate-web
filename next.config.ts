import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiHostname = new URL(strapiUrl).hostname;
const strapiPort = new URL(strapiUrl).port || "";
const strapiProtocol = new URL(strapiUrl).protocol.replace(":", "") as "http" | "https";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: strapiProtocol,
        hostname: strapiHostname,
        port: strapiPort,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

