import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Cell from 'components/Game/Wordsy/WordsyControls/Rows/Cell'

function CurrentRow({ guess, wordLength }) {
  const emptyCells = Array.from(Array(wordLength - guess.length))

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, index) => (
        // non-unique cells for non-unique guesses, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`guessedCell-${index}`} value={letter} />
      ))}
      {emptyCells.map((_, index) => (
        // non-unique empty cells, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`emptyCell-${index}`} />
      ))}
    </div>
  )
}

const { any } = PropTypes

CurrentRow.propTypes = {
  guess: any,
  wordLength: any,
}

export default CurrentRow
