import React from 'react'

// FPCC
import DashboardPagesData from 'components/DashboardPages/DashboardPagesData'
import DashboardPagesPresentation from 'components/DashboardPages/DashboardPagesPresentation'

function DashboardPagesContainer() {
  const {
    customPages,
    headerContent,
    pagesQueryResponse,
    site,
    sitename,
    tileContent,
  } = DashboardPagesData()
  return (
    <DashboardPagesPresentation
      headerContent={headerContent}
      tileContent={tileContent}
      customPages={customPages}
      isLoading={pagesQueryResponse?.isPending}
      site={site}
      sitename={sitename}
    />
  )
}

export default DashboardPagesContainer
