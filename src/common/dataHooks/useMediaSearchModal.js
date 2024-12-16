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
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'
import useSearchTerm from 'common/hooks/useSearchTerm'

function useMediaSearch({ type, searchSharedMedia }) {
  const path = getPathForMediaType(type)

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    submittedSearchTerm,
    setSubmittedSearchTerm,
  } = useSearchTerm()

  const siteSearchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: type,
    [SORT]: submittedSearchTerm ? null : SORT_CREATED_DESC,
  })

  const sharedMediaSearchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: type,
    [SORT]: submittedSearchTerm ? null : SORT_CREATED_DESC,
    [HAS_SITE_FEATURE]: SHARED_MEDIA,
  })

  // Fetch search results
  const siteSearchResponse = useSearchLoader({ searchParams: siteSearchParams })
  const sharedMediaSearchResponse = useSearchAllSitesLoader({
    searchParams: sharedMediaSearchParams,
    enabled: searchSharedMedia,
  })

  const infiniteQueryResponse = searchSharedMedia
    ? sharedMediaSearchResponse
    : siteSearchResponse

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
  }

  return {
    ...infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmit,
    handleSearchTermChange,
    typePlural: path,
  }
}

const { oneOf, bool } = PropTypes

useMediaSearch.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]).isRequired,
  searchSharedMedia: bool,
}

export default useMediaSearch
