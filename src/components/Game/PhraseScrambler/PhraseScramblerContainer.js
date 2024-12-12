import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import PhraseScramblerPresentation from 'components/Game/PhraseScrambler/PhraseScramblerPresentation'
import PhraseScramblerData from 'components/Game/PhraseScrambler/PhraseScramblerData'
import SiteDocHead from 'components/SiteDocHead'

function PhraseScramblerContainer({ kids }) {
  const {
    queryResponse,
    translations,
    relatedAudio,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
    newGame,
  } = PhraseScramblerData({ kids })

  return (
    <>
      <SiteDocHead titleArray={['Phrase Scrambler', 'Games']} />
      <LoadOrError queryResponse={queryResponse}>
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
          newGame={newGame}
        />
      </LoadOrError>
    </>
  )
}

const { bool } = PropTypes
PhraseScramblerContainer.propTypes = {
  kids: bool,
}

export default PhraseScramblerContainer
