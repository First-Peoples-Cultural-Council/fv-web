import React from 'react'

// FPCC
import LandingAbout from 'components/LandingAbout'
import LandingApps from 'components/LandingApps'
import LandingBanner from 'components/LandingBanner'
import LandingKeyboards from 'components/LandingKeyboards'
import LandingQuotes from 'components/LandingQuotes'
import LandingWhy from 'components/LandingWhy'

function LandingPageContainer() {
  return (
    <div id="LandingPageContainer">
      <LandingBanner.Presentation />
      <LandingWhy.Presentation />
      <LandingAbout />
      <LandingQuotes />
      <LandingApps />
      <LandingKeyboards.Presentation />
    </div>
  )
}

export default LandingPageContainer
