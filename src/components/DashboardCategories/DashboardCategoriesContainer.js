import React from 'react'

// FPCC
import DashboardCategoriesData from 'components/DashboardCategories/DashboardCategoriesData'
import DashboardCategoriesPresentation from 'components/DashboardCategories/DashboardCategoriesPresentation'

function DashboardCategoriesContainer() {
  const {
    categories,
    categoriesQueryReturn,
    headerContent,
    site,
    sitename,
    tileContent,
  } = DashboardCategoriesData()
  return (
    <DashboardCategoriesPresentation
      headerContent={headerContent}
      tileContent={tileContent}
      categories={categories}
      isLoading={categoriesQueryReturn?.isPending}
      site={site}
      sitename={sitename}
    />
  )
}

export default DashboardCategoriesContainer
