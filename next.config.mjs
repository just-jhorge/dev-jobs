/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c5x4gyimtuwaiunu.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
