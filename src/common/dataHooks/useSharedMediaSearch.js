import PropTypes from 'prop-types'

// FPCC
import {
  AUDIO,
  IMAGE,
  VIDEO,
  TYPES,
  HAS_SITE_FEATURE,
  SHARED_MEDIA,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'

function useSharedMediaSearch({ type, searchTerm, enabled }) {
  const searchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: type,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
    [HAS_SITE_FEATURE]: SHARED_MEDIA,
  })

  // Fetch search results
  const infiniteQueryResponse = useSearchAllSitesLoader({
    searchParams: searchParams,
    enabled,
  })

  return infiniteQueryResponse
}

const { bool, oneOf, string } = PropTypes

useSharedMediaSearch.propTypes = {
  enabled: bool,
  searchTerm: string,
  type: oneOf([AUDIO, IMAGE, VIDEO]).isRequired,
}

export default useSharedMediaSearch
