import React from 'react'
import { Route, Routes } from 'react-router-dom'

// FPCC
import DashboardCategoriesData from 'components/DashboardCategories/DashboardCategoriesData'
import DashboardCategoriesPresentation from 'components/DashboardCategories/DashboardCategoriesPresentation'

function DashboardCategoriesContainer() {
  const { categories, headerContent, isLoading, site, sitename, tileContent } =
    DashboardCategoriesData()
  return (
    <div id="DashboardCategoriesContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardCategoriesPresentation
              headerContent={headerContent}
              tileContent={tileContent}
              categories={categories}
              isLoading={isLoading}
              site={site}
              sitename={sitename}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardCategoriesContainer
