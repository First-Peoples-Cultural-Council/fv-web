import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

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

const Dashboard = lazy(() => import('components/Dashboard/DashboardContainer'))

function AppContainer() {
  const { appIsLoading } = AppData()
  return (
    <Loading.Container isLoading={appIsLoading}>
      <NotificationProvider>
        <AudiobarProvider>
          <NotificationBanner />
          <Routes>
            <Route
              path=""
              element={
                <AppWrapper isHome>
                  <RequireAuth role="SuperAdmin" withMessage>
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
              path="dashboard/*"
              element={
                <RequireAuth role="Admin" withMessage>
                  <Dashboard />
                </RequireAuth>
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
                  <ErrorHandler.Container error={{ status: 404, statusText: 'Page not found' }} />
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
            <Route path=":sitename/*" element={<Site.Container />} />
          </Routes>
        </AudiobarProvider>
      </NotificationProvider>
    </Loading.Container>
  )
}

export default AppContainer
