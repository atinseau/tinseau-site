import '../styles/globals.scss'
import '../styles/fonts.scss'

import type { AppProps } from 'next/app'
import ErrorProvider from 'src/contexts/ErrorProvider'
import AuthProvider from 'src/contexts/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return <ErrorProvider>
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	</ErrorProvider>
}

export default MyApp
