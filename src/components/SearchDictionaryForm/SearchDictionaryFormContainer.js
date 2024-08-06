import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchForm from 'components/SearchForm'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'

function SearchDictionaryFormContainer({ kids, initialSearchType }) {
  // basic searchbox behaviour
  const {
    handleSearchNavigation,
    displayedSearchTerm,
    submittedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    clearSearchTerm,
    searchType,
  } = useSearchBoxNavigation({
    initialSearchType,
    kids,
  })

  return (
    <div id="SearchDictionaryFormContainer" className="flex w-full rounded-lg">
      <SearchForm
        displayedSearchTerm={displayedSearchTerm}
        handleSearchNavigation={handleSearchNavigation}
        handleSearchTermChange={handleSearchTermChange}
        searchBoxPlaceholder={searchBoxPlaceholder}
        searchType={searchType}
      />

      {submittedSearchTerm && (
        <button
          data-testid="reset-search"
          type="button"
          className="inline-flex items-center ml-4 my-1 px-2 text-fv-charcoal-light border-gray-300 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200"
          onClick={clearSearchTerm}
        >
          Clear Search
        </button>
      )}
    </div>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SearchDictionaryFormContainer.propTypes = {
  kids: bool,
  initialSearchType: string,
}

export default SearchDictionaryFormContainer
