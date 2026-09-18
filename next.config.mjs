/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/supercomputer", destination: "/enterprise", permanent: false },
      { source: "/canvas", destination: "/create/image", permanent: false },
      { source: "/soul-moodboard", destination: "/templates", permanent: false },
      { source: "/console", destination: "/api-product", permanent: false },
      { source: "/models", destination: "/api-product", permanent: false },
      { source: "/playground", destination: "/create/image", permanent: false },
      {
        source: "/ai/video",
        destination: "/create/video?model=genjutsu",
        permanent: false,
      },
      {
        source: "/ai/image",
        destination: "/create/image",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.higgs.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "open.higgsfield.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d28lhcrx5qdowv.cloudfront.net",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
