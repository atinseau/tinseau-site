import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log(process.env)

const client = new ApolloClient({
	uri: process.env.SERVER_HOST + process.env.SERVER_GRAPHQL,
	cache: new InMemoryCache(),
});

export default client;