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
      <section className="py-3 md:py-6">
        <WidgetArea.Container widgetData={homepageWidgets} />
      </section>
    </div>
  )
}

export default HomeContainer
