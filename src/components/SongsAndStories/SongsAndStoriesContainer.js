import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SongsAndStoriesPresentation from 'components/SongsAndStories/SongsAndStoriesPresentation'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import SiteDocHead from 'components/SiteDocHead'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import { TYPE_SONG, TYPE_STORY } from 'common/constants'

function SongsAndStoriesContainer({ searchType, kids = null }) {
  const infiniteQueryResponse = useSearchLoader({
    searchParams: `types=${searchType}&kids=${kids}`,
  })

  const labels = getPresentationPropertiesForType(searchType)

  return (
    <>
      <SiteDocHead titleArray={[labels?.titlecase]} />
      <SongsAndStoriesPresentation
        infiniteQueryResponse={infiniteQueryResponse || {}}
        kids={kids}
        labels={labels}
      />
    </>
  )
}

// PROPTYPES
const { bool, oneOf } = PropTypes
SongsAndStoriesContainer.propTypes = {
  searchType: oneOf([TYPE_SONG, TYPE_STORY]).isRequired,
  kids: bool,
}

export default SongsAndStoriesContainer
