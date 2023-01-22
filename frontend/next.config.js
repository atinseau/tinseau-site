const globalEnv = {
	SERVER_ADDRESS: process.env.SERVER_ADDRESS,
	SERVER_API: process.env.SERVER_API
}

/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		images: {
			allowFutureImage: true
		}
	},
	images: {
		domains: [
			process.env.SERVER_IP,
			"placehold.it",
			"s3.eu-west-3.amazonaws.com",
			"lh3.googleusercontent.com"
		],
	},
	publicRuntimeConfig: globalEnv,
	serverRuntimeConfig: globalEnv
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})


module.exports = withBundleAnalyzer(nextConfig)