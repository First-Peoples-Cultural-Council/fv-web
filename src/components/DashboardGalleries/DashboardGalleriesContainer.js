import React from 'react'

// FPCC
import DashboardGalleriesData from 'components/DashboardGalleries/DashboardGalleriesData'
import DashboardGalleriesPresentation from 'components/DashboardGalleries/DashboardGalleriesPresentation'
import DashboardLanding from 'components/DashboardLanding'

function DashboardGalleriesContainer() {
  const { galleries, headerContent, isLoading, site, sitename, tileContent } =
    DashboardGalleriesData()
  return (
    <div id="DashboardGalleriesContainer">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardGalleriesPresentation
          galleries={galleries}
          isLoading={isLoading}
          site={site}
          sitename={sitename}
        />
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardGalleriesContainer
