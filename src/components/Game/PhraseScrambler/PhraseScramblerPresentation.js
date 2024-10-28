import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import { isWordInNestedArray } from 'common/utils/gameHelpers'

function PhraseScramblerPresentation({
  translations,
  relatedAudio,
  jumbledWords,
  selectedWords,
  gameCompleted,
  validAnswer,
  wordClicked,
  checkAnswer,
  resetGame,
  newGame,
}) {
  let gameStatus = ''
  if (gameCompleted) {
    gameStatus = validAnswer ? 'Won' : 'Lost'
  }

  // Conditional styling
  const baseTextBlockStyling =
    'border-black flex items-center justify-center my-2 mr-2 px-4 py-2 rounded h-12 w-min-12'
  const baseButtonStyling =
    'border border-gray-300 rounded-lg shadow-sm py-2 px-4 mx-2 text-sm font-medium text-charcoal-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light'
  const checkAnswerButtonStyling = `${baseButtonStyling} bg-blumine-700 text-white hover:bg-blumine-500`
  let selectedBoxAdditionalStyling = 'bg-gray-100'
  if (gameStatus === 'Won') {
    selectedBoxAdditionalStyling = 'bg-jade-500'
  } else if (gameStatus === 'Lost') {
    selectedBoxAdditionalStyling = 'bg-ochre-600'
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
          <p className="italic text-charcoal-900 mt-2">Unscramble to win !!</p>
        </div>
        {/* If no entry is present that satisfies the condition for the game to be played, display an error message */}
        {translations?.length && jumbledWords?.length ? (
          <div>
            <div className="mx-auto mt-16 w-full rounded-lg bg-white shadow-md border-2 border-gray-50">
              <div className="px-4 py-5 sm:p-6" data-testid="card-content">
                <div className="header" data-testid="translations">
                  {translations?.map((translation, index) => (
                    <p key={translation} className="my-2 text-left text-xl">
                      {/* Show ordered list if more than one translation is available, else just show one translation. */}
                      {translations?.length > 1 && `${index + 1}.`}
                      {translation || 'No translation available'}
                    </p>
                  ))}
                </div>
                <div
                  data-testid="selected-boxes"
                  className={`shadow my-4 border-thin border-gray-300 rounded px-2 ${selectedBoxAdditionalStyling}`}
                >
                  {/* Placeholder till a user selects does any action to maintain styling. */}
                  {selectedWords?.length === 0 && (
                    <div className={`${baseTextBlockStyling} bg-transparent`}>
                      {' '}
                    </div>
                  )}
                  {/* Selected words */}
                  {selectedWords?.map((row, _rowIdx) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`selectedWordsRow-${_rowIdx}`} // NOSONAR
                      className="flex md:flex-row flex-col"
                    >
                      {row?.map((wordObj) => (
                        <button
                          data-testid="word-btn"
                          type="button"
                          key={`selectedWords-${wordObj?.id}`}
                          className={`${baseTextBlockStyling} bg-gray-100 shadow-md border-thin border-gray-300`}
                          onClick={() => wordClicked(wordObj)}
                          disabled={gameCompleted && validAnswer}
                        >
                          {wordObj?.text}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <div data-testid="jumbled-words">
                  {/* Jumbled words, turns invisible if selected. */}
                  {jumbledWords?.map((row, _rowIdx) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`jumbledWordsRow-${_rowIdx}`} // NOSONAR
                      className="flex md:flex-row flex-col"
                    >
                      {row?.map((wordObj) =>
                        isWordInNestedArray(selectedWords, wordObj) ? (
                          <div
                            key={`disabledWords-${wordObj?.id}`}
                            className={`${baseTextBlockStyling} invisible`}
                          >
                            {wordObj?.text}
                          </div>
                        ) : (
                          <button
                            data-testid="word-btn"
                            type="button"
                            key={`jumbledWords-${wordObj?.id}`}
                            className={`${baseTextBlockStyling} bg-gray-100 shadow-md border-thin border-gray-300`}
                            onClick={() => wordClicked(wordObj)}
                            onKeyDown={() => wordClicked(wordObj)}
                            disabled={gameCompleted && validAnswer}
                          >
                            {wordObj?.text}
                          </button>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                data-testid="card-footer"
                className="flex flex-row bg-gray-50 px-4 py-4 sm:px-6 justify-center"
              >
                {gameStatus === 'Won' && (
                  <div>
                    <p className="inline">
                      {getIcon(
                        'CheckCircleSolid',
                        'h-8 w-8 inline fill-word mx-2',
                      )}
                      Great Job!
                    </p>
                    {relatedAudio?.length > 0 && (
                      <AudioButton
                        audioArray={relatedAudio}
                        iconStyling="inline fill-current text-charcoal-500 hover:text-charcoal-900 h-6 w-6 ml-2"
                        hoverTooltip
                      />
                    )}
                  </div>
                )}
                {gameStatus === 'Lost' && (
                  <div className="flex flex-row justify-around w-3/4">
                    <button
                      data-testid="TryAgainButton"
                      type="button"
                      onClick={() => resetGame()}
                      className="inline font-bold py-2 pl-4 pr-6 border-gray-200 shadow-md rounded-md"
                    >
                      {getIcon(
                        'TryAgain',
                        'h-8 w-8 inline fill-story mx-2 stroke-2',
                      )}
                      Try again!
                    </button>
                    {relatedAudio?.length > 0 && (
                      <div className="mt-4">
                        <p className="inline align-center">
                          Need a hint? Listen to the phrase:
                        </p>
                        <AudioButton
                          audioArray={relatedAudio}
                          iconStyling="inline fill-current text-charcoal-500 hover:text-charcoal-900 h-6 w-6"
                          hoverTooltip
                        />
                      </div>
                    )}
                  </div>
                )}
                {!gameCompleted && (
                  <div data-testid="action-buttons">
                    <button
                      data-testid="checkButton"
                      type="button"
                      onClick={() => checkAnswer()}
                      className={checkAnswerButtonStyling}
                    >
                      Check
                    </button>
                    <button
                      data-testid="resetButton"
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
            <button
              data-testid="loadButton"
              type="button"
              onClick={() => newGame()}
              className={`${checkAnswerButtonStyling} mt-4 py-4 px-8`}
            >
              Load a new phrase
            </button>
          </div>
        ) : (
          <p className="text-charcoal-900 mt-2">
            This site does not currently have enough dictionary content for the
            phrase scrambler game.
            <br />
            Please contact{' '}
            <a href="mailto:hello@firstvoices.com" className="inline-url">
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
const { array, bool, func } = PropTypes

PhraseScramblerPresentation.propTypes = {
  translations: array,
  relatedAudio: array,
  jumbledWords: array,
  selectedWords: array,
  gameCompleted: bool,
  validAnswer: bool,
  wordClicked: func,
  checkAnswer: func,
  resetGame: func,
  newGame: func,
}

export default PhraseScramblerPresentation
