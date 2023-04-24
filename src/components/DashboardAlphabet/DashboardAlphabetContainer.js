import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardAlphabetData from 'components/DashboardAlphabet/DashboardAlphabetData'
import DashboardAlphabetPresentation from 'components/DashboardAlphabet/DashboardAlphabetPresentation'

function DashboardAlphabetContainer() {
  const { characters, headerContent, isLoading, site, sitename, tileContent } = DashboardAlphabetData()
  return (
    <div id="DashboardAlphabetContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardAlphabetPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              characters={characters}
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

export default DashboardAlphabetContainer
