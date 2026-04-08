import React from 'react'

// FPCC
import DashboardWidgetsData from 'components/DashboardWidgets/DashboardWidgetsData'
import DashboardWidgetsPresentation from 'components/DashboardWidgets/DashboardWidgetsPresentation'

function DashboardWidgetsContainer() {
  const { infiniteQueryResponse, headerContent, site, tileContent } =
    DashboardWidgetsData()
  return (
    <DashboardWidgetsPresentation
      infiniteQueryResponse={infiniteQueryResponse}
      headerContent={headerContent}
      tileContent={tileContent}
      site={site}
    />
  )
}

export default DashboardWidgetsContainer
