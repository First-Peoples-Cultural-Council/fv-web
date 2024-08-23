import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardMediaPresentation from 'components/DashboardMedia/DashboardMediaPresentation'
import DashboardMediaData from 'components/DashboardMedia/DashboardMediaData'
import MediaBrowser from 'components/MediaBrowser'
import {
  TYPE_AUDIO,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from 'common/constants/searchParams'

function DashboardMediaContainer() {
  const { tileContent, headerContent, site } = DashboardMediaData()
  return (
    <div id="DashboardMediaContainer">
      <Routes>
        <Route
          path="audio"
          element={<MediaBrowser.Container docType={TYPE_AUDIO} />}
        />
        <Route
          path="images"
          element={<MediaBrowser.Container docType={TYPE_IMAGE} />}
        />
        <Route
          path="videos"
          element={<MediaBrowser.Container docType={TYPE_VIDEO} />}
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
