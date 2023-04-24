import React from 'react'
import PropTypes from 'prop-types'

//FPCC
import DictionaryGridTilePresentationKids from 'components/DictionaryGridTile/DictionaryGridTilePresentationKids'
import DictionaryGridTilePresentation from 'components/DictionaryGridTile/DictionaryGridTilePresentation'

function DictionaryGridTileContainer({ actions, moreActions, entry, kids }) {
  return kids ? (
    <DictionaryGridTilePresentationKids entry={entry} />
  ) : (
    <DictionaryGridTilePresentation entry={entry} actions={actions} moreActions={moreActions} />
  )
}

// PROPTYPES
const { array, bool, object } = PropTypes
DictionaryGridTileContainer.propTypes = {
  entry: object,
  kids: bool,
  actions: array,
  moreActions: array,
}

DictionaryGridTileContainer.defaultProps = {
  kids: false,
  actions: [],
  moreActions: [],
}

export default DictionaryGridTileContainer
