import React from 'react'
import * as Sentry from '@sentry/react'
import { Routes, Route, Navigate } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'

// FPCC
import AppData from 'components/App/AppData'
import AppWrapper from 'components/App/AppWrapper'
import { AudiobarProvider } from 'context/AudiobarContext'
import { NotificationProvider } from 'context/NotificationContext'

import About from 'components/About'
import MobileApps from 'components/MobileApps'
import ConditionsOfUse from 'components/ConditionsOfUse'
import Disclaimer from 'components/Disclaimer'
import DocHead from 'components/DocHead'
import ErrorHandler from 'components/ErrorHandler'
import Keyboards from 'components/Keyboards'
import LandingPage from 'components/LandingPage'
import Languages from 'components/Languages'
import Loading from 'components/Loading'
import NotificationBanner from 'components/NotificationBanner'
import SearchAllSites from 'components/SearchAllSites'
import Site from 'components/Site'
import Support from 'components/Support'
import LegacyRedirect from './LegacyRedirect'

function AppContainer() {
  const { appIsLoading } = AppData()

  return (
    <Loading.Container isLoading={appIsLoading}>
      <Sentry.ErrorBoundary fallback={<ErrorHandler.Container />}>
        <HelmetProvider>
          <NotificationProvider>
            <AudiobarProvider>
              <DocHead />
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
                      <About />
                    </AppWrapper>
                  }
                />
                <Route
                  path="apps"
                  element={
                    <AppWrapper>
                      <MobileApps.Container />
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
                      <SearchAllSites.Container />
                    </AppWrapper>
                  }
                />
                {/* Redirect legacy URLs */}
                <Route path="en/apps" element={<Navigate to="/apps" />} />
                <Route path="en/games" element={<Navigate to="/" />} />
                <Route path="content/apps" element={<Navigate to="/apps" />} />
                <Route path="home" element={<Navigate to="/" />} />
                <Route path="kids" element={<Navigate to="/" />} />
                <Route
                  path="en/:dialect/:type/:uuid/*"
                  caseSensitive={false}
                  element={<LegacyRedirect />}
                />
                <Route
                  path="en/:dialect/:type"
                  caseSensitive={false}
                  element={<LegacyRedirect />}
                />
                <Route
                  path="en/:dialect/*"
                  caseSensitive={false}
                  element={<LegacyRedirect />}
                />
                <Route
                  path="t/:area/:dialect/:type"
                  caseSensitive={false}
                  element={<LegacyRedirect />}
                />
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
        </HelmetProvider>
      </Sentry.ErrorBoundary>
    </Loading.Container>
  )
}

export default AppContainer
