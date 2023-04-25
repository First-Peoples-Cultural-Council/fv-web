import { useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/useIntersectionObserver'

/**
 * Calls search-like APIs and provides search results and loading/error info.
 */
function useSearchLoader({ searchApi, queryKey, siteUid, searchParams }) {
  const searchParamString = searchParams.toString()

  // Fetch search results
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    [`${queryKey}-search`, searchParamString],
    ({ pageParam = 1 }) =>
      searchApi.get({
        siteId: siteUid,
        searchParams: searchParamString,
        pageParam,
      }),
    {
      enabled: !!siteUid,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const infiniteScroll = { fetchNextPage, hasNextPage, isFetchingNextPage }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  return {
    searchResults: data,
    error,
    infiniteScroll,
    loadRef,
    isLoading,
    isError,
  }
}

// PROPTYPES
const { obj, string } = PropTypes
useSearchLoader.propTypes = {
  searchApi: obj,
  queryKey: string,
  siteUid: string,
  searchParams: obj,
}

export default useSearchLoader
