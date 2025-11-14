import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'

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
  let gameStatus = 'In progress'
  let selectedBoxAdditionalStyling = 'bg-charcoal-50 border-charcoal-200'

  if (gameCompleted) {
    gameStatus = validAnswer ? 'Won' : 'Lost'
    selectedBoxAdditionalStyling = validAnswer
      ? 'bg-jade-500 border-jade-600'
      : 'bg-ochre-600 border-ochre-700'
  }

  const wordBlockStyling =
    'flex items-center justify-center my-2 mr-2 px-4 py-2 rounded-lg h-12 w-min-12 bg-charcoal-50 shadow-md border border-charcoal-200'

  return (
    <section
      data-testid="PhraseScramblerPresentation"
      className="py-2 md:py-4 lg:py-8 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle.Presentation title="PHRASE SCRAMBLER" />
        <p className="italic text-charcoal-900 mt-2">Unscramble to win !!</p>

        {/* If no entry is present that satisfies the condition for the game to be played, display an error message */}
        {translations?.length && jumbledWords?.length ? (
          <div>
            <div className="mx-auto mt-16 w-full rounded-lg bg-white shadow-md border-2 border-charcoal-100">
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
                  data-testid="selected-words"
                  className={`my-4 border rounded-lg py-2 px-4 ${selectedBoxAdditionalStyling}`}
                >
                  <div className="flex md:flex-row flex-col flex-wrap">
                    {selectedWords?.length < 1 ? (
                      <div className={`${wordBlockStyling} invisible`}> </div>
                    ) : (
                      selectedWords?.map((wordObj) => (
                        <button
                          data-testid="word-btn"
                          type="button"
                          key={`selectedWords-${wordObj?.id}`}
                          className={wordBlockStyling}
                          onClick={() => wordClicked(wordObj)}
                          disabled={gameCompleted && validAnswer}
                        >
                          {wordObj?.text}
                        </button>
                      ))
                    )}
                  </div>
                </div>
                <div data-testid="jumbled-words">
                  {/* Jumbled words, turns invisible if selected. */}
                  <div className="flex md:flex-row flex-col flex-wrap">
                    {jumbledWords?.map((wordObj) =>
                      selectedWords.some(
                        (selectedWordObj) => selectedWordObj.id === wordObj.id,
                      ) ? (
                        <div
                          key={`disabledWords-${wordObj?.id}`}
                          className={`${wordBlockStyling} invisible`}
                        >
                          {wordObj?.text}
                        </div>
                      ) : (
                        <button
                          data-testid="word-btn"
                          type="button"
                          key={`jumbledWords-${wordObj?.id}`}
                          className={wordBlockStyling}
                          onClick={() => wordClicked(wordObj)}
                          onKeyDown={() => wordClicked(wordObj)}
                          disabled={gameCompleted && validAnswer}
                        >
                          {wordObj?.text}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div
                data-testid="card-footer"
                className="flex flex-row bg-charcoal-50 px-4 py-4 sm:px-6 justify-center"
              >
                {gameStatus === 'Won' && (
                  <div className="flex items-center justify-center w-full mx-auto space-x-2 text-xl">
                    {getIcon('CheckCircleSolid', 'h-8 w-8 fill-jade-500')}
                    <span>Great Job!</span>
                  </div>
                )}
                {gameStatus === 'Lost' && (
                  <button
                    data-testid="TryAgainButton"
                    type="button"
                    onClick={() => resetGame()}
                    className="btn-md btn-primary bg-ochre-600 hover:bg-ochre-800 text-white"
                  >
                    {getIcon('TryAgain')}
                    <span>Try again!</span>
                  </button>
                )}
                {!gameCompleted && (
                  <div className="flex-col justify-center space-y-4">
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center space-x-2 h-10">
                        <span>
                          {relatedAudio?.length > 0
                            ? 'Need a hint? Listen to the phrase'
                            : 'No audio.'}
                        </span>
                        <AudioButton audioArray={relatedAudio} />
                      </div>
                    </div>

                    <div className="space-x-2">
                      <button
                        data-testid="resetButton"
                        type="button"
                        onClick={() => resetGame()}
                        className="btn-secondary btn-md"
                      >
                        {getIcon('TryAgain')}
                        <span>Reset</span>
                      </button>
                      <button
                        data-testid="checkButton"
                        type="button"
                        onClick={() => checkAnswer()}
                        className="btn-primary btn-md"
                      >
                        Check
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              data-testid="loadButton"
              type="button"
              onClick={() => newGame()}
              className="btn-secondary btn-md mt-4"
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
