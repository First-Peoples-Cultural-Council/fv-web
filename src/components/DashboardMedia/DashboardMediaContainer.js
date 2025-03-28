import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardMediaPresentation from 'components/DashboardMedia/DashboardMediaPresentation'
import DashboardMediaData from 'components/DashboardMedia/DashboardMediaData'
import DashboardMediaAudio from 'components/DashboardMediaAudio'
import DashboardMediaDocuments from 'components/DashboardMediaDocuments'
import DashboardMediaVisual from 'components/DashboardMediaVisual'
import {
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from 'common/constants'

function DashboardMediaContainer() {
  const { tileContent, headerContent, site } = DashboardMediaData()
  return (
    <div id="DashboardMediaContainer">
      <Routes>
        <Route path={AUDIO_PATH} element={<DashboardMediaAudio.Container />} />
        <Route
          path={DOCUMENT_PATH}
          element={<DashboardMediaDocuments.Container />}
        />
        <Route
          path={IMAGE_PATH}
          element={<DashboardMediaVisual.Container type={TYPE_IMAGE} />}
        />
        <Route
          path={VIDEO_PATH}
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
