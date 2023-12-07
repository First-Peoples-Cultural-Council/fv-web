import React from 'react'

// FPCC
import DashboardReportsData from 'components/DashboardReports/DashboardReportsData'
import DashboardLanding from 'components/DashboardLanding'
import DashboardTiles from 'components/DashboardTiles'

function DashboardReportsContainer() {
  const { tileContent, headerContent, reportTiles, site } =
    DashboardReportsData()
  return (
    <DashboardLanding.Presentation
      tileContent={tileContent}
      headerContent={headerContent}
      site={site}
    >
      <DashboardTiles.Presentation tileContent={reportTiles} />
    </DashboardLanding.Presentation>
  )
}

export default DashboardReportsContainer
