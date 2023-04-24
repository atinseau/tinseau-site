import { ErrorProvider } from 'src/contexts/ErrorContext'
import { AuthProvider } from 'src/contexts/AuthContext'
import OrderProvider from 'src/contexts/OrderContext/provider'
import type { ReactElement } from 'react'

import '../styles/globals.scss'
import '../styles/fonts.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

	const getLayout = Component.getLayout || ((page: ReactElement) => page)

	return <>
		<Head>
		
		</Head>
		<ErrorProvider>
			<AuthProvider>
				<OrderProvider>
					{getLayout(<Component {...pageProps} />)}
				</OrderProvider>
			</AuthProvider>
		</ErrorProvider>
	</>
}

export default MyApp
