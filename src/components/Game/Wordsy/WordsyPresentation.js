import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Grid from 'components/Game/Wordsy/Grid/Grid'
import Keyboard from 'components/Game/Wordsy/Keyboard/Keyboard'
import SectionTitle from 'components/SectionTitle'
import InfoModal from 'components/Game/Wordsy/Modals/InfoModal'
import EndGameModal from 'components/Game/Wordsy/Modals/EndGameModal'
import WarningModal from 'components/Game/Wordsy/Modals/WarningModal'

const MIN_VALID_WORDS = 30

function WordsyPresentation({
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
}) {
  return (
    <section
      className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white"
      data-testid="WordsyContainer"
    >
      <SectionTitle.Presentation title="WORDSY" accentColor="primary" />

      <button
        type="button"
        onClick={() => setInfoModalOpen(true)}
        onKeyDown={() => setInfoModalOpen(true)}
        className="flex mx-auto justify-center p-1 m-1"
      >
        {getIcon(
          'InfoCircleSolid',
          'h-5 w-5 cursor-pointer fill-current text-primary',
        )}
      </button>

      {/* If less than 30 words or valid guesses present, display error message */}
      {languageConfig?.words?.length >= MIN_VALID_WORDS &&
      languageConfig?.validGuesses?.length >= MIN_VALID_WORDS ? (
        <div className="space-y-2 lg:space-y-4">
          <Grid
            tries={tries}
            guesses={guesses}
            solution={solution}
            currentGuess={currentGuess}
            orthographyPattern={languageConfig?.orthographyPattern}
            wordLength={wordLength}
          />

          <Keyboard
            orthography={languageConfig?.orthography}
            onChar={onChar}
            onEnter={onEnter}
            onDelete={onDelete}
            solution={solution}
            guesses={guesses}
            orthographyPattern={languageConfig?.orthographyPattern}
          />
        </div>
      ) : (
        <p className="text-fv-charcoal mt-2 text-center">
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

      <InfoModal
        isOpen={infoModalOpen}
        closeHandler={() => setInfoModalOpen(false)}
      />

      <WarningModal
        isOpen={notEnoughLettersModalOpen}
        closeHandler={() => setNotEnoughLettersModalOpen(false)}
        message="Not Enough Letters."
      />

      <WarningModal
        isOpen={wordNotFoundModalOpen}
        closeHandler={() => setWordNotFoundModalOpen(false)}
        message="Word not found."
      />

      <EndGameModal
        isModalOpen={isEndGameModalOpen}
        setIsModalOpen={setIsEndGameModalOpen}
        status={endGameModalContent?.status}
        text={endGameModalContent?.text}
        solution={solution}
      />
    </section>
  )
}

const { array, bool, func, number, object, string } = PropTypes

WordsyPresentation.propTypes = {
  tries: number,
  solution: string,
  guesses: array,
  currentGuess: array,
  languageConfig: object,
  wordLength: number,
  onChar: func,
  onEnter: func,
  onDelete: func,
  infoModalOpen: bool,
  setInfoModalOpen: func,
  notEnoughLettersModalOpen: bool,
  setNotEnoughLettersModalOpen: func,
  wordNotFoundModalOpen: bool,
  setWordNotFoundModalOpen: func,
  isEndGameModalOpen: bool,
  setIsEndGameModalOpen: func,
  endGameModalContent: object,
}

export default WordsyPresentation
