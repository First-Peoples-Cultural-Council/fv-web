import React from 'react'

// FPCC
import DashboardCategoriesData from 'components/DashboardCategories/DashboardCategoriesData'
import DashboardCategoriesPresentation from 'components/DashboardCategories/DashboardCategoriesPresentation'

function DashboardCategoriesContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardCategoriesData()
  return (
    <DashboardCategoriesPresentation
      queryResponse={queryResponse}
      headerContent={headerContent}
      tileContent={tileContent}
      site={site}
    />
  )
}

export default DashboardCategoriesContainer
