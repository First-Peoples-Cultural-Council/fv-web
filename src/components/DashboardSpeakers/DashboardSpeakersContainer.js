import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardSpeakersData from 'components/DashboardSpeakers/DashboardSpeakersData'
import DashboardSpeakersPresentation from 'components/DashboardSpeakers/DashboardSpeakersPresentation'

function DashboardSpeakersContainer() {
  const { infiniteQueryResponse, headerContent, site, tileContent } =
    DashboardSpeakersData()

  return (
    <>
      <SiteDocHead titleArray={['Speakers']} />
      <DashboardSpeakersPresentation
        infiniteQueryResponse={infiniteQueryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
      />
    </>
  )
}

export default DashboardSpeakersContainer
