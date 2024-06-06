/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www-tr-com-qa-ams.ewp.thomsonreuters.com',
            port: '',
            pathname: '/content/dam/appcentral/apps/**',
          },
        ],
    },
};

export default nextConfig;
