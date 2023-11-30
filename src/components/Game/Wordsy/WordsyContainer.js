import React from 'react'

// FPCC
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'

function WordsyContainer() {
  const {
    tries,
    solution,
    languageConfig,
    guesses,
    currentGuess,
    onChar,
    onEnter,
    onDelete,
    infoModalOpen,
    setInfoModalOpen,
    notEnoughLettersModalOpen,
    setNotEnoughLettersModalOpen,
    wordNotFoundModalOpen,
    setWordNotFoundModalOpen,
    isWinModalOpen,
    setIsWinModalOpen,
    isLostModalOpen,
    setIsLostModalOpen,
  } = WordsyData()
  return (
    <WordsyPresentation
      tries={tries}
      solution={solution}
      languageConfig={languageConfig}
      guesses={guesses}
      currentGuess={currentGuess}
      onChar={onChar}
      onEnter={onEnter}
      onDelete={onDelete}
      infoModalOpen={infoModalOpen}
      setInfoModalOpen={setInfoModalOpen}
      notEnoughLettersModalOpen={notEnoughLettersModalOpen}
      setNotEnoughLettersModalOpen={setNotEnoughLettersModalOpen}
      wordNotFoundModalOpen={wordNotFoundModalOpen}
      setWordNotFoundModalOpen={setWordNotFoundModalOpen}
      isWinModalOpen={isWinModalOpen}
      setIsWinModalOpen={setIsWinModalOpen}
      isLostModalOpen={isLostModalOpen}
      setIsLostModalOpen={setIsLostModalOpen}
    />
  )
}

export default WordsyContainer
