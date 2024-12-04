import React from 'react'

// FPCC
import LandingPageData from 'components/LandingPage/LandingPageData'
import LandingBanner from 'components/LandingBanner'
import LandingKeyboards from 'components/LandingKeyboards'
import WidgetArea from '../WidgetArea/index'

function LandingPageContainer() {
  const { whyData, aboutData, quotesData, appsData } = LandingPageData()
  return (
    <div id="LandingPageContainer">
      <LandingBanner.Container />
      <WidgetArea.Container
        widgetData={[whyData, aboutData, quotesData, appsData]}
      />
      <LandingKeyboards.Container />
    </div>
  )
}

export default LandingPageContainer
