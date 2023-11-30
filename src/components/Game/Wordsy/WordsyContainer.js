import React from 'react'

// FPCC
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'

function WordsyContainer() {
  const { solution, orthography, orthographyPattern, wordLength } = WordsyData()
  return (
    <WordsyPresentation
      solution={solution}
      wordLength={wordLength}
      orthography={orthography}
      orthographyPattern={orthographyPattern}
    />
  )
}

export default WordsyContainer
