import { useInfiniteQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'

// FPCC
import useLoader from 'common/hooks/useLoader'
import api from 'services/api'
import { SEARCH } from 'common/constants'
import { searchResponseAdaptor } from 'common/dataAdaptors'

/**
 * Calls search API and provides search results and infinite scroll info.
 */
function useSearchAllSitesLoader({ searchParams }) {
  const searchParamString = searchParams.toString()

  // Fetch search results
  const response = useInfiniteQuery({
    queryKey: [SEARCH, 'cross-site', searchParamString],
    queryFn: ({ pageParam = 1 }) =>
      api.search.getFVWideSearch({
        searchParams: searchParamString,
        pageParam,
      }),
    getNextPageParam: (currentPage) => currentPage.next,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (responseData) => ({
      pages: searchResponseAdaptor(responseData),
      pageParams: responseData.pageParams,
    }),
  })

  const { infiniteScroll, loadRef } = useLoader({ response })

  return {
    ...response,
    infiniteScroll,
    loadRef,
  }
}

// PROPTYPES
const { obj } = PropTypes
useSearchAllSitesLoader.propTypes = {
  searchParams: obj,
}

export default useSearchAllSitesLoader
