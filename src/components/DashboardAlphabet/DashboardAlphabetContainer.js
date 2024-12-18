import React from 'react'

// FPCC
import DashboardAlphabetData from 'components/DashboardAlphabet/DashboardAlphabetData'
import DashboardAlphabetPresentation from 'components/DashboardAlphabet/DashboardAlphabetPresentation'

function DashboardAlphabetContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardAlphabetData()
  return (
    <DashboardAlphabetPresentation
      queryResponse={queryResponse}
      headerContent={headerContent}
      tileContent={tileContent}
      site={site}
    />
  )
}

export default DashboardAlphabetContainer
