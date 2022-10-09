import '../styles/globals.scss'
import '../styles/fonts.scss'

import type { AppProps } from 'next/app'
import ErrorProvider from 'src/contexts/ErrorProvider'
import AuthProvider from 'src/contexts/AuthProvider'
import OrderProvider from 'src/components/PickMyDay/contexts/OrderContext/provider'

function MyApp({ Component, pageProps }: AppProps) {
	return <ErrorProvider>
		<AuthProvider>
			<OrderProvider>
				<Component {...pageProps} />
			</OrderProvider>
		</AuthProvider>
	</ErrorProvider>
}

export default MyApp
