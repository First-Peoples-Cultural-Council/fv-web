import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardMediaPresentation from 'components/DashboardMedia/DashboardMediaPresentation'
import DashboardMediaData from 'components/DashboardMedia/DashboardMediaData'
import DashboardMediaAudio from 'components/DashboardMediaAudio'
import DashboardMediaVisual from 'components/DashboardMediaVisual'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants/searchParams'

function DashboardMediaContainer() {
  const { tileContent, headerContent, site } = DashboardMediaData()
  return (
    <div id="DashboardMediaContainer">
      <Routes>
        <Route path="audio" element={<DashboardMediaAudio.Container />} />
        <Route
          path="images"
          element={<DashboardMediaVisual.Container type={TYPE_IMAGE} />}
        />
        <Route
          path="videos"
          element={<DashboardMediaVisual.Container type={TYPE_VIDEO} />}
        />

        <Route
          path=""
          element={
            <DashboardMediaPresentation
              tileContent={tileContent}
              headerContent={headerContent}
              site={site}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardMediaContainer
