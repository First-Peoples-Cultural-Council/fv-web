import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardWidgetsData from 'components/DashboardWidgets/DashboardWidgetsData'
import DashboardWidgetsPresentation from 'components/DashboardWidgets/DashboardWidgetsPresentation'

function DashboardWidgetsContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardWidgetsData()
  return (
    <>
      {' '}
      <SiteDocHead titleArray={['Widgets']} />
      <DashboardWidgetsPresentation
        queryResponse={queryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
      />
    </>
  )
}

export default DashboardWidgetsContainer
