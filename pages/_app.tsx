import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import { Provider } from 'react-redux'
import store from '../state/store'
import Layout from '../layouts/Layout'

import '/styles/nprogress.css' //styles of nprogress
import '../styles/globals.css'
import '../styles/TileMap.css'
import MobileControl from '../components/MobileControl'
import { useState } from 'react'
import { WagmiConfig } from 'wagmi'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
    return NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
    const [wagmiClient, setWagmiClient] = useState<any>()


    return (
        <>
            {/* <WagmiConfig client={wagmiClient}> */}
                <Provider store={store}>
                    <div className="hidden lg:block">
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </div>
                    <div className="lg:hidden h-screen w-screen bg-white fixed inset-0 z-[99]">
                        <MobileControl />
                    </div>
                </Provider>
            {/* </WagmiConfig> */}
        </>
    )
}
export default MyApp
