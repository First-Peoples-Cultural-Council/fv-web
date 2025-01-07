import PropTypes from 'prop-types'

// FPCC
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'
import api from 'services/api'
import { SEARCH } from 'common/constants'
import { searchResultAdaptor } from 'common/dataAdaptors'

function useSearchAllSitesLoader({ enabled, searchParams }) {
  const searchParamString = searchParams.toString()

  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [SEARCH, 'cross-site', searchParamString],
    queryFn: ({ pageParam = 1 }) =>
      api.search.getFVWideSearch({
        searchParams: searchParamString,
        pageParam,
      }),
    enabled: !!enabled,
    resultAdaptor: searchResultAdaptor,
  })

  return infiniteQueryResponse
}

// PROPTYPES
const { obj } = PropTypes
useSearchAllSitesLoader.propTypes = {
  searchParams: obj,
}

export default useSearchAllSitesLoader
