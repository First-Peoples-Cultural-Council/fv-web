import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import DashboardCreateData from 'components/DashboardCreate/DashboardCreateData'
import DashboardCreatePresentation from 'components/DashboardCreate/DashboardCreatePresentation'

import CategoryCrud from 'components/CategoryCrud'
import DictionaryCrud from 'components/DictionaryCrud'
import PageCrud from 'components/PageCrud'
import SpeakerCrud from 'components/SpeakerCrud'
import StoryCrud from 'components/StoryCrud'
import WidgetCrud from 'components/WidgetCrud'
import { DOC_PHRASE, DOC_WORD } from 'common/constants'
import { LANGUAGE_ADMIN, SUPER_ADMIN } from 'common/constants/roles'

function DashboardCreateContainer() {
  const { tileContent, headerContent, site } = DashboardCreateData()
  return (
    <div id="DashboardCreateContainer">
      <Routes>
        <Route
          path="category"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <CategoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="page"
          element={
            <RequireAuth role={LANGUAGE_ADMIN} withMessage>
              <PageCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="phrase"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DictionaryCrud.Container docType={DOC_PHRASE} isCreate />
            </RequireAuth>
          }
        />
        <Route
          path="speaker"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <SpeakerCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="story"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <StoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widget"
          element={
            <RequireAuth role={LANGUAGE_ADMIN} withMessage>
              <WidgetCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="word"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DictionaryCrud.Container docType={DOC_WORD} isCreate />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <DashboardCreatePresentation
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

export default DashboardCreateContainer
