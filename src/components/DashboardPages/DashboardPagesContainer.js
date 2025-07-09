import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardPagesData from 'components/DashboardPages/DashboardPagesData'
import DashboardPagesPresentation from 'components/DashboardPages/DashboardPagesPresentation'

function DashboardPagesContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardPagesData()
  return (
    <>
      <SiteDocHead titleArray={['Custom Pages']} />
      <DashboardPagesPresentation
        queryResponse={queryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
      />
    </>
  )
}

export default DashboardPagesContainer
