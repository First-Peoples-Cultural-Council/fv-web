import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SongsAndStoriesPresentation from 'components/SongsAndStories/SongsAndStoriesPresentation'
import SongsAndStoriesData from 'components/SongsAndStories/SongsAndStoriesData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'

function SongsAndStoriesContainer({ searchType, kids = null }) {
  const { infiniteScroll, items, isLoading, loadRef, sitename } =
    SongsAndStoriesData({ searchType, kids })
  const labels = getPresentationPropertiesForType(searchType)
  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead titleArray={[labels?.titlecase]} />
      <SongsAndStoriesPresentation
        infiniteScroll={infiniteScroll}
        items={items}
        kids={kids}
        labels={labels}
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

export default SongsAndStoriesContainer
