import React from 'react'

// FPCC
import DashboardReportsData from 'components/DashboardReports/DashboardReportsData'
import DashboardLanding from 'components/DashboardLanding'

function DashboardReportsContainer() {
  const { tileContent, headerContent, site } = DashboardReportsData()
  return (
    <DashboardLanding.Presentation
      tileContent={tileContent}
      headerContent={headerContent}
      site={site}
    />
  )
}

export default DashboardReportsContainer
