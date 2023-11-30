import React from 'react'

// FPCC
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'

function WordsyContainer() {
  const { solution, orthography, orthographyPattern, languageConfig } =
    WordsyData()
  return (
    <WordsyPresentation
      solution={solution}
      languageConfig={languageConfig}
      orthography={orthography}
      orthographyPattern={orthographyPattern}
    />
  )
}

export default WordsyContainer
