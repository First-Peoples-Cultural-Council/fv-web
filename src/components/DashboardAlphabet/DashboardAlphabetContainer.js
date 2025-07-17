import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardAlphabetData from 'components/DashboardAlphabet/DashboardAlphabetData'
import DashboardAlphabetPresentation from 'components/DashboardAlphabet/DashboardAlphabetPresentation'

function DashboardAlphabetContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardAlphabetData()
  return (
    <>
      <SiteDocHead titleArray={['Alphabet']} />
      <DashboardAlphabetPresentation
        queryResponse={queryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
      />
    </>
  )
}

export default DashboardAlphabetContainer
