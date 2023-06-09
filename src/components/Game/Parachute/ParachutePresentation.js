import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import { convertMsToTimeWords } from 'common/utils/stringHelpers'
import { importAll } from 'common/utils/functionHelpers'
import SectionTitle from 'components/SectionTitle'

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
        // If there are any remaining pieces to find set isComplete to false
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
    alphabet.map((letter, index) => {
      const guessed = guessedLetters.includes(letter)
      return (
        <div
          key={letter + index}
          className={`${
            guessed
              ? 'bg-secondary text-white'
              : 'border-gray-500 text-fv-charcoal hover:bg-gray-100'
          } bg-white text-center text-2xl border-solid border inline-block pr-4 pl-4 rounded m-1 leading-10`}
          onClick={() => guessLetter(letter)}
        >
          {letter}
        </div>
      )
    })

  const renderSuccess = () => {
    const timeDiff = Date.now() - startTime
    const timeToSolve = convertMsToTimeWords(timeDiff)
    return (
      <h3 className="text-xl text-fv-charcoal font-bold">
        <div>You win! You solved it in</div>
        {timeToSolve}.
      </h3>
    )
  }

  const renderFail = () => (
    <h4 className="text-lg text-fv-charcoal">
      <p>Oh no! You&apos;re out of guesses.</p>
      <div>
        Don&apos;t quit now.{' '}
        <span
          className="inline-flex underline cursor-pointer"
          onClick={restart}
        >
          Try again.
        </span>
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

  return (
    <section
      className="py-2 md:py-4 lg:py-8 bg-white"
      data-testid="SongsAndStoriesPresentation"
    >
      <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <SectionTitle.Presentation title="PARACHUTE" accentColor="primary" />
          <p className="text-fv-charcoal mt-2">
            Guess the puzzle to make it to the beach
          </p>
        </div>

        <img
          src={gameImages[`${guessesRemaining}.png`]}
          className="max-w-3xl mx-auto object-cover h-96 w-full"
        />

        <div className="inline-block">
          {currentPuzzle.map((piece, index) =>
            piece?.letter === ' ' ? (
              <div className="inline-flex items-center justify-center w-14 h-14 text-2xl m-1 p-2" />
            ) : (
              <div
                key={index}
                className={`${
                  piece?.found ? 'text-primary' : 'text-white'
                } inline-flex items-center justify-center w-14 h-14 text-2xl m-1 p-2 overflow-hidden font-bold border border-solid border-gray-400`}
              >
                <div>{piece?.found ? piece?.letter : '_'}</div>
              </div>
            ),
          )}
        </div>

        <audio
          className="max-w-md mx-auto my-4"
          src={getMediaUrl({ id: audio, type: 'audio' })}
          controls
        />
        <div>Hint: {translation}</div>

        <div className="w-full m-auto max-w-lg my-4">
          {gameStatus === 'IN-PROGRESS' && renderKeyboard()}
          {gameStatus === 'SUCCESS' && renderSuccess()}
          {gameStatus === 'FAIL' && renderFail()}
        </div>

        <div className="mx-2.5">
          <button
            type="button"
            onClick={newPuzzle}
            className="inline-flex items-center bg-primary hover:bg-primary-dark font-medium px-5 py-2 rounded-lg shadow-sm text-base text-center text-white mr-2.5"
          >
            New Puzzle
          </button>
          <button
            type="button"
            className="inline-flex items-center bg-secondary hover:bg-primary-dark font-medium px-5 py-2 rounded-lg shadow-sm text-base text-center text-white"
            onClick={restart}
          >
            Restart
          </button>
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { any, array, func, string } = PropTypes
ParachutePresentation.propTypes = {
  puzzle: array,
  translation: any,
  audio: string,
  newPuzzle: func,
  alphabet: array,
}

export default ParachutePresentation
