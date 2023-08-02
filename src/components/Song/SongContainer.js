import React from 'react'
import PropTypes from 'prop-types'
import SongData from 'components/Song/SongData'
import SongPresentation from 'components/Song/SongPresentation'
import SongPresentationDrawer from 'components/Song/SongPresentationDrawer'
import Loading from 'components/Loading'

function SongContainer({ docId, isDrawer }) {
  console.log('SongContainer', docId)
  const { entry, isLoading, sitename } = SongData({ docId })
  return (
    <Loading.Container isLoading={isLoading}>
      {isDrawer ? (
        <SongPresentationDrawer entry={entry} sitename={sitename} />
      ) : (
        <SongPresentation entry={entry} />
      )}
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SongContainer.propTypes = {
  docId: string,
  isDrawer: bool,
}

export default SongContainer
