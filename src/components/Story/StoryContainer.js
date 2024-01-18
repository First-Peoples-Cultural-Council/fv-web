import React from 'react'
import PropTypes from 'prop-types'
import StoryData from 'components/Story/StoryData'
import StoryPresentation from 'components/Story/StoryPresentation'
import StoryPresentationDrawer from 'components/Story/StoryPresentationDrawer'
import ErrorHandler from 'components/ErrorHandler'
import Loading from 'components/Loading'
import { useParams } from 'react-router-dom'

function StoryContainer({ docId, sitename, isDrawer }) {
  const { sitename: sitenameParams } = useParams()
  const sitenameToSend = sitename || sitenameParams

  const { entry, isLoading, notFound, error } = StoryData({
    docId,
    sitename: sitenameToSend,
  })

  return notFound ? (
    <ErrorHandler.Container error={{ status: error.response.status }} />
  ) : (
    <Loading.Container isLoading={isLoading}>
      {isDrawer ? (
        <StoryPresentationDrawer entry={entry} sitename={sitenameToSend} />
      ) : (
        <StoryPresentation entry={entry} />
      )}
    </Loading.Container>
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
