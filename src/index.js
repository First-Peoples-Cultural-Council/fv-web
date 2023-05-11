import 'core-js'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

// FPCC
import 'assets/main.css'
import App from 'components/App'
import Loading from 'components/Loading'
import ScrollToTopOnMount from 'common/ScrollToTopOnMount'
import { AuthProvider } from 'context/AuthContext'
import { SiteProvider } from 'context/SiteContext'
import { UserProvider } from 'context/UserContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, { message: status }) => {
        if (status !== '404' && status !== '401') {
          return false
        }
        return failureCount > 2
      },
    },
  },
})

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
