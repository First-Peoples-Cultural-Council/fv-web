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
    isError,
    sitename,
    entry,
  } = WidgetWordOfTheDayData()
  return isError ? null : (
    <WidgetWordOfTheDayPresentation
      audio={audio}
      wordTitle={wordTitle}
      translations={translations}
      partOfSpeech={partOfSpeech}
      relativeUrl={relativeUrl}
      title={title}
      url={url}
      sitename={sitename}
      entry={entry}
    />
  )
}

export default WidgetWordOfTheDayContainer
