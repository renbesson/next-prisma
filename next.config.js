/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
	},
	images: {
		domains: ['pbs.twimg.com'],
	},
};

module.exports = nextConfig;
