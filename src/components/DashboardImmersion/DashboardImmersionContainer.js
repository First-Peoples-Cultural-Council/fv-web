import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardImmersionData from 'components/DashboardImmersion/DashboardImmersionData'
import DashboardImmersionPresentation from 'components/DashboardImmersion/DashboardImmersionPresentation'

function DashboardImmersionContainer() {
  const { labels, headerContent, isLoading, site, tileContent } = DashboardImmersionData()
  return (
    <div id="DashboardImmersionContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardImmersionPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              labels={labels}
              isLoading={isLoading}
              site={site}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardImmersionContainer
