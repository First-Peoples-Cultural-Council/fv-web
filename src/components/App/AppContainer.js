import React from 'react'
import * as Sentry from '@sentry/react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// FPCC
import AppData from 'components/App/AppData'
import { AudiobarProvider } from 'context/AudiobarContext'
import { NotificationProvider } from 'context/NotificationContext'

import AppWrapper from 'components/App/AppWrapper'
import ConditionsOfUse from 'components/ConditionsOfUse'
import Disclaimer from 'components/Disclaimer'
import ErrorHandler from 'components/ErrorHandler'
import LandingPage from 'components/LandingPage'
import Languages from 'components/Languages'
import Loading from 'components/Loading'
import NotificationBanner from 'components/NotificationBanner'
import RequireAuth from 'common/RequireAuth'
import Site from 'components/Site'
import { GENERAL } from 'common/constants/roles'
import LegacyRedirect from './LegacyRedirect'

function AppContainer() {
  const { appIsLoading } = AppData()

  return (
    <Loading.Container isLoading={appIsLoading}>
      <Helmet>
        <title>FirstVoices</title>
        <meta
          name="description"
          content="Indigenous Language Revitalization Platform. An online space for Indigenous communities to share and promote language, oral culture, and linguistic history."
        />
      </Helmet>
      <Sentry.ErrorBoundary
        fallback={
          <AppWrapper isHome>
            <ErrorHandler.Container />
          </AppWrapper>
        }
      >
        <NotificationProvider>
          <AudiobarProvider>
            <NotificationBanner />
            <Routes>
              <Route
                path=""
                element={
                  <AppWrapper isHome>
                    <RequireAuth siteMembership={GENERAL} withMessage>
                      <LandingPage.Container />
                    </RequireAuth>
                  </AppWrapper>
                }
              />
              <Route
                path="conditions-of-use"
                element={
                  <AppWrapper>
                    <ConditionsOfUse />
                  </AppWrapper>
                }
              />
              <Route
                path="disclaimer"
                element={
                  <AppWrapper>
                    <Disclaimer />
                  </AppWrapper>
                }
              />
              <Route
                path="error"
                element={
                  <AppWrapper>
                    <ErrorHandler.Container
                      error={{ status: 404, statusText: 'Page not found' }}
                    />
                  </AppWrapper>
                }
              />
              <Route
                path="languages"
                element={
                  <AppWrapper>
                    <Languages.Container />
                  </AppWrapper>
                }
              />
              {/* Redirect legacy URLs */}
              <Route
                path="t/sections/:dialect/*"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path="explore/FV/Workspaces/Data"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path="explore/FV/Workspaces/Data/:family/:language/:dialect/*"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path="explore/FV/sections/Data/:family/:language/:dialect/*"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              {/* End of legacy URLs */}

              <Route path=":sitename/*" element={<Site.Container />} />
            </Routes>
          </AudiobarProvider>
        </NotificationProvider>
      </Sentry.ErrorBoundary>
    </Loading.Container>
  )
}

export default AppContainer
