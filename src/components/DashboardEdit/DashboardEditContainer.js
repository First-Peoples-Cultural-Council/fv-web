import React from 'react'
import { Route, Routes } from 'react-router'

// FPCC
import RequireAuth from 'common/RequireAuth'
import DashboardEditPresentation from 'components/DashboardEdit/DashboardEditPresentation'
import DashboardEditData from 'components/DashboardEdit/DashboardEditData'
import {
  TYPE_WORD,
  TYPE_PHRASE,
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from 'common/constants'

import AudioCrud from 'components/AudioCrud'
import CategoryCrud from 'components/CategoryCrud'
import CharacterCrud from 'components/CharacterCrud'
import DictionaryCrud from 'components/DictionaryCrud'
import DocumentCrud from 'components/DocumentCrud'
import GalleryCrud from 'components/GalleryCrud'
import HomeCrud from 'components/HomeCrud'
import ImageCrud from 'components/ImageCrud'
import PageCrud from 'components/PageCrud'
import SongCrud from 'components/SongCrud'
import SpeakerCrud from 'components/SpeakerCrud'
import StoryCrud from 'components/StoryCrud'
import VideoCrud from 'components/VideoCrud'
import WidgetCrud from 'components/WidgetCrud'

import DashboardAlphabet from 'components/DashboardAlphabet'
import DashboardCategories from 'components/DashboardCategories'
import DashboardEntries from 'components/DashboardEntries'
import DashboardGalleries from 'components/DashboardGalleries'
import DashboardImmersiom from 'components/DashboardImmersion'
import DashboardPages from 'components/DashboardPages'
import DashboardSpeakers from 'components/DashboardSpeakers'
import DashboardWidgets from 'components/DashboardWidgets'
import { ASSISTANT, EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'
// For removal in FW-6252
import Maintenance from 'components/Maintenance'

function DashboardEditContainer() {
  const { tileContent, headerContent, site } = DashboardEditData({
    urlPrefix: '',
  })
  return (
    <div id="DashboardEditContainer">
      <Routes>
        {/* Search and Lists */}
        <Route
          path="alphabet"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <DashboardAlphabet.Container />
            </RequireAuth>
          }
        />
        <Route
          path="categories"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <DashboardCategories.Container />
            </RequireAuth>
          }
        />
        <Route
          path="entries/*"
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <DashboardEntries.Container />
            </RequireAuth>
          }
        />
        <Route
          path="galleries/*"
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <DashboardGalleries.Container />
            </RequireAuth>
          }
        />
        <Route
          path="immersion"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <DashboardImmersiom.Container />
            </RequireAuth>
          }
        />
        <Route
          path="pages"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <DashboardPages.Container />
            </RequireAuth>
          }
        />
        <Route
          path="speakers"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
              <DashboardSpeakers.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widgets"
          element={
            <Maintenance pageName="Widget editing">
              <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
                <DashboardWidgets.Container />
              </RequireAuth>
            </Maintenance>
          }
        />
        {/* Individual Edit Forms */}
        <Route
          path={AUDIO_PATH}
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <AudioCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="category"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <CategoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="character"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <CharacterCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path={DOCUMENT_PATH}
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <DocumentCrud.Container />
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
          path="home"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <HomeCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path={IMAGE_PATH}
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <ImageCrud.Container />
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
              <DictionaryCrud.Container type={TYPE_PHRASE} />
            </RequireAuth>
          }
        />
        <Route
          path="song"
          element={
            <Maintenance pageName="Song editing">
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
            <Maintenance pageName="Story editing">
              <RequireAuth siteMembership={ASSISTANT} withMessage>
                <StoryCrud.Container />
              </RequireAuth>
            </Maintenance>
          }
        />
        <Route
          path={VIDEO_PATH}
          element={
            <RequireAuth siteMembership={ASSISTANT} withMessage>
              <VideoCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widget"
          element={
            <Maintenance pageName="Widget editing">
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
              <DictionaryCrud.Container type={TYPE_WORD} />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <DashboardEditPresentation
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

export default DashboardEditContainer
