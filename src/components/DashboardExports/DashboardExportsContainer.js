import React from 'react'

// FPCC
import DashboardExportsPresentation from 'components/DashboardExports/DashboardExportsPresentation'
import DashboardExportsData from 'components/DashboardExports/DashboardExportsData'
import DashboardLanding from 'components/DashboardLanding'
import SiteDocHead from 'components/SiteDocHead'

function DashboardExportsContainer() {
  const {
    queryResponse,
    deleteExport,
    headerContent,
    tileContent,
    site,
    page,
    setPage,
  } = DashboardExportsData()
  return (
    <div id="DashboardExportsContainer">
      <DashboardLanding.Presentation headerContent={headerContent} site={site}>
        <SiteDocHead titleArray={['Exports']} />

        <DashboardExportsPresentation
          queryResponse={queryResponse}
          deleteExport={deleteExport}
          page={page}
          setPage={setPage}
          tileContent={tileContent}
        />
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardExportsContainer
