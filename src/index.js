import 'core-js'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'
import { WebStorageStateStore } from 'oidc-client-ts'
import './i18n'

// FPCC
import 'assets/main.css'
import App from 'components/App'
import Loading from 'components/Loading'
import ScrollToTopOnMount from 'common/ScrollToTopOnMount'
import GlobalConfiguration from 'src/GlobalConfiguration'
import { SiteProvider } from 'context/SiteContext'
import { UserProvider } from 'context/UserContext'
import { ORIGINAL_DESTINATION } from 'common/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, { message: status }) => {
        if (status !== '404' && status !== '401') {
          return false
        }
        return failureCount > 2
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

const oidcConfig = {
  authority: GlobalConfiguration.OIDC_AUTHORITY_URL,
  client_id: GlobalConfiguration.AWS_CLIENT_ID,
  redirect_uri: GlobalConfiguration.OAUTH2_REDIRECT_URL,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  onSigninCallback: () => {
    // redirect to original location
    const url = window.sessionStorage.getItem(ORIGINAL_DESTINATION)
    if (url) {
      window.sessionStorage.removeItem(ORIGINAL_DESTINATION)
      window.location.replace(url)
    } else {
      // remove url params to complete the login
      window.history.replaceState({}, document.title, window.location.pathname)
      window.location.reload()
    }
  },
}

if (GlobalConfiguration.END_SESSION_URL) {
  oidcConfig.metadataSeed = {
    end_session_endpoint: GlobalConfiguration.END_SESSION_URL,
  }
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider {...oidcConfig}>
      <UserProvider>
        <SiteProvider>
          <BrowserRouter>
            <ScrollToTopOnMount />
            <Suspense fallback={<Loading.Container isLoading />}>
              <App.Container />
            </Suspense>
          </BrowserRouter>
        </SiteProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>,
)
