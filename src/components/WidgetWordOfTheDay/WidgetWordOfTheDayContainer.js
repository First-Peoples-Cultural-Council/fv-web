import React from 'react'

import WidgetWordOfTheDayPresentation from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayPresentation'
import WidgetWordOfTheDayData from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayData'

function WidgetWordOfTheDayContainer() {
  const { audio, hasShare, heading, subheading, metadata, relativeUrl, title, url, isError } = WidgetWordOfTheDayData()
  return isError ? null : (
    <WidgetWordOfTheDayPresentation
      audio={audio}
      hasShare={hasShare}
      heading={heading}
      subheading={subheading}
      metadata={metadata}
      relativeUrl={relativeUrl}
      title={title}
      url={url}
    />
  )
}

export default WidgetWordOfTheDayContainer
