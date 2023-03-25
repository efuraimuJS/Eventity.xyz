import '../assets/sass/main.scss'
import {SessionProvider} from 'next-auth/react'
import {QueryClient, QueryClientProvider} from 'react-query'
import AlertContextProvider from "../context/AlertContext";

const queryClient = new QueryClient()


export default function App({Component, pageProps: {session, ...pageProps}}) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AlertContextProvider>
                    <Component {...pageProps} />
                </AlertContextProvider>
            </SessionProvider>
        </QueryClientProvider>
    )
}
