import React from 'react'

// FPCC
import DashboardWidgetsData from 'components/DashboardWidgets/DashboardWidgetsData'
import DashboardWidgetsPresentation from 'components/DashboardWidgets/DashboardWidgetsPresentation'

function DashboardWidgetsContainer() {
  const { widgets, headerContent, widgetsQueryReturn, site, tileContent } =
    DashboardWidgetsData()
  return (
    <DashboardWidgetsPresentation
      headerContent={headerContent}
      tileContent={tileContent}
      widgets={widgets}
      isLoading={widgetsQueryReturn?.isPending}
      site={site}
    />
  )
}

export default DashboardWidgetsContainer
