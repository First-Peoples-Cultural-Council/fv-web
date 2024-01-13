import React from 'react'
import PropTypes from 'prop-types'
import SongData from 'components/Song/SongData'
import SongPresentation from 'components/Song/SongPresentation'
import SongPresentationDrawer from 'components/Song/SongPresentationDrawer'
import Loading from 'components/Loading'
import { useParams } from 'react-router-dom'

function SongContainer({ docId, sitename, isDrawer }) {
  const { sitename: sitenameParams } = useParams()
  const sitenameToSend = sitename || sitenameParams

  const { entry, isLoading } = SongData({ docId, sitename: sitenameToSend })
  return (
    <Loading.Container isLoading={isLoading}>
      {isDrawer ? (
        <SongPresentationDrawer entry={entry} sitename={sitenameToSend} />
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
  sitename: string,
  isDrawer: bool,
}

export default SongContainer
