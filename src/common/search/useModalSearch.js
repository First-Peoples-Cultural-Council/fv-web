import PropTypes from 'prop-types'

// FPCC
import useSearchBox from 'common/search/useSearchBox'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
  DOMAIN,
  DOMAIN_BOTH,
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
} from 'common/constants'

function useModalSearch({ types }) {
  const searchType = types.join()
  const searchBox = useSearchBox()

  const _searchParams = new URLSearchParams({
    q: searchBox.submittedSearchTerm,
    [TYPES]: searchType,
    [DOMAIN]: DOMAIN_BOTH,
  })

  const { data, infiniteScroll, loadRef, isLoading, isError } = useSearchLoader(
    {
      searchParams: _searchParams,
    },
  )

  return {
    searchQuery: searchBox.displayedSearchTerm,
    setSearchQuery: searchBox.handleSearchTermChange,
    search: searchBox.handleSearchTermSubmit,
    searchResults: data,
    hasResults:
      data?.pages !== undefined && data?.pages?.[0]?.results?.length > 0,
    infiniteScroll,
    isLoading: isLoading || isError,
    isLoadingEntries: isLoading,
    loadRef,
  }
}

// PROPTYPES
const { arrayOf, oneOf } = PropTypes
useModalSearch.propTypes = {
  docTypes: arrayOf(oneOf([TYPE_WORD, TYPE_PHRASE])),
}

export default useModalSearch
