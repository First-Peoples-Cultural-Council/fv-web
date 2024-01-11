import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Cell from 'components/Game/Wordsy/Utils/Rows/Cell'
import Grid from 'components/Game/Wordsy/Utils/Grid'
import Keyboard from 'components/Game/Wordsy/Utils/Keyboard/Keyboard'
import SectionTitle from 'components/SectionTitle'

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
      <div className="flex w-80 mx-auto items-center mb-8">
        <SectionTitle.Presentation title="WORDSY" accentColor="primary" />
        <button
          type="button"
          onClick={() => setInfoModalOpen(true)}
          onKeyDown={() => setInfoModalOpen(true)}
        >
          {getIcon('InfoCircleSolid', 'h-6 w-6 cursor-pointer')}
        </button>
      </div>

      {/* If less than 30 words or valid guesses present, display error message */}
      {languageConfig?.words?.length >= MIN_VALID_WORDS &&
      languageConfig?.validGuesses?.length >= MIN_VALID_WORDS ? (
        <div>
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
          <a
            href="mailto:hello@firstvoices.com"
            className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
          >
            hello@firstvoices.com
          </a>{' '}
          for more information.
        </p>
      )}

      {/* Info modal */}
      <Modal.Presentation
        isOpen={infoModalOpen}
        closeHandler={() => setInfoModalOpen(false)}
      >
        <div className="bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            How to play
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Guess the word of the day in 6 tries. After each guess, the color
              of the tiles will change to show how close your guess was to the
              word.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="W" status="correct" />
              <Cell value="E" />
              <Cell value="A" />
              <Cell value="R" />
              <Cell value="Y" />
            </div>
            <p className="text-sm text-gray-500">
              The letter W is in the word and in the correct spot.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="P" />
              <Cell value="I" />
              <Cell value="L" status="present" />
              <Cell value="O" />
              <Cell value="T" />
            </div>
            <p className="text-sm text-gray-500">
              The letter L is in the word but in the wrong spot.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="V" />
              <Cell value="A" />
              <Cell value="G" />
              <Cell value="U" status="absent" />
              <Cell value="E" />
            </div>
            <p className="text-sm text-gray-500">
              The letter U is not in the word in any spot.
            </p>
          </div>
        </div>
      </Modal.Presentation>

      {/* Not enough letters modal */}
      <Modal.Presentation
        isOpen={notEnoughLettersModalOpen}
        closeHandler={() => setNotEnoughLettersModalOpen(false)}
      >
        <div className="bg-rose-200 text-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
          <h3 className="text-sm text-center font-medium text-gray-900">
            Not Enough Letters
          </h3>
        </div>
      </Modal.Presentation>

      {/* Word not found modal */}
      <Modal.Presentation
        isOpen={wordNotFoundModalOpen}
        closeHandler={() => setWordNotFoundModalOpen(false)}
      >
        <div className="bg-rose-200 text-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
          <h3 className="text-sm text-center font-medium text-gray-900">
            Word not found
          </h3>
        </div>
      </Modal.Presentation>

      {/* End Game Modal */}
      <Modal.Presentation
        isOpen={isEndGameModalOpen}
        closeHandler={() => setIsEndGameModalOpen(false)}
      >
        <div
          className={`${
            endGameModalContent.status === 'win'
              ? 'bg-green-200'
              : 'bg-red-200 text-white'
          } rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full`}
        >
          <h3 className="text-sm text-center font-medium text-gray-900">
            {endGameModalContent.text}
          </h3>
        </div>
      </Modal.Presentation>
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
