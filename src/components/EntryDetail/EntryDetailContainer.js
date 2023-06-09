import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_PHRASE, TYPE_SONG, TYPE_STORY, TYPE_WORD } from 'common/constants'
import DictionaryDetail from 'components/DictionaryDetail'
import Song from 'components/Song'
import Story from 'components/Story'

function EntryDetailContainer({ id, type, isDrawer }) {
  switch (type) {
    case TYPE_PHRASE:
    case TYPE_WORD:
      return (
        <DictionaryDetail.Container
          docId={id}
          docType={type}
          isDrawer={isDrawer}
        />
      )
    case TYPE_SONG:
      return <Song.Container docId={id} isDrawer={isDrawer} />
    case TYPE_STORY:
      return <Story.Container docId={id} isDrawer={isDrawer} />
    default:
      return null
  }
}
// PROPTYPES
const { bool, oneOf, string } = PropTypes
EntryDetailContainer.propTypes = {
  id: string,
  type: oneOf([TYPE_PHRASE, TYPE_SONG, TYPE_STORY, TYPE_WORD]),
  isDrawer: bool,
}

export default EntryDetailContainer
