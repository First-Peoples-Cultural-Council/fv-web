import React from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import HomePresentation from 'components/Home/HomePresentation'
import WidgetArea from 'components/WidgetArea'
import SiteDocHead from 'components/SiteDocHead'
import BannerBackground from 'components/BannerBackground'

function HomeContainer() {
  const { site } = useSiteStore()
  const { bannerImage, bannerVideo, homepageWidgets } = site

  return (
    <div data-testid="Home">
      <SiteDocHead titleArray={['Home']} />
      <BannerBackground bannerImage={bannerImage} bannerVideo={bannerVideo}>
        <HomePresentation site={site} />
      </BannerBackground>
      <WidgetArea.Container widgetData={homepageWidgets} />
    </div>
  )
}

export default HomeContainer
