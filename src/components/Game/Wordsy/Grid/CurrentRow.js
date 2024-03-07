import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Cell from 'components/Game/Wordsy/Grid/Cell'

function CurrentRow({ guess, wordLength }) {
  const emptyCellsLength = guess?.length
    ? wordLength - guess.length
    : wordLength
  const emptyCells = Array.from(Array(emptyCellsLength))

  return (
    <div className="flex justify-center mb-1">
      {guess?.map((letter, index) => (
        // non-unique cells for non-unique guesses, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`guessedCell-${index}`} value={letter} /> // NOSONAR
      ))}
      {emptyCells?.map((_, index) => (
        // non-unique empty cells, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`emptyCell-${index}`} /> // NOSONAR
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
