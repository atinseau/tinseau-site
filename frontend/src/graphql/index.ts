import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://192.168.0.36:1337/graphql',
	cache: new InMemoryCache(),
});

export default client;