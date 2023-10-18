import React from 'react'

// FPCC
import HomeData from 'components/Home/HomeData'
import HomePresentation from 'components/Home/HomePresentation'
import WidgetArea from 'components/WidgetArea'

function HomeContainer() {
  const { bannerMedia, bannerType, site, widgetData } = HomeData()
  console.log({ widgetData })

  return (
    <div data-testid="Home">
      <HomePresentation
        bannerMedia={bannerMedia}
        bannerType={bannerType}
        site={site}
      />
      <WidgetArea.Container widgetData={widgetData} />
    </div>
  )
}

export default HomeContainer
