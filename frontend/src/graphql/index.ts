import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { getEnvConfig } from 'src/functions/getConfig';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: getEnvConfig().SERVER_GRAPHQL,
});


const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			...(token ? { authorization: `Bearer ${token}` } : {})
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});


export default client;