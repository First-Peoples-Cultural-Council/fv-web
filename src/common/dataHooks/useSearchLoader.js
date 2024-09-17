import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import api from 'services/api'
import { SEARCH } from 'common/constants'
import { searchResponseAdaptor } from 'common/dataAdaptors'

/**
 * Calls search API and provides search results and infinite scroll info.
 */
function useSearchLoader({ searchParams }) {
  const { sitename } = useParams()
  const searchParamString = searchParams.toString()

  const queryKeySite = sitename || 'cross-site'
  const queryFn = sitename
    ? ({ pageParam = 1 }) =>
        api.search.get({ sitename, searchParams: searchParamString, pageParam })
    : ({ pageParam = 1 }) =>
        api.search.getFVWideSearch({
          searchParams: searchParamString,
          pageParam,
        })

  // Fetch search results
  const response = useInfiniteQuery({
    queryKey: [SEARCH, queryKeySite, searchParamString],
    queryFn,
    getNextPageParam: (currentPage) => currentPage.next,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (responseData) => ({
      pages: searchResponseAdaptor(responseData),
      pageParams: responseData.pageParams,
    }),
  })

  const infiniteScroll = {
    fetchNextPage: response?.fetchNextPage,
    hasNextPage: response?.hasNextPage,
    isFetchingNextPage: response?.isFetchingNextPage,
  }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: response?.fetchNextPage,
    enabled: response?.hasNextPage,
  })

  return {
    ...response,
    infiniteScroll,
    loadRef,
  }
}

// PROPTYPES
const { obj } = PropTypes
useSearchLoader.propTypes = {
  searchParams: obj,
}

export default useSearchLoader
