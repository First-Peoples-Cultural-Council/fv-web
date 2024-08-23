import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardMediaPresentation from 'components/DashboardMedia/DashboardMediaPresentation'
import DashboardMediaData from 'components/DashboardMedia/DashboardMediaData'
import DashboardAudioList from 'components/DashboardAudioList'
import MediaBrowser from 'components/MediaBrowser'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants/searchParams'

function DashboardMediaContainer() {
  const { tileContent, headerContent, site } = DashboardMediaData()
  return (
    <div id="DashboardMediaContainer">
      <Routes>
        <Route path="audio" element={<DashboardAudioList.Container />} />
        <Route
          path="images"
          element={<MediaBrowser.Container type={TYPE_IMAGE} />}
        />
        <Route
          path="videos"
          element={<MediaBrowser.Container type={TYPE_VIDEO} />}
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
