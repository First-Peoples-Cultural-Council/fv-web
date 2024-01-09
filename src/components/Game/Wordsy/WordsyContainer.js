import React from 'react'

// FPCC
import Loading from 'components/Loading'
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'

function WordsyContainer() {
  const {
    isFetching,
    tries,
    solution,
    languageConfig,
    guesses,
    currentGuess,
    wordLength,
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
    <Loading.Container isLoading={isFetching}>
      <WordsyPresentation
        tries={tries}
        solution={solution}
        languageConfig={languageConfig}
        guesses={guesses}
        currentGuess={currentGuess}
        wordLength={wordLength}
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
    </Loading.Container>
  )
}

export default WordsyContainer
