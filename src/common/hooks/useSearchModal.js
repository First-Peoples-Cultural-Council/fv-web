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
} from 'common/constants'

function useSearchModal({ types }) {
  const searchType = types.join()
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    handleSearchTermSubmit,
    submittedSearchTerm,
  } = useSearchTerm()

  const _searchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: searchType,
    [DOMAIN]: DOMAIN_BOTH,
  })

  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({
      searchParams: _searchParams,
    })

  return {
    searchQuery: displayedSearchTerm,
    setSearchQuery: handleSearchTermChange,
    search: handleSearchTermSubmit,
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
  docTypes: arrayOf(oneOf([TYPE_WORD, TYPE_PHRASE])),
}

export default useSearchModal
