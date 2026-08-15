/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Não há mais imagens remotas: as fotos entram em `public/images/`.
  transpilePackages: ["three"],
};

export default nextConfig;
