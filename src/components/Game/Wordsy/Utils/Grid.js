import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CurrentRow from 'components/Game/Wordsy/Utils/Rows/CurrentRow'
import CompletedRow from 'components/Game/Wordsy/Utils/Rows/CompletedRow'
import EmptyRow from 'components/Game/Wordsy/Utils/Rows/EmptyRow'

const { any } = PropTypes

function Grid({
  tries,
  guesses,
  solution,
  currentGuess,
  orthographyPattern,
  wordLength,
}) {
  const empties =
    guesses?.length < tries - 1
      ? Array.from(Array(tries - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses?.map((guess, index) => (
        <CompletedRow
          solution={solution}
          // guesses are not unique, using index in the key
          // eslint-disable-next-line react/no-array-index-key
          key={`completedRow-${index}`} // NOSONAR
          guess={guess}
          orthographyPattern={orthographyPattern}
        />
      ))}
      {guesses?.length < tries && (
        <CurrentRow guess={currentGuess} wordLength={wordLength} />
      )}
      {empties?.map((_, index) => (
        // An array of non-unique empty cells, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <EmptyRow key={`emptyRow-${index}`} wordLength={wordLength} /> // NOSONAR
      ))}
    </div>
  )
}

Grid.propTypes = {
  tries: any,
  guesses: any,
  solution: any,
  currentGuess: any,
  orthographyPattern: any,
  wordLength: any,
}

export default Grid
