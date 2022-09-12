import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getEnvConfig } from 'src/functions/getConfig';

const client = new ApolloClient({
	uri: getEnvConfig().SERVER_GRAPHQL,
	cache: new InMemoryCache()
});


export default client;