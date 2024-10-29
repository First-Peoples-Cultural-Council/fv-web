import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { convertMsToTimeWords } from 'common/utils/stringHelpers'
import { importAll } from 'common/utils/functionHelpers'
import SectionTitle from 'components/SectionTitle'
import { AUDIO, ORIGINAL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function ParachutePresentation({
  alphabet,
  puzzle,
  translation,
  audio,
  newPuzzle,
}) {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [gameStatus, setGameStatus] = useState('IN-PROGRESS')
  const [guessesRemaining, setGuessesRemaining] = useState(7)
  const [startTime, setStartTime] = useState(Date.now())
  const [currentPuzzle, setCurrentPuzzle] = useState(puzzle)

  const startNewGame = () => {
    newPuzzle()
    setGuessedLetters([])
    setGameStatus('IN-PROGRESS')
    setGuessesRemaining(7)
    setStartTime(Date.now())
  }

  /**
   * Restart with the same puzzle
   */
  const restart = () => {
    setGuessedLetters([])
    setGameStatus('IN-PROGRESS')
    setGuessesRemaining(7)
    setStartTime(Date.now())
    setCurrentPuzzle(puzzle)
  }

  const guessLetter = (letter) => {
    if (
      guessesRemaining > 0 &&
      gameStatus === 'IN-PROGRESS' &&
      !guessedLetters.includes(letter)
    ) {
      setGuessedLetters([...guessedLetters, letter])
      let letterFound = false
      let newGameStatus = 'SUCCESS'
      const newState = currentPuzzle.map((piece) => {
        if (piece.letter === letter) {
          letterFound = true
          return { ...piece, found: true }
        }
        if (piece.found === false) {
          newGameStatus = 'IN-PROGRESS'
        }
        return piece
      })

      if (letterFound === false) {
        if (guessesRemaining === 1) {
          setGuessesRemaining(0)
          newGameStatus = 'FAIL'
        }
        setGuessesRemaining(guessesRemaining - 1)
      }

      setGameStatus(newGameStatus)
      setCurrentPuzzle(newState)
    }
  }

  const renderKeyboard = () =>
    alphabet?.map((letter) => {
      const guessed = guessedLetters?.includes(letter)
      return (
        <button
          type="button"
          key={letter.id}
          className={`${
            guessed
              ? 'bg-scarlet-800 text-white'
              : 'border-gray-500 text-charcoal-900 hover:bg-gray-100'
          } bg-white text-center text-2xl border-solid border inline-block pr-4 pl-4 rounded m-1 leading-10`}
          onClick={() => guessLetter(letter)}
        >
          {letter}
        </button>
      )
    })

  const renderSuccess = () => {
    const timeDiff = Date.now() - startTime
    const timeToSolve = convertMsToTimeWords(timeDiff)
    return (
      <h3 className="text-xl text-charcoal-900 font-bold">
        <div>You win! You solved it in</div>
        {timeToSolve}.
      </h3>
    )
  }

  const renderFail = () => (
    <h4 className="text-lg text-charcoal-900">
      <p>Oh no! You&apos;re out of guesses.</p>
      <div>
        Don&apos;t quit now.{' '}
        <button
          type="button"
          className="inline-flex underline cursor-pointer"
          onClick={restart}
        >
          Try again.
        </button>
      </div>
    </h4>
  )

  const gameImages = importAll(
    require.context(
      'assets/images/games/parachute',
      false,
      /\.(png|jpe?g|svg)$/,
    ),
  )

  useEffect(() => {
    setCurrentPuzzle(puzzle)
  }, [puzzle, newPuzzle])

  return (
    <section
      className="py-2 md:py-4 lg:py-8 bg-white"
      data-testid="ParachutePresentation"
    >
      <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* If the puzzle length is zero then render an error message, else render the puzzle. */}
        {puzzle?.length === 0 ? (
          <div>
            <SectionTitle.Presentation title="PULL TOGETHER" />
            <p className="text-charcoal-900 mt-2">
              This site does not currently have enough dictionary content for
              the game.
              <br />
              Please contact{' '}
              <a href="mailto:hello@firstvoices.com" className="inline-url">
                hello@firstvoices.com
              </a>{' '}
              for more information.
            </p>
          </div>
        ) : (
          <div>
            <div>
              <SectionTitle.Presentation title="PULL TOGETHER" />
              <p className="text-charcoal-900 mt-2">
                Guess the word to make it to the beach
              </p>
            </div>
            <div className="block">
              <img
                src={
                  gameStatus === 'SUCCESS'
                    ? gameImages['win.jpg']
                    : gameImages[`${guessesRemaining}.jpg`]
                }
                className="max-w-3xl mx-auto object-cover h-96 w-full"
                alt={`You have ${guessesRemaining} guesses remaining.`}
              />
              <p className="text-charcoal-300 text-xs text-right mx-auto -mt-6 mb-6 max-w-[760px]">
                Art by Chantelle Trainor-Matties
              </p>
            </div>

            <div className="inline-block">
              {currentPuzzle?.map((piece) =>
                piece?.letter === ' ' ? (
                  <div className="inline-flex items-center justify-center w-14 h-14 text-2xl m-1 p-2" />
                ) : (
                  <div
                    key={piece.id}
                    className={`${
                      piece?.found ? 'text-blumine-800' : 'text-white'
                    } inline-flex items-center justify-center w-14 h-14 text-2xl m-1 p-2 overflow-hidden font-bold border border-solid border-gray-400`}
                  >
                    <div>{piece?.found ? piece?.letter : '_'}</div>
                  </div>
                ),
              )}
            </div>

            <audio
              className="max-w-md mx-auto my-4"
              src={getMediaPath({
                mediaObject: audio,
                type: AUDIO,
                size: ORIGINAL,
              })}
              controls
            />
            <div>Hint: {translation}</div>

            <div className="w-full m-auto max-w-lg my-4">
              {gameStatus === 'IN-PROGRESS' && renderKeyboard()}
              {gameStatus === 'SUCCESS' && renderSuccess()}
              {gameStatus === 'FAIL' && renderFail()}
            </div>

            <div className="space-x-2">
              <button
                data-testid="new"
                type="button"
                onClick={startNewGame}
                className="btn-contained bg-blumine-800"
              >
                New Puzzle
              </button>
              <button
                data-testid="restart"
                type="button"
                className="btn-contained bg-scarlet-800"
                onClick={restart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// PROPTYPES
const { any, array, func, object } = PropTypes
ParachutePresentation.propTypes = {
  puzzle: array,
  translation: any,
  audio: object,
  newPuzzle: func,
  alphabet: array,
}

export default ParachutePresentation
