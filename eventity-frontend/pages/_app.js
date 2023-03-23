import '../assets/sass/main.scss'
import {SessionProvider} from 'next-auth/react'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()


export default function App({Component, pageProps: {session, ...pageProps}}) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </QueryClientProvider>
    )
}
