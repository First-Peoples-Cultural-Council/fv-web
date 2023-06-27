import React from 'react'

// FPCC
import HomeData from 'components/Home/HomeData'
import HomePresentation from 'components/Home/HomePresentation'
// import WidgetArea from 'components/WidgetArea'
// Temporarily commenting out WidgetArea until WIdget API is built and functional

function HomeContainer() {
  const { bannerMedia, bannerType, site } = HomeData()

  return (
    <div data-testid="Home">
      <HomePresentation
        bannerMedia={bannerMedia}
        bannerType={bannerType}
        site={site}
      />
      {/* <WidgetArea.Container id={siteId} /> */}
    </div>
  )
}

export default HomeContainer
