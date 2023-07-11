import PropTypes from 'prop-types'

// FPCC
import useSearchType from 'components/SearchTypeSelector/useSearchType'
import useSearchBox from 'components/SearchBox/useSearchBox'
import useSearchLoader from 'common/dataHooks/useSearchLoader'

function useModalDocumentSearch({ docTypes }) {
  const { getSearchTypeFromDocTypes } = useSearchType({})
  const searchType = getSearchTypeFromDocTypes(docTypes)
  const searchBox = useSearchBox()

  const _searchParams = `q=${searchBox.submittedSearchTerm}&docType=${searchType}&domain=BOTH`

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
const { arrayOf, string } = PropTypes
useModalDocumentSearch.propTypes = {
  docTypes: arrayOf(string),
}

export default useModalDocumentSearch
