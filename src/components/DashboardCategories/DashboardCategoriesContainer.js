import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardCategoriesData from 'components/DashboardCategories/DashboardCategoriesData'
import DashboardCategoriesPresentation from 'components/DashboardCategories/DashboardCategoriesPresentation'

function DashboardCategoriesContainer() {
  const { queryResponse, headerContent, site, tileContent } =
    DashboardCategoriesData()
  return (
    <>
      <SiteDocHead titleArray={['Categories']} />
      <DashboardCategoriesPresentation
        queryResponse={queryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
      />
    </>
  )
}

export default DashboardCategoriesContainer
