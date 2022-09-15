import '../styles/globals.scss'
import '../styles/fonts.scss'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql'
import ErrorProvider from 'src/contexts/ErrorProvider'
import AuthProvider from 'src/contexts/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return <ErrorProvider>
		<ApolloProvider client={client}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ApolloProvider>
	</ErrorProvider>
}

export default MyApp
