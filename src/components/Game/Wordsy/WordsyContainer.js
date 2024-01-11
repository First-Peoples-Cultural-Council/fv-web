import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'

function WordsyContainer({ kids }) {
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
    isEndGameModalOpen,
    setIsEndGameModalOpen,
    endGameModalContent,
  } = WordsyData({ kids })
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
        isEndGameModalOpen={isEndGameModalOpen}
        setIsEndGameModalOpen={setIsEndGameModalOpen}
        endGameModalContent={endGameModalContent}
      />
    </Loading.Container>
  )
}

const { bool } = PropTypes
WordsyContainer.propTypes = {
  kids: bool,
}

export default WordsyContainer
