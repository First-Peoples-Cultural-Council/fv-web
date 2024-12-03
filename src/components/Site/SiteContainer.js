import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import SiteFrame from 'components/Site/SiteFrame'
import SiteFrameKids from 'components/Site/SiteFrameKids'
import SiteFrameEmbed from 'components/Site/SiteFrameEmbed'
import ScrollToTopOnMount from 'common/ScrollToTopOnMount'
import SiteData from 'components/Site/SiteData'
import LoadOrError from 'components/LoadOrError'
import { ASSISTANT } from 'common/constants/roles'

const Dashboard = lazy(() => import('components/Dashboard/DashboardContainer'))

function SiteContainer() {
  const { queryReturn } = SiteData()
  return (
    <div id="SiteContainer">
      <ScrollToTopOnMount />
      <LoadOrError queryReturn={queryReturn}>
        <Routes>
          <Route
            path="dashboard/*"
            element={
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="kids/*" element={<SiteFrameKids />} />
          <Route path="widgets/*" element={<SiteFrameEmbed />} />
          <Route path="*" element={<SiteFrame />} />
        </Routes>
      </LoadOrError>
    </div>
  )
}

export default SiteContainer
