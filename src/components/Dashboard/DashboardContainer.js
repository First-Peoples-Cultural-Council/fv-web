import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardPresentation from 'components/Dashboard/DashboardPresentation'
import DashboardData from 'components/Dashboard/DashboardData'
import RequireAuth from 'common/RequireAuth'
import DashboardHome from 'components/DashboardHome'
import DashboardEdit from 'components/DashboardEdit'
import DashboardEntries from 'components/DashboardEntries'
import DashboardCreate from 'components/DashboardCreate'
import DashboardMedia from 'components/DashboardMedia'
import DashboardReports from 'components/DashboardReports'
import Loading from 'components/Loading'
import { ASSISTANT } from 'common/constants/roles'

function DashboardContainer() {
  const { currentUser, site, homeTiles, isLoading, logout } = DashboardData()
  return (
    <Loading.Container isLoading={isLoading}>
      <DashboardPresentation
        currentUser={currentUser}
        site={site}
        logout={logout}
      >
        <Routes>
          <Route
            path="profile"
            element={
              <div className="px-6 text-2xl">User Profile placeholder</div>
            }
          />
          <Route
            path="support"
            element={
              <div className="flex h-screen items-center justify-center">
                <a
                  href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
                  target="_blank"
                  rel="noreferrer"
                  className="w-screen mx-auto text-center underline px-6 text-2xl"
                >
                  Go to the FirstVoices support portal.
                </a>
              </div>
            }
          />
          <Route
            path="create/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <DashboardCreate.Container />
              </RequireAuth>
            }
          />
          <Route
            path="edit/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <DashboardEdit.Container />
              </RequireAuth>
            }
          />
          <Route
            path="media/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <DashboardMedia.Container />
              </RequireAuth>
            }
          />
          <Route
            path="reports/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <DashboardReports.Container />
              </RequireAuth>
            }
          />
          <Route
            path="advanced-search/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <DashboardEntries.Container advancedSearch />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <DashboardHome.Presentation
                tiles={homeTiles}
                currentUser={currentUser}
                site={site}
                logout={logout}
              />
            }
          />
        </Routes>
      </DashboardPresentation>
    </Loading.Container>
  )
}

export default DashboardContainer
