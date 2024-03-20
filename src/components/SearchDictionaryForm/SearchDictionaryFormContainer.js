import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchInputPresentation from 'components/SearchInput/SearchInputPresentation'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import { DOMAIN_BOTH } from 'common/constants'

function SearchDictionaryFormContainer({ kids, customBaseUrl, searchType }) {
  // basic searchbox behaviour
  const {
    handleSearchNavigation,
    searchLanguage,
    searchLanguageOptions,
    handleSearchLanguageNavigation,
    displayedSearchTerm,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    doSearchNavigation,
  } = useSearchBoxNavigation({
    customBaseUrl,
    initialSearchType: searchType,
    kids,
  })

  const resetSearch = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm('')
    doSearchNavigation({
      searchTerm: '',
      searchLanguage: DOMAIN_BOTH,
      searchType,
      kidFlag: kids,
    })
  }

  return (
    <div id="SearchDictionaryFormContainer" className="flex w-full rounded-lg">
      <SearchInputPresentation
        handleSearchNavigation={handleSearchNavigation}
        handleSearchTermChange={handleSearchTermChange}
        handleSearchLanguageNavigation={handleSearchLanguageNavigation}
        searchLanguage={searchLanguage}
        searchLanguageOptions={searchLanguageOptions}
        displayedSearchTerm={displayedSearchTerm}
        searchBoxPlaceholder={searchBoxPlaceholder}
      />

      {submittedSearchTerm && (
        <button
          data-testid="reset-search"
          type="button"
          className="inline-flex items-center ml-4 my-1 px-2 text-fv-charcoal-light border-gray-300 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200"
          onClick={resetSearch}
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
  customBaseUrl: string,
  kids: bool,
  searchType: string,
}

export default SearchDictionaryFormContainer
