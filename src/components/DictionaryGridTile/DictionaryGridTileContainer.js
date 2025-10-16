import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryGridTilePresentationKids from 'components/DictionaryGridTile/DictionaryGridTilePresentationKids'
import DictionaryGridTilePresentation from 'components/DictionaryGridTile/DictionaryGridTilePresentation'

function DictionaryGridTileContainer({ entry, kids = null }) {
  return kids ? (
    <DictionaryGridTilePresentationKids entry={entry} />
  ) : (
    <DictionaryGridTilePresentation entry={entry} />
  )
}

// PROPTYPES
const { bool, object } = PropTypes
DictionaryGridTileContainer.propTypes = {
  entry: object,
  kids: bool,
}

export default DictionaryGridTileContainer
