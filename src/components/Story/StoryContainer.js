import React from 'react'
import PropTypes from 'prop-types'
import StoryData from 'components/Story/StoryData'
import StoryPresentation from 'components/Story/StoryPresentation'
import StoryPresentationDrawer from 'components/Story/StoryPresentationDrawer'
import LoadOrError from 'components/LoadOrError'
import { useParams } from 'react-router-dom'

function StoryContainer({ docId, sitename, isDrawer }) {
  const { sitename: sitenameParams } = useParams()
  const sitenameToSend = sitename || sitenameParams

  const { entry, storyQueryReturn } = StoryData({
    docId,
    sitename: sitenameToSend,
  })

  return (
    <LoadOrError queryReturn={storyQueryReturn}>
      {isDrawer ? (
        <StoryPresentationDrawer entry={entry} sitename={sitenameToSend} />
      ) : (
        <StoryPresentation entry={entry} />
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
StoryContainer.propTypes = {
  docId: string,
  sitename: string,
  isDrawer: bool,
}

export default StoryContainer
