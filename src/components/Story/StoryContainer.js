import React from 'react'
import PropTypes from 'prop-types'
import StoryData from 'components/Story/StoryData'
import StoryPresentation from 'components/Story/StoryPresentation'
import StoryPresentationDrawer from 'components/Story/StoryPresentationDrawer'
import ErrorHandler from 'components/ErrorHandler'
import Loading from 'components/Loading'

function StoryContainer({ docId, isDrawer }) {
  const { entry, isLoading, sitename, notFound, error } = StoryData({ docId })
  return notFound ? (
    <ErrorHandler.Container error={{ status: error.response.status }} />
  ) : (
    <Loading.Container isLoading={isLoading}>
      {isDrawer ? (
        <StoryPresentationDrawer entry={entry} sitename={sitename} />
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
  isDrawer: bool,
}

export default StoryContainer
