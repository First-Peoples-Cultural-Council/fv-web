import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import RequireAuth from 'common/RequireAuth'
import DashboardEditPresentation from 'components/DashboardEdit/DashboardEditPresentation'
import DashboardEditData from 'components/DashboardEdit/DashboardEditData'
import { DOC_WORD, DOC_PHRASE } from 'common/constants'

import CategoryCrud from 'components/CategoryCrud'
import CharacterCrud from 'components/CharacterCrud'
import DictionaryCrud from 'components/DictionaryCrud'
import HomeCrud from 'components/HomeCrud'
import PageCrud from 'components/PageCrud'
import SpeakerCrud from 'components/SpeakerCrud'
import StoryCrud from 'components/StoryCrud'
import WidgetCrud from 'components/WidgetCrud'

import DashboardAlphabet from 'components/DashboardAlphabet'
import DashboardCategories from 'components/DashboardCategories'
import DashboardEntries from 'components/DashboardEntries'
// import DashboardImmersiom from 'components/DashboardImmersion'
import DashboardPages from 'components/DashboardPages'
import DashboardSpeakers from 'components/DashboardSpeakers'
import DashboardWidgets from 'components/DashboardWidgets'
import { LANGUAGE_ADMIN, SUPER_ADMIN } from 'common/constants/roles'

function DashboardEditContainer() {
  const { tileContent, headerContent, site } = DashboardEditData()
  return (
    <div id="DashboardEditContainer">
      <Routes>
        {/* Search and Lists */}
        <Route
          path="alphabet"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DashboardAlphabet.Container />
            </RequireAuth>
          }
        />
        <Route
          path="categories"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DashboardCategories.Container />
            </RequireAuth>
          }
        />
        <Route
          path="entries/*"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DashboardEntries.Container />
            </RequireAuth>
          }
        />
        {/* Temp. hiding for FW-4514. */}
        {/* <Route
          path="immersion"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DashboardImmersiom.Container />
            </RequireAuth>
          }
        /> */}
        <Route
          path="pages"
          element={
            <RequireAuth role={LANGUAGE_ADMIN} withMessage>
              <DashboardPages.Container />
            </RequireAuth>
          }
        />
        <Route
          path="speakers"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <DashboardSpeakers.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widgets"
          element={
            <RequireAuth role={LANGUAGE_ADMIN} withMessage>
              <DashboardWidgets.Container />
            </RequireAuth>
          }
        />
        {/* Individual Edit Forms */}
        <Route
          path="category"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <CategoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="character"
          element={
            <RequireAuth role={SUPER_ADMIN} withMessage>
              <CharacterCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="home"
          element={
            <RequireAuth role={LANGUAGE_ADMIN} withMessage>
              <HomeCrud.Container />
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
              <DictionaryCrud.Container docType={DOC_PHRASE} />
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
              <DictionaryCrud.Container docType={DOC_WORD} />
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
