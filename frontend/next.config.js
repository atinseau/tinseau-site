const globalEnv = {
	SERVER_ADDRESS: process.env.SERVER_ADDRESS,
	SERVER_GRAPHQL: process.env.SERVER_GRAPHQL
}

/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
	reactStrictMode: false,
	experimental: { images: { allowFutureImage: true } },
	images: {
		domains: [process.env.SERVER_IP]
	},
	publicRuntimeConfig: globalEnv,
	serverRuntimeConfig: globalEnv
}

module.exports = nextConfig
