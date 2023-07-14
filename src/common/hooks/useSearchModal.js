import PropTypes from 'prop-types'

// FPCC
import useSearchBox from 'common/hooks/useSearchBox'
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
  const searchBox = useSearchBox()

  const _searchParams = new URLSearchParams({
    q: searchBox.submittedSearchTerm,
    [TYPES]: searchType,
    [DOMAIN]: DOMAIN_BOTH,
  })

  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({
      searchParams: _searchParams,
    })

  return {
    searchQuery: searchBox.displayedSearchTerm,
    setSearchQuery: searchBox.handleSearchTermChange,
    search: searchBox.handleSearchTermSubmit,
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
