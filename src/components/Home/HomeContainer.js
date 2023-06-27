import React from 'react'

// FPCC
import HomeData from 'components/Home/HomeData'
import HomePresentation from 'components/Home/HomePresentation'
// import WidgetArea from 'components/WidgetArea'
// Temporarily commenting out WidgetArea until WIdget API is built and functional

function HomeContainer() {
  const { backgroundId, backgroundType, site } = HomeData()

  return (
    <div data-testid="Home">
      <HomePresentation
        backgroundId={backgroundId}
        backgroundType={backgroundType}
        site={site}
      />
      {/* <WidgetArea.Container id={siteId} /> */}
    </div>
  )
}

export default HomeContainer
