import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/datenschutzerklaerung",
        destination: "/datenschutz",
        permanent: true,
      },
      {
        source: "/innenmalerei",
        destination: "/dienstleistungen/innenmalerei",
        permanent: true,
      },
      {
        source: "/aussenmalerei",
        destination: "/dienstleistungen/aussenmalerei",
        permanent: true,
      },
      {
        source: "/betonkosmetik",
        destination: "/dienstleistungen/betonkosmetik",
        permanent: true,
      },
      {
        source: "/anstricharbeiten",
        destination: "/dienstleistungen/anstricharbeiten",
        permanent: true,
      },
      {
        source: "/dekorationsarbeiten",
        destination: "/dienstleistungen/dekorationsarbeiten",
        permanent: true,
      },
      {
        source: "/brand-und-wasserschadensanierungen",
        destination: "/dienstleistungen/brand-und-wasserschadensanierungen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
