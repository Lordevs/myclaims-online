/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + turbopack
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Tailwind inline styles + Radix UI
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts, Iconify CDN
      "font-src 'self' https://fonts.gstatic.com https://api.iconify.design",
      // Strapi Cloud images + local dev + production custom domain
      "img-src 'self' data: blob: https://*.strapiapp.com https://*.media.strapiapp.com http://localhost:1337 https://cms.myclaimsonline.co.uk",
      // Strapi API + Google Maps embed + production custom domain
      "connect-src 'self' https://*.strapiapp.com http://localhost:1337 https://api.iconify.design https://cms.myclaimsonline.co.uk",
      // Google Maps iframe
      "frame-src https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
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
      // ── Custom Production Strapi ─────────────────────────────────────────
      {
        protocol: "https",
        hostname: "cms.myclaimsonline.co.uk",
        pathname: "/uploads/**",
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
