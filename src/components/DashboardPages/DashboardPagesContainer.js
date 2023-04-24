import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardPagesData from 'components/DashboardPages/DashboardPagesData'
import DashboardPagesPresentation from 'components/DashboardPages/DashboardPagesPresentation'

function DashboardPagesContainer() {
  const { customPages, headerContent, isLoading, site, sitename, tileContent } = DashboardPagesData()
  return (
    <div id="DashboardPagesContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardPagesPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              customPages={customPages}
              isLoading={isLoading}
              site={site}
              sitename={sitename}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardPagesContainer
