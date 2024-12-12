import React from 'react'
import PropTypes from 'prop-types'
import StoryData from 'components/Story/StoryData'
import StoryPresentation from 'components/Story/StoryPresentation'
import StoryPresentationDrawer from 'components/Story/StoryPresentationDrawer'
import LoadOrError from 'components/LoadOrError'

function StoryContainer({ id, sitename, isDrawer, isDashboard }) {
  const { entry, storyQueryResponse } = StoryData({
    id,
    sitename,
  })

  return (
    <LoadOrError queryResponse={storyQueryResponse}>
      {isDrawer ? (
        <StoryPresentationDrawer entry={entry} isDasboard={isDashboard} />
      ) : (
        <StoryPresentation entry={entry} />
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
StoryContainer.propTypes = {
  id: string,
  sitename: string,
  isDrawer: bool,
  isDashboard: bool,
}

export default StoryContainer
