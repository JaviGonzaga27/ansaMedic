import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { QuoteProvider } from '../context/QuoteContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QuoteProvider>
        <Component {...pageProps} />
      </QuoteProvider>
    </AuthProvider>
  )
}

export default MyApp
