import React from 'react'

// FPCC
import DashboardReportsData from 'components/DashboardReports/DashboardReportsData'
import DashboardLanding from 'components/DashboardLanding'
import DashboardTiles from 'components/DashboardTiles'
import SiteDocHead from 'components/SiteDocHead'

function DashboardReportsContainer() {
  const { tileContent, headerContent, reportTiles, site } =
    DashboardReportsData()
  return (
    <DashboardLanding.Presentation
      tileContent={tileContent}
      headerContent={headerContent}
      site={site}
    >
      <SiteDocHead titleArray={['Reports']} />
      <div className="mx-auto max-w-7xl px-8">
        <DashboardTiles.Presentation tileContent={reportTiles} />
      </div>
    </DashboardLanding.Presentation>
  )
}

export default DashboardReportsContainer
