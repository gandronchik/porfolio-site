// core styles shared by all of react-notion-x (required)
import '../components/react-notion-x/styles.css'

// global styles shared across the entire site
import '../styles/global.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// global style overrides for notion
//import '../styles/notion.css'

// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

// animation styles
import 'aos/dist/aos.css';

import * as React from 'react'
//import * as Fathom from 'fathom-client'
import type { AppProps } from 'next/app'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import AOS from 'aos';

//import { useRouter } from 'next/router'
// import posthog from 'posthog-js'

// import { bootstrap } from 'lib/bootstrap-client'
// import {
//   isServer,
//   fathomId,
//   fathomConfig,
//   posthogId,
//   posthogConfig
// } from 'lib/config'

// if (!isServer) {
//   bootstrap()
// }

export default function App({ Component, pageProps }: AppProps) {
  //const router = useRouter()

  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  })

  // React.useEffect(() => {
  //   function onRouteChangeComplete() {
  //     if (fathomId) {
  //       Fathom.trackPageview()
  //     }

  //     if (posthogId) {
  //       posthog.capture('$pageview')
  //     }
  //   }


  //   if (fathomId) {
  //     Fathom.load(fathomId, fathomConfig)
  //   }

  //   if (posthogId) {
  //     posthog.init(posthogId, posthogConfig)
  //   }

  //   router.events.on('routeChangeComplete', onRouteChangeComplete)

  //   return () => {
  //     router.events.off('routeChangeComplete', onRouteChangeComplete)
  //   }
  // }, [router.events])

  return <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
}
