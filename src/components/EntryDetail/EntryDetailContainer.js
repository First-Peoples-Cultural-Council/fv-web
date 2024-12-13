import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { TYPE_PHRASE, TYPE_SONG, TYPE_STORY, TYPE_WORD } from 'common/constants'
import DictionaryDetail from 'components/DictionaryDetail'
import Song from 'components/Song'
import Story from 'components/Story'

function EntryDetailContainer({ id, type, sitename, isDrawer, isDashboard }) {
  switch (type) {
    case TYPE_PHRASE:
    case TYPE_WORD:
      return (
        <DictionaryDetail.Container
          id={id}
          sitename={sitename}
          isDrawer={isDrawer}
          isDashboard={isDashboard}
        />
      )
    case TYPE_SONG:
      return (
        <Song.Container
          id={id}
          sitename={sitename}
          isDrawer={isDrawer}
          isDashboard={isDashboard}
        />
      )
    case TYPE_STORY:
      return (
        <Story.Container
          id={id}
          sitename={sitename}
          isDrawer={isDrawer}
          isDashboard={isDashboard}
        />
      )
    default:
      return null
  }
}
// PROPTYPES
const { bool, oneOf, string } = PropTypes
EntryDetailContainer.propTypes = {
  id: string,
  sitename: string,
  type: oneOf([TYPE_PHRASE, TYPE_SONG, TYPE_STORY, TYPE_WORD]),
  isDrawer: bool,
  isDashboard: bool,
}

export default EntryDetailContainer
