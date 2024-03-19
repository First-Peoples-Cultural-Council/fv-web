import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import DashboardEditPresentation from 'components/DashboardEdit/DashboardEditPresentation'
import DashboardEditData from 'components/DashboardEdit/DashboardEditData'
import { TYPE_WORD, TYPE_PHRASE, AUDIO } from 'common/constants'

import CategoryCrud from 'components/CategoryCrud'
import CharacterCrud from 'components/CharacterCrud'
import DictionaryCrud from 'components/DictionaryCrud'
import GalleryCrud from 'components/GalleryCrud'
import HomeCrud from 'components/HomeCrud'
import PageCrud from 'components/PageCrud'
import SongCrud from 'components/SongCrud'
import SpeakerCrud from 'components/SpeakerCrud'
import StoryCrud from 'components/StoryCrud'
import WidgetCrud from 'components/WidgetCrud'
import MediaEdit from 'components/MediaEdit'

import DashboardAlphabet from 'components/DashboardAlphabet'
import DashboardCategories from 'components/DashboardCategories'
import DashboardEntries from 'components/DashboardEntries'
import DashboardGalleries from 'components/DashboardGalleries'
import DashboardImmersiom from 'components/DashboardImmersion'
import DashboardPages from 'components/DashboardPages'
import DashboardSpeakers from 'components/DashboardSpeakers'
import DashboardWidgets from 'components/DashboardWidgets'
import { EDITOR, LANGUAGE_ADMIN } from 'common/constants/roles'

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
            <RequireAuth siteMembership={EDITOR} withMessage>
              <DashboardEntries.Container />
            </RequireAuth>
          }
        />
        <Route
          path="galleries/*"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
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
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <DashboardWidgets.Container />
            </RequireAuth>
          }
        />
        {/* Individual Edit Forms */}
        <Route
          path="audio"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <MediaEdit.Container type={AUDIO} />
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
          path="gallery"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
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
            <RequireAuth siteMembership={EDITOR} withMessage>
              <DictionaryCrud.Container type={TYPE_PHRASE} />
            </RequireAuth>
          }
        />
        <Route
          path="song"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
              <SongCrud.Container />
            </RequireAuth>
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
            <RequireAuth siteMembership={EDITOR} withMessage>
              <StoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widget"
          element={
            <RequireAuth siteMembership={LANGUAGE_ADMIN} withMessage>
              <WidgetCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="word"
          element={
            <RequireAuth siteMembership={EDITOR} withMessage>
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
