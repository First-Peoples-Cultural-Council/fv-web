import React from 'react'
import PropTypes from 'prop-types'
import SongData from 'components/Song/SongData'
import SongPresentation from 'components/Song/SongPresentation'
import SongPresentationDrawer from 'components/Song/SongPresentationDrawer'
import LoadOrError from 'components/LoadOrError'

function SongContainer({ id, sitename, isDrawer, isDashboard }) {
  const { entry, songQueryResponse } = SongData({
    id,
    sitename,
  })
  console.log({ entry })
  return (
    <LoadOrError queryResponse={songQueryResponse}>
      {isDrawer ? (
        <SongPresentationDrawer entry={entry} isDashboard={isDashboard} />
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
  isDashboard: bool,
}

export default SongContainer
