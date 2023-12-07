import React from 'react'

// FPCC
import Loading from 'components/Loading'
import PhraseScramblerPresentation from 'components/Game/PhraseScrambler/PhraseScramblerPresentation'
import PhraseScramblerData from 'components/Game/PhraseScrambler/PhraseScramblerData'

function PhraseScramblerContainer() {
  const {
    isInitialLoading,
    translation,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
  } = PhraseScramblerData()

  return (
    <Loading.Container isLoading={isInitialLoading}>
      <PhraseScramblerPresentation
        translation={translation}
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

export default PhraseScramblerContainer
