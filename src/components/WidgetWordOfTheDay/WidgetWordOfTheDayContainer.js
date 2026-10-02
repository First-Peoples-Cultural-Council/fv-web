import React from 'react'

import WidgetWordOfTheDayPresentation from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayPresentation'
import WidgetWordOfTheDayData from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayData'

function WidgetWordOfTheDayContainer() {
  const { relativeUrl, queryResponse, entry } = WidgetWordOfTheDayData()
  return (
    <WidgetWordOfTheDayPresentation
      relativeUrl={relativeUrl}
      entry={entry}
      queryResponse={queryResponse}
    />
  )
}

export default WidgetWordOfTheDayContainer
