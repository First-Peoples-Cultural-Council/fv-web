import React from 'react'

// FPCC
import DashboardImportsPresentation from 'components/DashboardImports/DashboardImportsPresentation'
import DashboardImportsData from 'components/DashboardImports/DashboardImportsData'
import DashboardLanding from 'components/DashboardLanding'
import SiteDocHead from 'components/SiteDocHead'

function DashboardImportsContainer() {
  const {
    queryResponse,
    deleteImport,
    headerContent,
    tileContent,
    site,
    page,
    setPage,
  } = DashboardImportsData()
  return (
    <div id="DashboardImportsContainer">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <SiteDocHead titleArray={['Imports']} />
        <div className="px-2">
          <DashboardImportsPresentation
            queryResponse={queryResponse}
            deleteImport={deleteImport}
            page={page}
            setPage={setPage}
          />
        </div>
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardImportsContainer
