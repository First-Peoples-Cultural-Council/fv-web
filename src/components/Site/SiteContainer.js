import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import SiteFrame from 'components/Site/SiteFrame'
import SiteFrameKids from 'components/Site/SiteFrameKids'
import SiteFrameEmbed from 'components/Site/SiteFrameEmbed'
import ScrollToTopOnMount from 'common/ScrollToTopOnMount'
import SiteData from 'components/Site/SiteData'
import Loading from 'components/Loading'
import { ASSISTANT } from 'common/constants/roles'

const Dashboard = lazy(() => import('components/Dashboard/DashboardContainer'))

function SiteContainer() {
  const { siteLoading } = SiteData()
  return (
    <div id="SiteContainer">
      <ScrollToTopOnMount />
      <Routes>
        <Route
          path="dashboard/*"
          element={
            <Loading.Container isLoading={siteLoading}>
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <Dashboard />
              </RequireAuth>
            </Loading.Container>
          }
        />
        <Route
          path="kids/*"
          element={<SiteFrameKids siteLoading={siteLoading} />}
        />
        <Route
          path="widgets/*"
          element={<SiteFrameEmbed siteLoading={siteLoading} />}
        />
        <Route path="*" element={<SiteFrame siteLoading={siteLoading} />} />
      </Routes>
    </div>
  )
}

export default SiteContainer
