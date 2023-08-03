import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { useSongs } from 'common/dataHooks/useSongs'

function SongsAndStoriesData() {
  const { sitename } = useParams()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isInitialLoading,
  } = useSongs({ sitename })

  let loadButtonLabel = ''
  if (isFetchingNextPage) {
    loadButtonLabel = 'Loading more...'
  } else if (hasNextPage) {
    loadButtonLabel = 'Load more'
  }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  const infiniteScroll = {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadButtonLabel,
  }

  return {
    items: data || [],
    isLoading: isInitialLoading || isError,
    infiniteScroll,
    sitename,
    loadRef,
  }
}

// PROPTYPES
const { string, bool } = PropTypes
SongsAndStoriesData.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

export default SongsAndStoriesData
