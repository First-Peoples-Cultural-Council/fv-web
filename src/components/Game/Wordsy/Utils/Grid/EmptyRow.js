import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Cell from 'components/Game/Wordsy/Utils/Grid/Cell'

function EmptyRow({ wordLength }) {
  const emptyCells = Array.from(Array(wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, index) => (
        // non-unique empty cells, using index as key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={index} /> // NOSONAR
      ))}
    </div>
  )
}

const { any } = PropTypes

EmptyRow.propTypes = {
  wordLength: any,
}

export default EmptyRow
