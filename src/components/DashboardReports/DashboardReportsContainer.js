import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardReportsData from 'components/DashboardReports/DashboardReportsData'
import DashboardLanding from 'components/DashboardLanding'
import DashboardTiles from 'components/DashboardTiles'

function DashboardReportsContainer() {
  const { tileContent, headerContent, reportTiles, site } =
    DashboardReportsData()
  return (
    <>
      <SiteDocHead titleArray={['Reports']} />
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <div className="mx-auto max-w-7xl px-8">
          <DashboardTiles.Presentation tileContent={reportTiles} />
        </div>
      </DashboardLanding.Presentation>
    </>
  )
}

export default DashboardReportsContainer
