import React from 'react'

//FPCC
import LandingBannerData from 'components/LandingBanner/LandingBannerData'
import LandingBannerPresentation from 'components/LandingBanner/LandingBannerPresentation'

function LandingBannerContainer() {
  const data = LandingBannerData()
  return <LandingBannerPresentation data={data} />
}

export default LandingBannerContainer
