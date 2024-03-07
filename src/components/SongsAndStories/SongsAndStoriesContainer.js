import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SongsAndStoriesPresentation from 'components/SongsAndStories/SongsAndStoriesPresentation'
import SongsAndStoriesData from 'components/SongsAndStories/SongsAndStoriesData'
import Loading from 'components/Loading'

function SongsAndStoriesContainer({ searchType, kids }) {
  const { infiniteScroll, items, isLoading, loadRef, sitename } =
    SongsAndStoriesData({ searchType, kids })
  return (
    <Loading.Container isLoading={isLoading}>
      <SongsAndStoriesPresentation
        searchType={searchType}
        infiniteScroll={infiniteScroll}
        items={items}
        kids={kids}
        loadRef={loadRef}
        sitename={sitename}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SongsAndStoriesContainer.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

SongsAndStoriesContainer.defaultProps = {
  kids: null,
}

export default SongsAndStoriesContainer
