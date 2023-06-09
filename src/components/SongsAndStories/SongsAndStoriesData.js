import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import { makePlural } from 'common/utils/urlHelpers'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'

function SongsAndStoriesData({ searchType, kids }) {
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const pluralSearchType = makePlural(searchType)

  const _searchParams = `docType=${searchType}&kidsOnly=${kids}`

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [pluralSearchType, site?.uid],
    ({ pageParam = 1 }) =>
      api.songsAndStories.get({
        siteId: site?.uid,
        searchParams: _searchParams,
        pageParam,
      }),
    {
      enabled: !!site?.uid,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

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
    items: data || {},
    isLoading: isLoading || isError,
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
