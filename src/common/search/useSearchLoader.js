import { useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { SEARCH } from 'common/constants'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import api from 'services/api'

/**
 * Calls search-like APIs and provides search results and loading/error info.
 */
function useSearchLoader({ searchParams }) {
  const { sitename } = useParams()
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
    [SEARCH, sitename, searchParamString],
    ({ page = 1 }) =>
      api.search.get({
        sitename,
        searchParams: searchParamString,
        page,
      }),
    {
      enabled: !!sitename,
      getNextPageParam: (currentPage) => currentPage.nextPage,
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
const { obj } = PropTypes
useSearchLoader.propTypes = {
  searchParams: obj,
}

export default useSearchLoader
