import { useParams } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'
import api from 'services/api'
import { SEARCH } from 'common/constants'
import { searchResultAdaptor } from 'common/dataAdaptors'

function useSearchLoader({ searchParams }) {
  const { sitename } = useParams()
  const searchParamString = searchParams.toString()

  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [SEARCH, sitename, searchParamString],
    queryFn: ({ pageParam = 1 }) =>
      api.search.get({ sitename, searchParams: searchParamString, pageParam }),
    resultAdaptor: searchResultAdaptor,
  })

  return infiniteQueryResponse
}

// PROPTYPES
const { obj } = PropTypes
useSearchLoader.propTypes = {
  searchParams: obj,
}

export default useSearchLoader
