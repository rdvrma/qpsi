/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/founder',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/technology',
        destination: '/compiler',
        permanent: false,
      },
      {
        source: '/investors',
        destination: '/support',
        permanent: false,
      },
      {
        source: '/research/persistent-world',
        destination: '/prototype',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
