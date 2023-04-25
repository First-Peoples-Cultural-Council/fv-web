import React from 'react'

// FPCC
import LandingAboutData from 'components/LandingAbout/LandingAboutData'
import WidgetTextPresentation from 'components/WidgetText/WidgetTextPresentation'

function LandingAboutContainer() {
  const data = LandingAboutData()

  return <WidgetTextPresentation widgetData={data} />
}

export default LandingAboutContainer
