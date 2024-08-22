import React from 'react'
import * as Sentry from '@sentry/react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// FPCC
import AboutFV from 'components/AboutFV'
import AppData from 'components/App/AppData'
import { AudiobarProvider } from 'context/AudiobarContext'
import { NotificationProvider } from 'context/NotificationContext'

import AppWrapper from 'components/App/AppWrapper'
import ConditionsOfUse from 'components/ConditionsOfUse'
import Disclaimer from 'components/Disclaimer'
import ErrorHandler from 'components/ErrorHandler'
import FVApps from 'components/FVApps'
import Keyboards from 'components/Keyboards'
import LandingPage from 'components/LandingPage'
import Languages from 'components/Languages'
import Loading from 'components/Loading'
import NotificationBanner from 'components/NotificationBanner'
import Search from 'components/Search'
import Site from 'components/Site'
import Support from 'components/Support'
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
      <Sentry.ErrorBoundary fallback={<ErrorHandler.Container />}>
        <NotificationProvider>
          <AudiobarProvider>
            <NotificationBanner />
            <Routes>
              <Route
                path=""
                element={
                  <AppWrapper isHome>
                    <LandingPage.Container />
                  </AppWrapper>
                }
              />
              <Route
                path="about"
                element={
                  <AppWrapper>
                    <AboutFV />
                  </AppWrapper>
                }
              />
              <Route
                path="apps"
                element={
                  <AppWrapper>
                    <FVApps />
                  </AppWrapper>
                }
              />
              <Route
                path="support"
                element={
                  <AppWrapper>
                    <Support />
                  </AppWrapper>
                }
              />
              <Route
                path="keyboards"
                element={
                  <AppWrapper>
                    <Keyboards />
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
                    <ErrorHandler.Container />
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
              <Route
                path="search"
                element={
                  <AppWrapper>
                    <Search.Container />
                  </AppWrapper>
                }
              />
              {/* Redirect legacy URLs */}
              <Route
                path="t/:area/:dialect/*"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path="explore/FV/:area/Data"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path=":exploreOrKids/FV/:area/Data/:family/:language/:dialect/learn/:type/:uuid"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path=":exploreOrKids/FV/:area/Data/:family/:language/:dialect/learn/:type"
                caseSensitive={false}
                element={<LegacyRedirect />}
              />
              <Route
                path=":exploreOrKids/FV/:area/Data/:family/:language/:dialect/*"
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
