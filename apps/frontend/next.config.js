const path = require('path')

const globalEnv = {
	SERVER_ADDRESS: process.env.SERVER_ADDRESS,
	SERVER_API: process.env.SERVER_API
}

/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: [
			process.env.SERVER_IP,
			"placehold.it",
			"s3.eu-west-3.amazonaws.com",
			"tinseau-image.s3.eu-west-3.amazonaws.com",
			"lh3.googleusercontent.com",
		],
	},
	publicRuntimeConfig: globalEnv,
	serverRuntimeConfig: globalEnv,
	webpack: (config, { isServer }) => {

		// remove getServerSideProps from client bundle in server.tsx files

		if (!isServer) {
			config.module.rules = [
				...config.module.rules,
				{
					test: /\.server.tsx$/,
					use: {
						loader: path.resolve(__dirname, 'utils', 'RemoveFunctionLoader.js'),
						options: {
							excludedFunctions: [
								'getServerSideProps'
							]
						}
					}
				}
			]
			
		}

		return config
	}
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})


module.exports = withBundleAnalyzer(nextConfig)