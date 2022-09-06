export default {
	graphql: {
		config: {
			endpoint: '/graphql',
			shadowCRUD: true,
			playgroundAlways: false,
			depthLimit: 7,
			amountLimit: 100,
			apolloServer: {
				tracing: false,
			},
		},
	},
	'custom-fields': {
		enabled: true,
		resolve: './src/plugins/custom-fields'
	},
}