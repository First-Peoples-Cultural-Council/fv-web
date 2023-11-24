import React from 'react'

// FPCC
import Loading from 'components/Loading'
import WordScramblePresentation from 'components/Game/WordScramble/WordScramblePresentation'

function WordScrambleContainer() {
  return (
    <Loading.Container isLoading={false}>
      <WordScramblePresentation />
    </Loading.Container>
  )
}

export default WordScrambleContainer
