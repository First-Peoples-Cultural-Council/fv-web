import React from 'react'

// FPCC
import DashboardPagesData from 'components/DashboardPages/DashboardPagesData'
import DashboardPagesPresentation from 'components/DashboardPages/DashboardPagesPresentation'

function DashboardPagesContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardPagesData()
  return (
    <DashboardPagesPresentation
      queryResponse={queryResponse}
      headerContent={headerContent}
      tileContent={tileContent}
      site={site}
    />
  )
}

export default DashboardPagesContainer
