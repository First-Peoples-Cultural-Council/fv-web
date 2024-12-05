import React from 'react'
import PropTypes from 'prop-types'
import SongData from 'components/Song/SongData'
import SongPresentation from 'components/Song/SongPresentation'
import SongPresentationDrawer from 'components/Song/SongPresentationDrawer'
import LoadOrError from 'components/LoadOrError'

function SongContainer({ id, sitename, isDrawer }) {
  const { entry, songQueryReturn } = SongData({
    id,
    sitename,
  })
  return (
    <LoadOrError queryReturn={songQueryReturn}>
      {isDrawer ? (
        <SongPresentationDrawer entry={entry} />
      ) : (
        <SongPresentation entry={entry} />
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SongContainer.propTypes = {
  id: string,
  sitename: string,
  isDrawer: bool,
}

export default SongContainer
