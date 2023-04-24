import React from 'react'

// FPCC
import HomeData from 'components/Home/HomeData'
import HomePresentation from 'components/Home/HomePresentation'
import WidgetArea from 'components/WidgetArea'

function HomeContainer() {
  const { backgroundId, backgroundType, title, logoId, siteId } = HomeData()

  return (
    <div data-testid="Home">
      <HomePresentation backgroundId={backgroundId} backgroundType={backgroundType} title={title} logoId={logoId} />
      <WidgetArea.Container id={siteId} />
    </div>
  )
}

export default HomeContainer
