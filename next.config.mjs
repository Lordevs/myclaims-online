/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ── Local Strapi dev server ──────────────────────────────────────────
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // ── Strapi Cloud (production) ────────────────────────────────────────
      // Strapi Cloud — production
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/uploads/**",
      },
      // Strapi Cloud media CDN
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
        pathname: "/**",
      },
      // ── Custom S3 / CDN ──────────────────────────────────────────────────
      // If you configure an S3 or Cloudinary provider in Strapi, add it here:
      // {
      //   protocol: "https",
      //   hostname: "your-bucket.s3.amazonaws.com",
      // },
    ],
  },
}

export default nextConfig
