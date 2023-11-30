import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CurrentRow from 'components/Game/Wordsy/WordsyControls//Rows/CurrentRow'
import CompletedRow from 'components/Game/Wordsy/WordsyControls/Rows/CompletedRow'
import EmptyRow from 'components/Game/Wordsy/WordsyControls/Rows/EmptyRow'

// from settings
const TRIES = 6

const { any } = PropTypes

function Grid({
  guesses,
  solution,
  currentGuess,
  orthographyPattern,
  wordLength,
}) {
  const empties =
    guesses.length < TRIES - 1
      ? Array.from(Array(TRIES - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, index) => (
        <CompletedRow
          solution={solution}
          // guesses are not unique, using index in the key
          // eslint-disable-next-line react/no-array-index-key
          key={`completedRow-${index}`}
          guess={guess}
          orthographyPattern={orthographyPattern}
        />
      ))}
      {guesses.length < TRIES && (
        <CurrentRow guess={currentGuess} wordLength={wordLength} />
      )}
      {empties.map((_, index) => (
        // An array of non-unique empty cells, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <EmptyRow key={`emptyRow-${index}`} wordLength={wordLength} />
      ))}
    </div>
  )
}

Grid.propTypes = {
  guesses: any,
  solution: any,
  currentGuess: any,
  orthographyPattern: any,
  wordLength: any,
}

export default Grid
