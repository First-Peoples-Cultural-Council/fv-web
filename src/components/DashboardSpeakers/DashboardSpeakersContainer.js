import React from 'react'

// FPCC
import DashboardSpeakersData from 'components/DashboardSpeakers/DashboardSpeakersData'
import DashboardSpeakersPresentation from 'components/DashboardSpeakers/DashboardSpeakersPresentation'

function DashboardSpeakersContainer() {
  const {
    speakers,
    headerContent,
    peopleQueryReturn,
    site,
    sitename,
    tileContent,
  } = DashboardSpeakersData()
  return (
    <DashboardSpeakersPresentation
      headerContent={headerContent}
      tileContent={tileContent}
      speakers={speakers}
      isLoading={peopleQueryReturn?.isPending}
      site={site}
      sitename={sitename}
    />
  )
}

export default DashboardSpeakersContainer
