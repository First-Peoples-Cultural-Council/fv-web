import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import PhraseScramblerPresentation from 'components/Game/PhraseScrambler/PhraseScramblerPresentation'
import PhraseScramblerData from 'components/Game/PhraseScrambler/PhraseScramblerData'

function PhraseScramblerContainer({ kids }) {
  const {
    isInitialLoading,
    translations,
    relatedAudio,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
  } = PhraseScramblerData({ kids })

  return (
    <Loading.Container isLoading={isInitialLoading}>
      <PhraseScramblerPresentation
        translations={translations}
        relatedAudio={relatedAudio}
        jumbledWords={jumbledWords}
        selectedWords={selectedWords}
        gameCompleted={gameCompleted}
        validAnswer={validAnswer}
        wordClicked={wordClicked}
        checkAnswer={checkAnswer}
        resetGame={resetGame}
      />
    </Loading.Container>
  )
}

const { bool } = PropTypes
PhraseScramblerContainer.propTypes = {
  kids: bool,
}

export default PhraseScramblerContainer
