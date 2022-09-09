import '../styles/globals.scss'
import '../styles/fonts.scss'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql'
import ErrorProvider from 'src/contexts/ErrorProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return <ErrorProvider>
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	</ErrorProvider>
}

export default MyApp
