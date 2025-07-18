import PropTypes from 'prop-types'

// FPCC
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

import useSearchTerm from 'common/hooks/useSearchTerm'
import useSiteMediaSearch from 'common/dataHooks/useSiteMediaSearch'
import useSharedMediaSearch from 'common/dataHooks/useSharedMediaSearch'

function useMediaSearchModal({ type, searchSharedMedia }) {
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    submittedSearchTerm,
    setSubmittedSearchTerm,
  } = useSearchTerm()

  // Fetch search results
  const siteSearchResponse = useSiteMediaSearch({
    type,
    searchTerm: submittedSearchTerm,
  })
  const sharedMediaSearchResponse = useSharedMediaSearch({
    type,
    searchTerm: submittedSearchTerm,
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
  }
}

const { oneOf, bool } = PropTypes

useMediaSearchModal.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]).isRequired,
  searchSharedMedia: bool,
}

export default useMediaSearchModal
