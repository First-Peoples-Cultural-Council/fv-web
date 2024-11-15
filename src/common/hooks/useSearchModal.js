import PropTypes from 'prop-types'

// FPCC
import useSearchTerm from 'common/hooks/useSearchTerm'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
  DOMAIN,
  DOMAIN_BOTH,
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
  VISIBILITY,
  VISIBILITY_PUBLIC,
  VISIBILITY_MEMBERS,
  VISIBILITY_TEAM,
} from 'common/constants'

function useSearchModal({ types, visibility = '' }) {
  const searchType = types.join()

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    submittedSearchTerm,
    setSubmittedSearchTerm,
  } = useSearchTerm()

  const _searchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: searchType,
    [VISIBILITY]: visibility,
    [DOMAIN]: DOMAIN_BOTH,
  })

  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({
      searchParams: _searchParams,
    })

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
  }

  return {
    displayedSearchTerm,
    handleSearchTermChange,
    handleSearchSubmit,
    searchResults: data,
    hasResults:
      data?.pages !== undefined && data?.pages?.[0]?.results?.length > 0,
    infiniteScroll,
    isLoading: isInitialLoading || isError,
    isLoadingEntries: isInitialLoading,
    loadRef,
  }
}

// PROPTYPES
const { arrayOf, oneOf } = PropTypes
useSearchModal.propTypes = {
  types: arrayOf(oneOf([TYPE_WORD, TYPE_PHRASE])),
  visibility: oneOf([VISIBILITY_PUBLIC, VISIBILITY_MEMBERS, VISIBILITY_TEAM]),
}

export default useSearchModal
