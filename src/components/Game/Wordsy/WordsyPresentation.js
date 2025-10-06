import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Grid from 'components/Game/Wordsy/Grid/Grid'
import Keyboard from 'components/Game/Wordsy/Keyboard/Keyboard'
import SectionTitle from 'components/SectionTitle'
import Modal from 'components/Modal'
import InfoModal from 'components/Game/Wordsy/Modals/InfoModal'
import EndGameModal from 'components/Game/Wordsy/Modals/EndGameModal'
import WarningModal from 'components/Game/Wordsy/Modals/WarningModal'

const MIN_VALID_WORDS = 30

function WordsyPresentation({
  tries,
  data,
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
}) {
  const getModalContent = (status) => {
    switch (status) {
      case 'win':
      case 'lost':
        return (
          <EndGameModal
            status={modalData?.status}
            text={modalData?.text}
            solution={data?.solution}
          />
        )
      case 'warning':
        return <WarningModal text={modalData?.text} />
      default:
        return <InfoModal />
    }
  }

  const openInfoModal = () => {
    setModalData(null)
    setIsModalOpen(true)
  }

  return (
    <section
      className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white"
      data-testid="WordsyContainer"
    >
      <SectionTitle.Presentation title="WORDSY" />

      <button
        data-testid="info-btn"
        type="button"
        onClick={() => openInfoModal()}
        onKeyDown={() => openInfoModal()}
        className="flex mx-auto justify-center p-1 m-1"
      >
        {getIcon(
          'InfoCircleSolid',
          'h-5 w-5 cursor-pointer fill-current text-blumine-800',
        )}
      </button>

      {/* If less than 30 words or valid guesses present, display error message */}
      {data?.words?.length >= MIN_VALID_WORDS &&
      data?.validGuesses?.length >= MIN_VALID_WORDS ? (
        <div className="space-y-2 lg:space-y-4">
          <Grid
            tries={tries}
            guesses={guesses}
            solution={data?.solution}
            currentGuess={currentGuess}
            orthographyPattern={data?.orthographyPattern}
            wordLength={wordLength}
          />

          <Keyboard
            orthography={data?.orthography}
            onChar={onChar}
            onEnter={onEnter}
            onDelete={onDelete}
            solution={data?.solution}
            guesses={guesses}
            orthographyPattern={data?.orthographyPattern}
          />
        </div>
      ) : (
        <p className="text-charcoal-900 mt-2 text-center">
          This site does not currently have enough dictionary content for the
          wordsy game.
          <br />
          Please contact{' '}
          <a href="mailto:hello@firstvoices.com" className="inline-url">
            hello@firstvoices.com
          </a>{' '}
          for more information.
        </p>
      )}

      <Modal.Presentation
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
      >
        {getModalContent(modalData?.status)}
      </Modal.Presentation>
    </section>
  )
}

const { array, bool, func, number, object } = PropTypes

WordsyPresentation.propTypes = {
  data: object,
  tries: number,
  guesses: array,
  currentGuess: array,
  wordLength: number,
  onChar: func,
  onEnter: func,
  onDelete: func,
  isModalOpen: bool,
  setIsModalOpen: func,
  modalData: object,
  setModalData: func,
}

export default WordsyPresentation
