import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import WordsyData from 'components/Game/Wordsy/WordsyData'
import WordsyPresentation from 'components/Game/Wordsy/WordsyPresentation'
import SiteDocHead from 'components/SiteDocHead'

function WordsyContainer({ kids }) {
  const {
    queryResponse,
    tries,
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
    <>
      <SiteDocHead titleArray={['Wordsy', 'Games']} />
      <LoadOrError queryResponse={queryResponse}>
        <WordsyPresentation
          tries={tries}
          solution={queryResponse?.data?.solution}
          languageConfig={queryResponse?.languageConfig}
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
      </LoadOrError>
    </>
  )
}

const { bool } = PropTypes
WordsyContainer.propTypes = {
  kids: bool,
}

export default WordsyContainer
