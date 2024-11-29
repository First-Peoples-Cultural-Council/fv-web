import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'
import SiteDocHead from 'components/SiteDocHead'

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
    isModalOpen,
    setIsModalOpen,
    modalData,
    setModalData,
  } = WordsyData({ kids })
  return (
    <Loading.Container isLoading={isFetching}>
      <SiteDocHead titleArray={['Wordsy', 'Games']} />
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
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
        setModalData={setModalData}
      />
    </Loading.Container>
  )
}

const { bool } = PropTypes
WordsyContainer.propTypes = {
  kids: bool,
}

export default WordsyContainer
