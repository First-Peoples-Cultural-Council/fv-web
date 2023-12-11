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
  let gameStatus = ''
  if (gameCompleted) {
    gameStatus = validAnswer ? 'Won' : 'Lost'
  }

  // Conditional styling
  const baseTextBlockStyling =
    'border-black flex items-center justify-center my-2 mr-2 px-4 py-2 rounded h-12 w-min-12'
  const baseButtonStyling =
    'border border-gray-300 rounded-lg shadow-sm py-2 px-4 mx-2 text-sm font-medium text-fv-charcoal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light'
  const checkAnswerButtonStyling = `${baseButtonStyling} bg-secondary text-white hover:bg-secondary-light`
  let selectedBoxAdditionalStyling = 'bg-gray-100'
  if (gameStatus === 'Won') {
    selectedBoxAdditionalStyling = 'bg-word'
  } else if (gameStatus === 'Lost') {
    selectedBoxAdditionalStyling = 'bg-story'
  }

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
          <div className="mx-auto mt-16 w-1/2 md:w-2/3 sm:w-full rounded-lg bg-white shadow-md border-2 border-gray-50">
            <div className="px-4 py-5 sm:p-6" data-testid="card-content">
              <div className="header" data-testid="translations">
                <p className="my-2 text-left text-xl">
                  {translation || 'No translation available'}
                </p>
              </div>
              <div
                data-testid="selected-boxes"
                className={`flex flex-row shadow my-4 border-thin border-gray-300 rounded px-2 ${selectedBoxAdditionalStyling}`}
              >
                {/* Placeholder till a user selects does any action to maintain styling. */}
                {selectedWords?.length === 0 && (
                  <div className={`${baseTextBlockStyling} bg-gray-100`}> </div>
                )}
                {/* Selected words */}
                {selectedWords?.map((word) => (
                  <button
                    type="button"
                    key={`selectedWords-${word}`}
                    className={`${baseTextBlockStyling} bg-gray-100 shadow-md border-thin border-gray-300`}
                    onClick={() => wordClicked(word)}
                    disabled={gameCompleted && validAnswer}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div data-testid="jumbled-words" className="flex flex-row">
                {/* Jumbled words, turns invisible if selected. */}
                {jumbledWords?.map((word) =>
                  selectedWords?.includes(word) ? (
                    <div
                      key={`disabledWords-${word}`}
                      className={`${baseTextBlockStyling} invisible`}
                    >
                      {word}
                    </div>
                  ) : (
                    <button
                      type="button"
                      key={`jumbledWords-${word}`}
                      className={`${baseTextBlockStyling} bg-gray-100 shadow-md border-thin border-gray-300`}
                      onClick={() => wordClicked(word)}
                      onKeyDown={() => wordClicked(word)}
                      disabled={gameCompleted && validAnswer}
                    >
                      {word}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div
              data-testid="card-footer"
              className={`flex flex-row bg-gray-50 px-4 py-4 sm:px-6 ${
                !gameCompleted ? 'justify-end' : 'justify-center'
              }`}
            >
              {gameStatus === 'Won' && (
                <p>
                  {getIcon('CheckCircleSolid', 'h-8 w-8 inline fill-word mx-2')}
                  Great Job!
                </p>
              )}
              {gameStatus === 'Lost' && (
                <div className="flex flex-row justify-around w-3/4">
                  <button
                    type="button"
                    onClick={() => resetGame()}
                    className="inline"
                  >
                    {getIcon(
                      'CheckCircleSolid',
                      'h-8 w-8 inline fill-word mx-2',
                    )}
                    Try again!
                  </button>
                  <p>Need a hint? Listen to the phrase:</p>
                </div>
              )}
              {!gameCompleted && (
                <div data-testid="action-buttons">
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
                    className={baseButtonStyling}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-fv-charcoal mt-2">
            This site does not currently have enough dictionary content for the
            phrase scrambler game.
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
