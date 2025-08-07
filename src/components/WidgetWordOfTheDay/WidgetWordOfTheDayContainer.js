import React from 'react'

import WidgetWordOfTheDayPresentation from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayPresentation'
import WidgetWordOfTheDayData from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayData'

function WidgetWordOfTheDayContainer() {
  const {
    audio,
    wordTitle,
    translations,
    partOfSpeech,
    relativeUrl,
    title,
    url,
    queryResponse,
    entry,
  } = WidgetWordOfTheDayData()
  return (
    <WidgetWordOfTheDayPresentation
      audio={audio}
      wordTitle={wordTitle}
      translations={translations}
      partOfSpeech={partOfSpeech}
      relativeUrl={relativeUrl}
      title={title}
      url={url}
      entry={entry}
      queryResponse={queryResponse}
    />
  )
}

export default WidgetWordOfTheDayContainer
