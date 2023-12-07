import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'

function PhraseScramblerPresentation({
  translation,
  jumbledWords,
  selectedWords,
  gameCompleted,
  validAnswer,
  wordClicked,
  checkAnswer,
  resetGame,
}) {
  const baseTextBlockStyling =
    'border-black flex items-center justify-center m-2 px-4 py-2 rounded h-12 w-min-12'
  const selectedOptionBoxesStyling = `${baseTextBlockStyling} bg-lime-200`

  const baseButtonStyling =
    'text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
  const checkAnswerButtonStyling = `${baseButtonStyling} bg-blue-700 hover:bg-blue-800 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
  const resetGameButtonStyling = `${baseButtonStyling} bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`

  return (
    <section
      data-testid="PhraseScramblerPresentation"
      className="mt-4 py-2 md:py-4 lg:py-8 bg-white"
    >
      <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <SectionTitle.Presentation
            title="PHRASE SCRAMBLER"
            accentColor="primary"
          />
          <p className="italic text-fv-charcoal mt-2">Unscramble to win !!</p>
        </div>
        {/* If no entry is present that satisfies the condition for the game to be played, display an error message */}
        {translation && jumbledWords.length ? (
          <div className="mx-auto mt-16 border-solid border-2 w-1/2 md:w-2/3 sm:w-full rounded-md p-4 shadow-md">
            <div className="header flex flex-row justify-between">
              <div data-testid="translation">
                <p className="my-2 text-left font-semibold">
                  {translation || 'No translation available'}
                </p>
              </div>
              <div>
                {gameCompleted &&
                  (validAnswer
                    ? getIcon('CheckCircleSolid', 'h-6 w-6 fill-green')
                    : getIcon('Exclamation', 'h-6 w-6 fill-red'))}
              </div>
            </div>
            <hr />
            <div data-testid="selected-option-boxes" className="flex flex-row">
              {/* Placeholder till a user selects does any action to maintain styling. */}
              {selectedWords?.length === 0 && (
                <button
                  type="button"
                  className={`${selectedOptionBoxesStyling} bg-white`}
                >
                  {' '}
                </button>
              )}
              {/* Selected words */}
              {selectedWords?.map((word) => (
                <button
                  type="button"
                  key={`selectedWords-${word}`}
                  className={selectedOptionBoxesStyling}
                  onClick={() => wordClicked(word)}
                  disabled={gameCompleted && validAnswer}
                >
                  {word}
                </button>
              ))}
            </div>
            <hr className="my-4" />
            <div
              data-testid="actions"
              className="flex flex-row justify-between"
            >
              <div
                data-testid="available-option-boxes"
                className="flex flex-row"
              >
                {/* Jumbled words with different styling to denote if they have been added to the selectedWords list. */}
                {jumbledWords?.map((word) =>
                  selectedWords?.includes(word) ? (
                    <button
                      type="button"
                      key={`disabledWords-${word}`}
                      className={`${baseTextBlockStyling} bg-gray-700 text-white disabled cursor-default`}
                    >
                      {word}
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={`jumbledWords-${word}`}
                      className={`${baseTextBlockStyling} bg-gray-300`}
                      onClick={() => wordClicked(word)}
                      onKeyDown={() => wordClicked(word)}
                      disabled={gameCompleted && validAnswer}
                    >
                      {word}
                    </button>
                  ),
                )}
              </div>
              <div data-testid="action-buttons" className="mt-2">
                <button
                  type="button"
                  disabled={gameCompleted && validAnswer}
                  onClick={() => checkAnswer()}
                  className={
                    gameCompleted && validAnswer
                      ? `${checkAnswerButtonStyling} bg-gray-100 text-black cursor-not-allowed`
                      : checkAnswerButtonStyling
                  }
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={() => resetGame()}
                  className={resetGameButtonStyling}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-fv-charcoal mt-16">
            Could not generate a PhraseScrambler game using the current
            dictionary.
            <br />
            Please contact the help desk.
          </p>
        )}
      </div>
    </section>
  )
}

// PROPTYPES
const { array, bool, func, string } = PropTypes

PhraseScramblerPresentation.propTypes = {
  translation: string,
  jumbledWords: array,
  selectedWords: array,
  gameCompleted: bool,
  validAnswer: bool,
  wordClicked: func,
  checkAnswer: func,
  resetGame: func,
}

export default PhraseScramblerPresentation
