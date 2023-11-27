import React from 'react'

// FPCC
import Loading from 'components/Loading'
import WordScramblePresentation from 'components/Game/WordScramble/WordScramblePresentation'
import WordScrambleData from 'components/Game/WordScramble/WordScrambleData'

function WordScrambleContainer() {
  const {
    translation,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
  } = WordScrambleData()

  return (
    <Loading.Container isLoading={false}>
      <WordScramblePresentation
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

export default WordScrambleContainer
