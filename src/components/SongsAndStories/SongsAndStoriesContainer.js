import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SongsAndStoriesPresentation from 'components/SongsAndStories/SongsAndStoriesPresentation'
import SongsAndStoriesData from 'components/SongsAndStories/SongsAndStoriesData'

function SongsAndStoriesContainer({ searchType, kids }) {
  const { infiniteScroll, items, isLoading, loadRef, sitename } = SongsAndStoriesData({ searchType, kids })
  return (
    <SongsAndStoriesPresentation
      searchType={searchType}
      infiniteScroll={infiniteScroll}
      items={items}
      isLoading={isLoading}
      kids={kids}
      loadRef={loadRef}
      sitename={sitename}
    />
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SongsAndStoriesContainer.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

SongsAndStoriesContainer.defaultProps = {
  kids: false,
}

export default SongsAndStoriesContainer
