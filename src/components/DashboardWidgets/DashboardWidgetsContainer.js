import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardWidgetsData from 'components/DashboardWidgets/DashboardWidgetsData'
import DashboardWidgetsPresentation from 'components/DashboardWidgets/DashboardWidgetsPresentation'

function DashboardWidgetsContainer() {
  const { widgets, headerContent, isLoading, site, tileContent } = DashboardWidgetsData()
  return (
    <div id="DashboardWidgetsContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardWidgetsPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              widgets={widgets}
              isLoading={isLoading}
              site={site}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardWidgetsContainer
