import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import DashboardCreateData from 'components/DashboardCreate/DashboardCreateData'
import DashboardCreatePresentation from 'components/DashboardCreate/DashboardCreatePresentation'

import CategoryCrud from 'components/CategoryCrud'
import DictionaryCrud from 'components/DictionaryCrud'
import GalleryCrud from 'components/GalleryCrud'
import PageCrud from 'components/PageCrud'
import SongCrud from 'components/SongCrud'
import SpeakerCrud from 'components/SpeakerCrud'
import StoryCrud from 'components/StoryCrud'
import WidgetCrud from 'components/WidgetCrud'
import { TYPE_PHRASE, TYPE_WORD } from 'common/constants'
import { ASSISTANT, EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'
// For removal in FW-6252
import Maintenance from 'components/Maintenance'

function DashboardCreateContainer() {
  const { tileContent, headerContent, site } = DashboardCreateData({
    urlPrefix: '',
  })
  return (
    <div id="DashboardCreateContainer">
      <Routes>
        <Route
          path="category"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <CategoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="gallery"
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <GalleryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="page"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <PageCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="phrase"
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <DictionaryCrud.Container type={TYPE_PHRASE} isCreate />
            </RequireAuth>
          }
        />
        <Route
          path="song"
          element={
            <Maintenance pageName="Song creation">
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <SongCrud.Container />
              </RequireAuth>
            </Maintenance>
          }
        />
        <Route
          path="speaker"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
              <SpeakerCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="story"
          element={
            <Maintenance pageName="Story creation">
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <StoryCrud.Container />
              </RequireAuth>
            </Maintenance>
          }
        />
        <Route
          path="widget"
          element={
            <Maintenance pageName="Widget creation">
              <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
                <WidgetCrud.Container />
              </RequireAuth>
            </Maintenance>
          }
        />
        <Route
          path="word"
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <DictionaryCrud.Container type={TYPE_WORD} isCreate />
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
