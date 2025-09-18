import React from 'react'

// FPCC
import LandingPageData from 'components/LandingPage/LandingPageData'
import LandingBanner from 'components/LandingBanner'
import LandingKeyboards from 'components/LandingKeyboards'
import LandingWhy from 'components/LandingWhy'
import WidgetArea from 'components/WidgetArea'

function LandingPageContainer() {
  const { aboutData, quotesData, appsData } = LandingPageData()
  return (
    <div id="LandingPageContainer">
      <LandingBanner.Container />
      <LandingWhy.Presentation />
      <WidgetArea.Container widgetData={[aboutData, quotesData, appsData]} />
      <LandingKeyboards.Presentation />
    </div>
  )
}

export default LandingPageContainer
