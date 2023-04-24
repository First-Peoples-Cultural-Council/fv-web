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
import DashboardImmersiom from 'components/DashboardImmersion'
import DashboardPages from 'components/DashboardPages'
import DashboardSpeakers from 'components/DashboardSpeakers'
import DashboardWidgets from 'components/DashboardWidgets'

function DashboardEditContainer() {
  const { tileContent, headerContent, site } = DashboardEditData()
  return (
    <div id="DashboardEditContainer">
      <Routes>
        {/* Search and Lists */}
        <Route
          path="alphabet"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DashboardAlphabet.Container />
            </RequireAuth>
          }
        />
        <Route
          path="categories"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DashboardCategories.Container />
            </RequireAuth>
          }
        />
        <Route
          path="entries/*"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DashboardEntries.Container />
            </RequireAuth>
          }
        />
        <Route
          path="immersion"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DashboardImmersiom.Container />
            </RequireAuth>
          }
        />
        <Route
          path="pages"
          element={
            <RequireAuth role="Admin" withMessage>
              <DashboardPages.Container />
            </RequireAuth>
          }
        />
        <Route
          path="speakers"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DashboardSpeakers.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widgets"
          element={
            <RequireAuth role="Admin" withMessage>
              <DashboardWidgets.Container />
            </RequireAuth>
          }
        />
        {/* Individual Edit Forms */}
        <Route
          path="category"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <CategoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="character"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <CharacterCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="home"
          element={
            <RequireAuth role="Admin" withMessage>
              <HomeCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="page"
          element={
            <RequireAuth role="Admin" withMessage>
              <PageCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="phrase"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DictionaryCrud.Container docType={DOC_PHRASE} />
            </RequireAuth>
          }
        />
        <Route
          path="speaker"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <SpeakerCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="story"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <StoryCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="widget"
          element={
            <RequireAuth role="Admin" withMessage>
              <WidgetCrud.Container />
            </RequireAuth>
          }
        />
        <Route
          path="word"
          element={
            <RequireAuth role="SuperAdmin" withMessage>
              <DictionaryCrud.Container docType={DOC_WORD} />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={<DashboardEditPresentation tileContent={tileContent} headerContent={headerContent} site={site} />}
        />
      </Routes>
    </div>
  )
}

export default DashboardEditContainer
