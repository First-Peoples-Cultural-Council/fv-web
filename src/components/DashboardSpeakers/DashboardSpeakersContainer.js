import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardSpeakersData from 'components/DashboardSpeakers/DashboardSpeakersData'
import DashboardSpeakersPresentation from 'components/DashboardSpeakers/DashboardSpeakersPresentation'

function DashboardSpeakersContainer() {
  const { speakers, headerContent, isLoading, site, sitename, tileContent } = DashboardSpeakersData()
  return (
    <div id="DashboardSpeakersContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardSpeakersPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              speakers={speakers}
              isLoading={isLoading}
              site={site}
              sitename={sitename}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardSpeakersContainer
