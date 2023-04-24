import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardMediaPresentation from 'components/DashboardMedia/DashboardMediaPresentation'
import DashboardMediaData from 'components/DashboardMedia/DashboardMediaData'
import MediaBrowser from 'components/MediaBrowser'

function DashboardMediaContainer() {
  const { tileContent, headerContent, site, docType } = DashboardMediaData()
  return (
    <div id="DashboardMediaContainer">
      <Routes>
        <Route path="browser" element={<MediaBrowser.Container docType={docType} />} />
        <Route
          path=""
          element={<DashboardMediaPresentation tileContent={tileContent} headerContent={headerContent} site={site} />}
        />
      </Routes>
    </div>
  )
}

export default DashboardMediaContainer
