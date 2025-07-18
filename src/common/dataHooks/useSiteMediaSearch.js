import PropTypes from 'prop-types'

// FPCC
import {
  AUDIO,
  IMAGE,
  VIDEO,
  TYPES,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'
import useSearchLoader from 'common/dataHooks/useSearchLoader'

function useSiteMediaSearch({ type, searchTerm }) {
  const siteSearchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: type,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
  })

  // Fetch search results
  const infiniteQueryResponse = useSearchLoader({
    searchParams: siteSearchParams,
  })

  return infiniteQueryResponse
}

const { oneOf, string } = PropTypes

useSiteMediaSearch.propTypes = {
  searchTerm: string,
  type: oneOf([AUDIO, IMAGE, VIDEO]).isRequired,
}

export default useSiteMediaSearch
