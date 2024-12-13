import React from 'react'

// FPCC
import DashboardGalleriesData from 'components/DashboardGalleries/DashboardGalleriesData'
import DashboardGalleriesPresentation from 'components/DashboardGalleries/DashboardGalleriesPresentation'
import DashboardLanding from 'components/DashboardLanding'

function DashboardGalleriesContainer() {
  const { galleriesQueryResponse, headerContent, site, tileContent } =
    DashboardGalleriesData()
  return (
    <div id="DashboardGalleriesContainer">
      <DashboardLanding.Presentation
        headerContent={headerContent}
        site={site}
        tileContent={tileContent}
      >
        <DashboardGalleriesPresentation
          galleriesQueryResponse={galleriesQueryResponse}
          site={site}
        />
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardGalleriesContainer
