import React from 'react'

//FPCC
import LandingPageData from 'components/LandingPage/LandingPageData'
import LandingBanner from 'components/LandingBanner'
import LandingKeyboards from 'components/LandingKeyboards'
import WidgetArea from '../WidgetArea/index'

function LandingPageContainer() {
  const { landingPageUid } = LandingPageData()
  return (
    <div id="LandingPageContainer">
      <LandingBanner.Container />
      <WidgetArea.Container id={landingPageUid} />
      <LandingKeyboards.Container />
    </div>
  )
}

export default LandingPageContainer
