import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useLoader from 'common/hooks/useLoader'
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

  const { infiniteScroll, loadRef } = useLoader({ response })

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
