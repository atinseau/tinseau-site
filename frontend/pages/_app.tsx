import '../styles/globals.scss'
import '../styles/fonts.scss'

import type { AppProps } from 'next/app'
import client, { ApolloProvider } from '../graphql/index'

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
	<Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp
